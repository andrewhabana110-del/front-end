-- Setup:
-- 1. Run this entire script in Supabase SQL Editor before creating app accounts.
-- 2. Create and confirm your account, then promote it using the update below.
-- 3. Sign out and back in; the first admin login seeds the shared book catalog.
-- 4. Add localhost and the deployed app URL under Authentication URL Configuration.
create table if not exists public.profiles (
    id uuid not null,
    email text not null,
    username text not null unique,
    role text not null default 'user' check (role in ('user', 'librarian', 'admin')),
    membership text not null default 'regular' check (membership in ('regular', 'premium')),
    premium_until date,
    banned boolean not null default false,
    author_status text not null default 'none',
    pen_name text not null default '',
    author_bio text not null default '',
    author_applied_at date,
    created_at timestamptz not null default now(),
    constraint profiles_pkey primary key (id),
    constraint profiles_auth_user_fkey
        foreign key (id) references auth.users (id) on delete cascade
);

create unique index if not exists profiles_username_ci_unique
    on public.profiles (lower(username));

create or replace function public.is_library_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
    select exists (
        select 1
        from public.profiles
        where id = (select auth.uid())
          and role in ('admin', 'librarian')
          and not banned
    );
$$;

create or replace function public.create_library_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    requested_username text;
begin
    requested_username := nullif(trim(new.raw_user_meta_data ->> 'username'), '');
    if requested_username is null then
        requested_username := split_part(new.email, '@', 1);
    end if;

    insert into public.profiles (
        id, email, username, author_status, pen_name, author_bio, author_applied_at
    )
    values (
        new.id,
        new.email,
        requested_username,
        case when new.raw_user_meta_data ->> 'author_status' = 'pending' then 'pending' else 'none' end,
        coalesce(new.raw_user_meta_data ->> 'pen_name', ''),
        coalesce(new.raw_user_meta_data ->> 'author_bio', ''),
        nullif(new.raw_user_meta_data ->> 'author_applied_at', '')::date
    );
    return new;
end;
$$;

drop trigger if exists on_auth_user_created_library_profile on auth.users;
create trigger on_auth_user_created_library_profile
    after insert on auth.users
    for each row execute procedure public.create_library_profile();

create or replace function public.sync_library_profile_email()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    perform set_config('app.allow_email_sync', 'on', true);
    update public.profiles set email = new.email where id = new.id;
    return new;
end;
$$;

drop trigger if exists on_auth_user_email_updated_library_profile on auth.users;
create trigger on_auth_user_email_updated_library_profile
    after update of email on auth.users
    for each row execute procedure public.sync_library_profile_email();

insert into public.profiles (id, email, username)
select
    auth_user.id,
    auth_user.email,
    coalesce(
        nullif(trim(auth_user.raw_user_meta_data ->> 'username'), ''),
        split_part(auth_user.email, '@', 1)
    )
from auth.users auth_user
where not exists (
    select 1 from public.profiles profile where profile.id = auth_user.id
)
on conflict (id) do nothing;

create or replace function public.protect_library_profile_privileges()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if (select auth.uid()) is distinct from old.id
       or public.is_library_admin() then
        return new;
    end if;

    new.role := old.role;
    if coalesce(current_setting('app.allow_email_sync', true), '') <> 'on' then
        new.email := old.email;
    end if;
    new.banned := old.banned;
    if coalesce(current_setting('app.allow_author_application', true), '') <> 'on' then
        new.author_status := old.author_status;
        new.author_applied_at := old.author_applied_at;
    end if;
    if coalesce(current_setting('app.allow_membership_change', true), '') <> 'on' then
        new.membership := old.membership;
        new.premium_until := old.premium_until;
    end if;
    return new;
end;
$$;

drop trigger if exists protect_library_profile_privileges on public.profiles;
create trigger protect_library_profile_privileges
    before update on public.profiles
    for each row execute procedure public.protect_library_profile_privileges();

create table if not exists public.library_books (
    id text primary key,
    data jsonb not null,
    updated_at timestamptz not null default now()
);

create table if not exists public.library_user_data (
    user_id uuid primary key references auth.users (id) on delete cascade,
    payload jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now()
);

create table if not exists public.library_loans (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    book_id text not null,
    data jsonb not null,
    returned boolean not null default false,
    created_at timestamptz not null default now()
);

create unique index if not exists library_loans_one_active_copy_per_user
    on public.library_loans (user_id, book_id) where not returned;

create table if not exists public.library_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    transaction_type text not null check (transaction_type in ('borrow', 'return', 'purchase', 'premium')),
    book_id text,
    book_title text,
    amount numeric(10, 2) not null default 0,
    details jsonb not null default '{}'::jsonb,
    occurred_at timestamptz not null default now()
);

create or replace function public.prevent_deleting_borrowed_book()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
    if exists (
        select 1 from public.library_loans
        where book_id = old.id and not returned
    ) then
        raise exception 'Return all active loans before deleting this book.';
    end if;
    return old;
end;
$$;

drop trigger if exists prevent_deleting_borrowed_book on public.library_books;
create trigger prevent_deleting_borrowed_book
    before delete on public.library_books
    for each row execute procedure public.prevent_deleting_borrowed_book();

revoke all on public.profiles from anon;
revoke all on public.library_books from anon;
revoke all on public.library_user_data from anon, authenticated;
revoke all on public.library_loans from anon, authenticated;
revoke all on public.library_transactions from anon, authenticated;
revoke all on public.profiles from authenticated;
revoke all on public.library_books from authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, update, delete on public.library_books to authenticated;
grant select on public.library_user_data to authenticated;
grant select on public.library_loans to authenticated;
grant select, insert on public.library_transactions to authenticated;

create or replace function public.save_library_user_data(p_payload jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    member_id uuid := (select auth.uid());
begin
    if member_id is null then
        raise exception 'Sign in to save your library data.';
    end if;

    insert into public.library_user_data (user_id, payload)
    values (member_id, coalesce(p_payload, '{}'::jsonb) - 'borrows')
    on conflict (user_id) do update
    set payload = coalesce(p_payload, '{}'::jsonb) - 'borrows',
        updated_at = now();
end;
$$;

create or replace function public.import_library_loans(p_loans jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    member_id uuid := (select auth.uid());
    profile_username text;
    old_loan jsonb;
    book_data jsonb;
    loan_data jsonb;
    active_count integer := 0;
begin
    if member_id is null then
        raise exception 'Sign in to import your library data.';
    end if;
    if exists (select 1 from public.library_user_data where user_id = member_id)
       or exists (select 1 from public.library_loans where user_id = member_id) then
        raise exception 'Library data has already been initialized for this account.';
    end if;
    if jsonb_typeof(coalesce(p_loans, '[]'::jsonb)) <> 'array' then
        raise exception 'Loan migration data must be an array.';
    end if;

    select username into profile_username from public.profiles where id = member_id for update;
    for old_loan in select item from jsonb_array_elements(coalesce(p_loans, '[]'::jsonb)) as items(item)
    loop
        if coalesce((old_loan ->> 'returned')::boolean, false) then
            select data into book_data from public.library_books where id = old_loan ->> 'id';
            if book_data is null then
                book_data := '{}'::jsonb;
            end if;
        else
            active_count := active_count + 1;
            if active_count > 3 then
                raise exception 'Your existing data has more than 3 active loans. Resolve it before migrating.';
            end if;

            select data into book_data
            from public.library_books
            where id = old_loan ->> 'id'
            for update;
            if book_data is null then
                raise exception 'A book in your existing loans is missing from the Supabase catalog.';
            end if;
            if coalesce((book_data ->> 'available')::integer, 0) <= 0 then
                raise exception 'A book in your existing loans has no available copies.';
            end if;

            book_data := jsonb_set(book_data, '{available}',
                to_jsonb(greatest(0, coalesce((book_data ->> 'available')::integer, 0) - 1)), true);
            update public.library_books
            set data = book_data, updated_at = now()
            where id = old_loan ->> 'id';
        end if;

        loan_data := jsonb_build_object(
            'id', old_loan ->> 'id',
            'title', coalesce(old_loan ->> 'title', book_data ->> 'title'),
            'username', profile_username,
            'borrowedOn', coalesce(old_loan ->> 'borrowedOn', current_date::text),
            'dueDate', coalesce(old_loan ->> 'dueDate', current_date::text),
            'borrowFee', 10,
            'isPremium', coalesce((book_data ->> 'isPremium')::boolean, false),
            'returned', coalesce((old_loan ->> 'returned')::boolean, false),
            'returnedOn', old_loan ->> 'returnedOn'
        );
        insert into public.library_loans (user_id, book_id, data, returned)
        values (member_id, old_loan ->> 'id', loan_data, coalesce((old_loan ->> 'returned')::boolean, false));
        insert into public.library_transactions (user_id, transaction_type, book_id, book_title, amount, details)
        values (member_id, case when coalesce((old_loan ->> 'returned')::boolean, false) then 'return' else 'borrow' end,
                old_loan ->> 'id', loan_data ->> 'title', 10, loan_data);
    end loop;
end;
$$;

create or replace function public.delete_own_library_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
    active_loan record;
begin
    if (select auth.uid()) is null then
        raise exception 'Sign in to delete your account.';
    end if;

    for active_loan in
        select book_id
        from public.library_loans
        where user_id = (select auth.uid()) and not returned
    loop
        update public.library_books
        set data = jsonb_set(
            data,
            '{available}',
            to_jsonb(least(
                coalesce((data ->> 'copies')::integer, 0),
                coalesce((data ->> 'available')::integer, 0) + 1
            )),
            true
        ), updated_at = now()
        where id = active_loan.book_id;
    end loop;

    update public.library_books
    set data = jsonb_set(data, '{uploadedBy}', 'null'::jsonb, true),
        updated_at = now()
    where data ->> 'uploadedBy' = (
        select username from public.profiles where id = (select auth.uid())
    );

    delete from auth.users where id = (select auth.uid());
end;
$$;

create or replace function public.activate_demo_premium()
returns date
language plpgsql
security definer
set search_path = ''
as $$
declare
    member_id uuid := (select auth.uid());
    end_date date := current_date + 30;
begin
    if member_id is null then
        raise exception 'Sign in to activate Premium.';
    end if;
    perform set_config('app.allow_membership_change', 'on', true);
    update public.profiles
    set membership = 'premium', premium_until = end_date
    where id = member_id and not banned;
    if not found then
        raise exception 'This account cannot activate Premium.';
    end if;
    insert into public.library_transactions (user_id, transaction_type, amount, details)
    values (member_id, 'premium', 99, jsonb_build_object('premium_until', end_date));
    return end_date;
end;
$$;

create or replace function public.cancel_demo_premium()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if (select auth.uid()) is null then
        raise exception 'Sign in to cancel Premium.';
    end if;
    perform set_config('app.allow_membership_change', 'on', true);
    update public.profiles
    set membership = 'regular', premium_until = null
    where id = (select auth.uid()) and membership = 'premium';
end;
$$;

create or replace function public.apply_for_author(p_pen_name text, p_author_bio text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
    if (select auth.uid()) is null then
        raise exception 'Sign in to apply as an author.';
    end if;
    if length(trim(coalesce(p_pen_name, ''))) < 2 or length(trim(coalesce(p_pen_name, ''))) > 40 then
        raise exception 'Pen name must be between 2 and 40 characters.';
    end if;
    if length(coalesce(p_author_bio, '')) > 300 then
        raise exception 'Author bio must be 300 characters or fewer.';
    end if;

    perform set_config('app.allow_author_application', 'on', true);
    update public.profiles
    set author_status = 'pending',
        pen_name = trim(p_pen_name),
        author_bio = trim(coalesce(p_author_bio, '')),
        author_applied_at = current_date
    where id = (select auth.uid())
      and not banned
      and author_status <> 'approved';
    if not found then
        raise exception 'This account cannot submit an author application.';
    end if;
end;
$$;

create or replace function public.borrow_library_book(p_book_id text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    borrower uuid := (select auth.uid());
    borrower_profile public.profiles%rowtype;
    book_data jsonb;
    active_count integer;
    loan_data jsonb;
begin
    if borrower is null then
        raise exception 'Sign in to borrow a book.';
    end if;

    select * into borrower_profile
    from public.profiles
    where id = borrower and not banned
    for update;
    if not found then
        raise exception 'This account cannot borrow books.';
    end if;

    select data into book_data
    from public.library_books
    where id = p_book_id
    for update;
    if not found then
        raise exception 'Book not found.';
    end if;
    if coalesce((book_data ->> 'available')::integer, 0) <= 0 then
        raise exception 'No copies are currently available.';
    end if;
    if coalesce((book_data ->> 'isPremium')::boolean, false)
       and (borrower_profile.membership <> 'premium'
            or (borrower_profile.premium_until is not null and borrower_profile.premium_until < current_date)) then
        raise exception 'An active Premium membership is required.';
    end if;

    select count(*) into active_count
    from public.library_loans
    where user_id = borrower and not returned;
    if active_count >= 3 then
        raise exception 'You have reached the active loan limit.';
    end if;
    if exists (
        select 1
        from public.library_loans
        where user_id = borrower
          and not returned
          and (data ->> 'dueDate')::date < current_date
    ) then
        raise exception 'Return overdue books before borrowing another.';
    end if;

    loan_data := jsonb_build_object(
        'id', p_book_id,
        'title', book_data ->> 'title',
        'username', borrower_profile.username,
        'borrowedOn', current_date::text,
        'dueDate', (current_date + 14)::text,
        'borrowFee', 10,
        'isPremium', coalesce((book_data ->> 'isPremium')::boolean, false),
        'returned', false,
        'returnedOn', null
    );

    book_data := jsonb_set(book_data, '{available}',
        to_jsonb(greatest(0, coalesce((book_data ->> 'available')::integer, 0) - 1)), true);
    update public.library_books
    set data = book_data, updated_at = now()
    where id = p_book_id;

    insert into public.library_loans (user_id, book_id, data, returned)
    values (borrower, p_book_id, loan_data, false);

    insert into public.library_transactions (user_id, transaction_type, book_id, book_title, amount, details)
    values (borrower, 'borrow', p_book_id, book_data ->> 'title',
            10, loan_data);
    return jsonb_build_object('book', book_data, 'loan', loan_data);
end;
$$;

create or replace function public.return_library_book(p_book_id text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
    borrower uuid := (select auth.uid());
    book_data jsonb;
    new_borrows jsonb;
    returned_loan jsonb;
begin
    if borrower is null then
        raise exception 'Sign in to return a book.';
    end if;

    select data into returned_loan
    from public.library_loans
    where user_id = borrower and book_id = p_book_id and not returned
    for update;

    if returned_loan is null then
        raise exception 'No active loan found for this book.';
    end if;

    select data into book_data
    from public.library_books
    where id = p_book_id
    for update;
    if not found then
        raise exception 'Book not found.';
    end if;

    new_borrows := returned_loan || jsonb_build_object('returned', true, 'returnedOn', current_date::text);
    update public.library_loans
    set data = new_borrows, returned = true
    where user_id = borrower and book_id = p_book_id and not returned;

    book_data := jsonb_set(book_data, '{available}',
        to_jsonb(least(
            coalesce((book_data ->> 'copies')::integer, 0),
            coalesce((book_data ->> 'available')::integer, 0) + 1
        )), true);
    update public.library_books
    set data = book_data, updated_at = now()
    where id = p_book_id;

    insert into public.library_transactions (user_id, transaction_type, book_id, book_title, details)
    values (borrower, 'return', p_book_id, book_data ->> 'title', returned_loan);
    return jsonb_build_object('book', book_data, 'loan', new_borrows);
end;
$$;

alter table public.profiles enable row level security;
alter table public.library_books enable row level security;
alter table public.library_user_data enable row level security;
alter table public.library_loans enable row level security;
alter table public.library_transactions enable row level security;

drop policy if exists "Profiles can be read by owner or library admin" on public.profiles;
create policy "Profiles can be read by owner or library admin"
    on public.profiles for select to authenticated
    using (id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Profiles enforce owner boundary" on public.profiles;
create policy "Profiles enforce owner boundary"
    on public.profiles as restrictive for all to authenticated
    using (id = (select auth.uid()) or (select public.is_library_admin()))
    with check (id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Users can create their own profile" on public.profiles;
drop policy if exists "Users and admins can update profiles" on public.profiles;
create policy "Users and admins can update profiles"
    on public.profiles for update to authenticated
    using (id = (select auth.uid()) or (select public.is_library_admin()))
    with check (id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Authenticated users can read books" on public.library_books;
create policy "Authenticated users can read books"
    on public.library_books for select to authenticated
    using (true);

drop policy if exists "Books restrict reads to authenticated users" on public.library_books;
create policy "Books restrict reads to authenticated users"
    on public.library_books as restrictive for select to authenticated
    using (true);

drop policy if exists "Books restrict inserts to staff or owner author" on public.library_books;
create policy "Books restrict inserts to staff or owner author"
    on public.library_books as restrictive for insert to authenticated
    with check (
        (select public.is_library_admin())
        or exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    );

drop policy if exists "Books restrict updates to staff or owner author" on public.library_books;
create policy "Books restrict updates to staff or owner author"
    on public.library_books as restrictive for update to authenticated
    using (
        (select public.is_library_admin())
        or exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    )
    with check (
        (select public.is_library_admin())
        or exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    );

drop policy if exists "Books restrict deletes to staff or owner author" on public.library_books;
create policy "Books restrict deletes to staff or owner author"
    on public.library_books as restrictive for delete to authenticated
    using (
        (select public.is_library_admin())
        or exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    );

drop policy if exists "Library admins can manage books" on public.library_books;
create policy "Library admins can manage books"
    on public.library_books for all to authenticated
    using ((select public.is_library_admin()))
    with check ((select public.is_library_admin()));

drop policy if exists "Authors can manage their own books" on public.library_books;
create policy "Authors can manage their own books"
    on public.library_books for all to authenticated
    using (
        exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    )
    with check (
        exists (
            select 1 from public.profiles profile
            where profile.id = (select auth.uid())
              and profile.author_status = 'approved'
              and not profile.banned
              and profile.username = library_books.data ->> 'uploadedBy'
        )
    );

drop policy if exists "Users can read their own app data" on public.library_user_data;
drop policy if exists "Users can manage their own app data" on public.library_user_data;
create policy "Users can read their own app data"
    on public.library_user_data for select to authenticated
    using (user_id = (select auth.uid()));

drop policy if exists "App data restricts owner reads" on public.library_user_data;
create policy "App data restricts owner reads"
    on public.library_user_data as restrictive for select to authenticated
    using (user_id = (select auth.uid()));

drop policy if exists "Users can read their own loans" on public.library_loans;
create policy "Users can read their own loans"
    on public.library_loans for select to authenticated
    using (user_id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Loans restrict owner reads" on public.library_loans;
create policy "Loans restrict owner reads"
    on public.library_loans as restrictive for select to authenticated
    using (user_id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Users can read their own transactions" on public.library_transactions;
create policy "Users can read their own transactions"
    on public.library_transactions for select to authenticated
    using (user_id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Transactions restrict owner reads" on public.library_transactions;
create policy "Transactions restrict owner reads"
    on public.library_transactions as restrictive for select to authenticated
    using (user_id = (select auth.uid()) or (select public.is_library_admin()));

drop policy if exists "Users can create their own transactions" on public.library_transactions;
create policy "Users can create their own transactions"
    on public.library_transactions for insert to authenticated
    with check (user_id = (select auth.uid()));

drop policy if exists "Transactions restrict owner inserts" on public.library_transactions;
create policy "Transactions restrict owner inserts"
    on public.library_transactions as restrictive for insert to authenticated
    with check (user_id = (select auth.uid()));

revoke all on function public.save_library_user_data(jsonb) from public;
revoke all on function public.import_library_loans(jsonb) from public;
revoke all on function public.borrow_library_book(text) from public;
revoke all on function public.return_library_book(text) from public;
revoke all on function public.delete_own_library_account() from public;
revoke all on function public.activate_demo_premium() from public;
revoke all on function public.cancel_demo_premium() from public;
revoke all on function public.apply_for_author(text, text) from public;
grant execute on function public.save_library_user_data(jsonb) to authenticated;
grant execute on function public.import_library_loans(jsonb) to authenticated;
grant execute on function public.borrow_library_book(text) to authenticated;
grant execute on function public.return_library_book(text) to authenticated;
grant execute on function public.delete_own_library_account() to authenticated;
grant execute on function public.activate_demo_premium() to authenticated;
grant execute on function public.cancel_demo_premium() to authenticated;
grant execute on function public.apply_for_author(text, text) to authenticated;

notify pgrst, 'reload schema';

-- Promote the account you control:
-- update public.profiles set role = 'admin' where email = 'you@example.com';
