const STORAGE_KEYS = {
    books: "libraryBooks",
    cart: "libraryCart",
    sales: "librarySales",
    borrows: "libraryBorrows",
    favorites: "libraryFavorites",
    recentlyViewed: "libraryRecent",
    notifications: "libraryNotifications",
    reports: "libraryReports",
    userRatings: "libraryUserRatings"
};

const AUTH_ACCOUNTS_KEY = "libraryAccounts";

const MAX_BORROWS = 3;
const BORROW_FEE = 10;
const PREMIUM_PRICE = 99;
const LOAN_DAYS = 14;
const PREMIUM_DAYS = 30;

function showToast(message) {
    let toast = document.getElementById("appToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "appToast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
}
window.alert = message => showToast(String(message));

const defaultBooks = [
    { id: "BK-007", title: "Noli Me Tangere", author: "Jose Rizal", category: "Fiction", price: 300, year: 1887, edition: "1st", copies: 5, available: 3, shelf: "F-01", condition: "Good", description: "A novel that exposes the social cancer of the Philippines during the Spanish colonial period.", rating: 4.8, latest: "2026-10-17", image: "Images/noli-me-tangere.svg", isPremium: false },
    { id: "BK-101", title: "Clean Codings", author: "Robert B. Stark", category: "Programming", price: 450, year: 2024, edition: "2nd", copies: 5, available: 3, shelf: "A-12", condition: "Good", description: "A handbook of agile software craftsmanship.", rating: 4.7, latest: "2024-10-05", image: "Images/clean-codings.jpg", isPremium: false },
    { id: "BK-102", title: "The C Programming Language", author: "Xean M. Verutacio", category: "Programming", price: 300, year: 2013, edition: "1st", copies: 4, available: 2, shelf: "A-08", condition: "Fair", description: "Classic introduction to C.", rating: 4.5, latest: "2013-03-03", image: "Images/the-c-programming-language.jpg", isPremium: false },
    { id: "BK-103", title: "Introduction to Java Programming", author: "Y. Daniel Liang", category: "Programming", price: 250, year: 2022, edition: "12th", copies: 6, available: 5, shelf: "A-15", condition: "Excellent", description: "Comprehensive Java textbook.", rating: 4.3, latest: "2026-10-17", image: "Images/introduction-to-java-programming.jpg", isPremium: false },
    { id: "BK-104", title: "Python Crash Course", author: "Eric Banner", category: "Programming", price: 250, year: 2023, edition: "3rd", copies: 8, available: 6, shelf: "A-03", condition: "Good", description: "Hands-on Python projects.", rating: 4.8, latest: "2026-10-17", image: "Images/python-crash-course.jpg", isPremium: false },
    { id: "BK-105", title: "Eloquent Web Design", author: "Herbert T. Pherbhert", category: "Programming", price: 250, year: 2021, edition: "1st", copies: 3, available: 1, shelf: "B-07", condition: "Good", description: "Modern web design principles.", rating: 4.1, latest: "2026-10-17", image: "Images/eloquent-web-design.jpg", isPremium: false },
    { id: "BK-106", title: "Computer Organization and Design", author: "Robert B. Stark", category: "Computer Engineering", price: 280, year: 2020, edition: "5th", copies: 4, available: 3, shelf: "C-01", condition: "Good", description: "Hardware/software interface.", rating: 4.4, latest: "2026-10-17", image: "Images/computer-organization-and-design.jpg", isPremium: false },
    { id: "BK-107", title: "Computer Architecture", author: "Bruce Banter", category: "Computer Engineering", price: 270, year: 2019, edition: "2nd", copies: 3, available: 2, shelf: "C-04", condition: "Fair", description: "Quantitative architecture.", rating: 4.2, latest: "2026-10-17", image: "Images/computer-architecture.jpg", isPremium: false },
    { id: "BK-108", title: "Digital Design", author: "Dixon Nixon", category: "Computer Engineering", price: 260, year: 2021, edition: "1st", copies: 5, available: 4, shelf: "C-09", condition: "Excellent", description: "Digital logic fundamentals.", rating: 4.0, latest: "2026-10-17", image: "Images/digital-design.jpg", isPremium: false },
    { id: "BK-109", title: "Electronics Circuits", author: "Krey Thos", category: "Computer Engineering", price: 240, year: 2018, edition: "3rd", copies: 4, available: 2, shelf: "C-11", condition: "Good", description: "Electronic circuit analysis.", rating: 3.9, latest: "2026-10-17", image: "Images/electronics-circuits.jpg", isPremium: false },
    { id: "BK-110", title: "Embedded System", author: "Kirk Cobain", category: "Computer Engineering", price: 290, year: 2022, edition: "1st", copies: 3, available: 3, shelf: "C-14", condition: "Excellent", description: "Embedded systems design.", rating: 4.3, latest: "2026-10-17", image: "Images/embedded-system.jpg", isPremium: false },
    { id: "BK-111", title: "Computer Networking", author: "Steve Nash", category: "Networking", price: 320, year: 2021, edition: "8th", copies: 5, available: 3, shelf: "D-02", condition: "Good", description: "Top-down networking approach.", rating: 4.6, latest: "2026-10-17", image: "Images/computer-networking.jpg", isPremium: false },
    { id: "BK-112", title: "Network Communication", author: "Kwah Liti", category: "Networking", price: 230, year: 2020, edition: "2nd", copies: 4, available: 4, shelf: "D-05", condition: "Good", description: "Network protocols.", rating: 4.0, latest: "2026-10-17", image: "Images/network-communication.jpg", isPremium: false },
    { id: "BK-113", title: "Introduction to Internet", author: "LeBrown Jeims", category: "Networking", price: 200, year: 2019, edition: "1st", copies: 6, available: 5, shelf: "D-08", condition: "Fair", description: "Internet basics.", rating: 3.8, latest: "2026-10-17", image: "Images/introduction-to-internet.jpg", isPremium: false },
    { id: "BK-114", title: "Data Networking", author: "Halt and Others", category: "Networking", price: 250, year: 2022, edition: "1st", copies: 3, available: 1, shelf: "D-12", condition: "Good", description: "Data communication concepts.", rating: 4.1, latest: "2026-10-17", image: "Images/data-networking.jpg", isPremium: false },
    { id: "BK-115", title: "TCP/IP Illustrated", author: "Walter Black", category: "Networking", price: 310, year: 2018, edition: "2nd", copies: 4, available: 2, shelf: "D-15", condition: "Good", description: "TCP/IP protocol suite.", rating: 4.5, latest: "2026-10-17", image: "Images/tcp-ip-illustrated.jpg", isPremium: false },
    { id: "BK-116", title: "Security Engineering", author: "Robert B. Stark", category: "Cybersecurity", price: 350, year: 2020, edition: "3rd", copies: 3, available: 2, shelf: "E-01", condition: "Excellent", description: "Building secure systems.", rating: 4.7, latest: "2026-10-17", image: "Images/security-engineering.jpg", isPremium: false },
    { id: "BK-117", title: "Hacking: The Art of Exploitation", author: "Jonathan Klied", category: "Cybersecurity", price: 280, year: 2019, edition: "2nd", copies: 4, available: 1, shelf: "E-04", condition: "Good", description: "Hands-on hacking techniques.", rating: 4.4, latest: "2026-10-17", image: "Images/hacking-the-art-of-exploitation.jpg", isPremium: false },
    { id: "BK-118", title: "Blue Team Handbook", author: "Anna Klied", category: "Cybersecurity", price: 260, year: 2021, edition: "1st", copies: 5, available: 4, shelf: "E-07", condition: "Excellent", description: "Incident response guide.", rating: 4.2, latest: "2026-10-17", image: "Images/blue-team-handbook.jpg", isPremium: false },
    { id: "BK-119", title: "Threat Modeling", author: "Frank Einstein", category: "Cybersecurity", price: 240, year: 2022, edition: "1st", copies: 3, available: 3, shelf: "E-10", condition: "Good", description: "Security threat modeling.", rating: 4.0, latest: "2026-10-17", image: "Images/threat-modeling.jpg", isPremium: false },
    { id: "BK-120", title: "Introduction to Cryptography", author: "Alfred Camel", category: "Cybersecurity", price: 270, year: 2020, edition: "2nd", copies: 4, available: 2, shelf: "E-13", condition: "Good", description: "Cryptography fundamentals.", rating: 4.3, latest: "2026-10-17", image: "Images/introduction-to-cryptography.jpg", isPremium: false },
    { id: "BK-121", title: "Hands-On Machine Learning", author: "Seiy Antis", category: "AI and Data Science", price: 380, year: 2022, edition: "3rd", copies: 5, available: 3, shelf: "F-02", condition: "Excellent", description: "Practical ML with Python.", rating: 4.8, latest: "2026-10-17", image: "Images/hands-on-machine-learning.jpg", isPremium: false },
    { id: "BK-122", title: "Deep Learning", author: "Magnus Nakamura", category: "AI and Data Science", price: 400, year: 2021, edition: "1st", copies: 3, available: 1, shelf: "F-05", condition: "Good", description: "Deep learning introduction.", rating: 4.6, latest: "2026-10-17", image: "Images/deep-learning.jpg", isPremium: false },
    { id: "BK-123", title: "Artificial Intelligence: A Modern Approach", author: "Robert B. Stark", category: "AI and Data Science", price: 420, year: 2020, edition: "4th", copies: 4, available: 2, shelf: "F-08", condition: "Excellent", description: "The definitive AI textbook.", rating: 4.9, latest: "2026-10-17", image: "Images/artificial-intelligence-a-modern-approach.jpg", isPremium: false },
    { id: "BK-124", title: "Python for Machine Learning", author: "Hadji Glitch", category: "AI and Data Science", price: 290, year: 2023, edition: "2nd", copies: 6, available: 5, shelf: "F-11", condition: "Good", description: "ML projects with Python.", rating: 4.4, latest: "2026-10-17", image: "Images/python-for-machine-learning.jpg", isPremium: false },
    { id: "BK-125", title: "Data Science from Scratch", author: "Kirk Cobain", category: "AI and Data Science", price: 310, year: 2019, edition: "2nd", copies: 4, available: 3, shelf: "F-14", condition: "Good", description: "Data science fundamentals.", rating: 4.5, latest: "2026-10-17", image: "Images/data-science-from-scratch.jpg", isPremium: false }
];

const premiumTopics = ["Programming", "Computer Engineering", "Networking", "Cybersecurity", "AI and Data Science"];
const premiumAuthors = ["Robert B. Stark", "Xean M. Verutacio", "Y. Daniel Liang", "Eric Banner", "Herbert T. Pherbhert", "Steve Nash", "Jonathan Klied", "Seiy Antis", "Magnus Nakamura"];
for (let i = 1; i <= 75; i++) {
    const topic = premiumTopics[(i - 1) % premiumTopics.length];
    const author = premiumAuthors[(i - 1) % premiumAuthors.length];
    defaultBooks.push({
        id: `PBK-${200 + i}`,
        title: `Advanced ${topic} Masterclass Vol. ${i}`,
        author: author,
        category: topic,
        price: 500 + (i * 10),
        year: 2025,
        edition: "VIP 1st",
        copies: 5,
        available: 5,
        shelf: `VIP-${i}`,
        condition: "Pristine",
        description: `Exclusive VIP Premium book covering expert-level concepts in ${topic}.`,
        rating: 5.0,
        latest: "2026-10-17",
        image: `Images/premium-book-${String(i).padStart(3, "0")}.jpg`,
        isPremium: true
    });
}

const defaultSales = { today: 3500, month: 16500, pending: 3, returns: 1, count: 5 };

function readJSON(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "null");
        return value === null ? fallback : value;
    } catch {
        return fallback;
    }
}

let books = (() => {
    const saved = readJSON(STORAGE_KEYS.books, null);
    const list = Array.isArray(saved) ? saved : defaultBooks.map(b => ({ ...b }));
    const defaultsById = Object.fromEntries(defaultBooks.map(b => [b.id, b]));

    const deletedDefaults = readJSON("libraryDeletedDefaults", []);
    const have = new Set(list.map(b => b.id));
    const missingPremium = defaultBooks
        .filter(b => b.isPremium && !have.has(b.id) && !deletedDefaults.includes(b.id))
        .map(b => ({ ...b }));
    list.push(...missingPremium);

    return list.map(b => {
        const base = defaultsById[b.id] || {};
        const merged = {
            copies: 3,
            available: 2,
            shelf: "A-01",
            condition: "Good",
            description: "",
            year: 2020,
            edition: "1st",
            rating: 4.0,
            image: "images/no-cover.jpg",
            isPremium: false,
            ...base,
            ...b
        };
        if (defaultsById[b.id] && /^images\//i.test(b.image || "")) {
            merged.image = base.image;
        }
        if (!merged.shelf || merged.shelf === "A-01") merged.shelf = base.shelf || merged.shelf;
        if (!merged.year || merged.year === 2020) merged.year = base.year || merged.year;
        if (merged.rating == null) merged.rating = base.rating ?? merged.rating;
        if (!merged.description || merged.description.length < 5) merged.description = base.description || merged.description;
        if (merged.copies == null) merged.copies = base.copies ?? 3;
        if (merged.available == null) merged.available = base.available ?? 2;
        return merged;
    });
})();
let catalogNeedsInitialization = false;

let cartByUser = readJSON(STORAGE_KEYS.cart, {});
if (Array.isArray(cartByUser)) cartByUser = { _legacy: cartByUser };
if (typeof cartByUser !== "object" || cartByUser === null) cartByUser = {};

let favoritesByUser = readJSON(STORAGE_KEYS.favorites, {});
if (Array.isArray(favoritesByUser)) favoritesByUser = { _legacy: favoritesByUser };
if (typeof favoritesByUser !== "object" || favoritesByUser === null) favoritesByUser = {};

let recentByUser = readJSON(STORAGE_KEYS.recentlyViewed, {});
if (Array.isArray(recentByUser)) recentByUser = { _legacy: recentByUser };
if (typeof recentByUser !== "object" || recentByUser === null) recentByUser = {};

let cart = [];
let favorites = [];
let recentlyViewed = [];

let sales = Object.assign({}, defaultSales, readJSON(STORAGE_KEYS.sales, {}));

let borrows = readJSON(STORAGE_KEYS.borrows, []);
if (!Array.isArray(borrows)) borrows = [];

let reports = readJSON(STORAGE_KEYS.reports, []);
if (!Array.isArray(reports)) reports = [];

let userRatings = readJSON(STORAGE_KEYS.userRatings, {});

let notifications = readJSON(STORAGE_KEYS.notifications, [
    {
        id: 1,
        title: "Welcome!",
        message: "Explore our library catalog and borrow your favorite books.",
        time: "Just now",
        read: false
    }
]);

let currentUser = null;
let currentRole = "user";
let currentAuthUser = null;
let currentRatingBookId = null;
let selectedRatingStars = 5;
let reportingTargetType = null;
let reportingTargetId = null;
let purchaseHistory = [];

const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".side-nav-item[data-page]");
const appShell = document.getElementById("appShell");
const loginPage = document.getElementById("loginPage");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");

function showAuthForm(formName) {
    const isSignup = formName === "signup";
    const isForgot = formName === "forgot";
    const forgotForm = document.getElementById("forgotForm");
    const passwordResetForm = document.getElementById("passwordResetForm");

    loginForm?.classList.toggle("hidden", isSignup || isForgot);
    signupForm?.classList.toggle("hidden", !isSignup);
    forgotForm?.classList.toggle("hidden", !isForgot);
    passwordResetForm?.classList.add("hidden");

    if (isForgot) resetForgotForm();

    const title = document.getElementById("authTitle");
    const subtitle = document.getElementById("authSubtitle");

    if (title) title.textContent = isSignup ? "Create Account" : isForgot ? "Forgot Password" : "Library Login";
    if (subtitle) subtitle.textContent = isSignup ? "Choose how you want to join" : isForgot ? "We'll email you a secure password reset link" : "Sign in to manage your library";

    updateSignupType();

    if (loginError) loginError.textContent = "";
    if (signupError) signupError.textContent = "";
}

function getSavedAccounts() {
    const accounts = readJSON(AUTH_ACCOUNTS_KEY, []);
    return Array.isArray(accounts) ? accounts : [];
}

function saveAccounts(accounts) {
    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
    if (currentAuthUser) {
        saveSupabaseProfiles(accounts).catch(error => showSupabaseError(error, "Unable to save account profile"));
    }
}

async function saveSupabaseProfiles(accounts) {
    const profileRows = accounts.filter(item => item.id).map(item => ({
        id: item.id,
        email: item.email,
        username: item.username,
        role: item.role || "user",
        membership: item.membership || "regular",
        premium_until: item.premiumUntil || null,
        banned: !!item.banned,
        author_status: item.authorStatus || "none",
        pen_name: item.penName || "",
        author_bio: item.authorBio || "",
        author_applied_at: item.authorAppliedAt || null
    }));
    if (!profileRows.length) return;

    for (const profile of profileRows) {
        const { data, error } = await window.librarySupabase
            .from("profiles")
            .update(profile)
            .eq("id", profile.id)
            .select("id");
        if (error) throw error;
        if (!data?.length) throw new Error(`Unable to update profile ${profile.id}.`);
    }
}

function accountFromProfile(profile) {
    return {
        id: profile.id,
        email: profile.email,
        username: profile.username,
        role: profile.role,
        membership: profile.membership,
        premiumUntil: profile.premium_until,
        banned: profile.banned,
        authorStatus: profile.author_status,
        penName: profile.pen_name,
        authorBio: profile.author_bio,
        authorAppliedAt: profile.author_applied_at,
        createdAt: profile.created_at
    };
}

async function loadSupabaseData(authUser) {
    currentAuthUser = authUser;
    const { data: profile, error: profileError } = await window.librarySupabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();
    if (profileError) throw profileError;

    let accounts = [accountFromProfile(profile)];
    if (["admin", "librarian"].includes(profile.role) && !profile.banned) {
        const { data: profiles, error: profilesError } = await window.librarySupabase
            .from("profiles")
            .select("*")
            .order("username");
        if (profilesError) throw profilesError;
        accounts = profiles.map(accountFromProfile);
    }
    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));

    const { data: bookRows, error: booksError } = await window.librarySupabase
        .from("library_books")
        .select("id,data");
    if (booksError) throw booksError;

    const canInitializeCatalog = ["admin", "librarian"].includes(profile.role) && !profile.banned;
    const catalogToSeed = readJSON(STORAGE_KEYS.books, null);
    const deletedDefaults = readJSON("libraryDeletedDefaults", []);
    if (bookRows.length) {
        books = bookRows.map(row => row.data);
        if (canInitializeCatalog) {
            const existingIds = new Set(books.map(book => book.id));
            const missingDefaults = defaultBooks.filter(
                book => !existingIds.has(book.id) && !deletedDefaults.includes(book.id)
            );
            if (missingDefaults.length) {
                const initialBooks = missingDefaults.map(book => ({
                    id: book.id,
                    data: { ...book, available: Number(book.copies) || 0 }
                }));
                const { error: seedError } = await window.librarySupabase
                    .from("library_books")
                    .upsert(initialBooks, { onConflict: "id" });
                if (seedError) throw seedError;
                books.push(...initialBooks.map(row => row.data));
            }
        }
        catalogNeedsInitialization = false;
    } else if (canInitializeCatalog) {
        const catalog = Array.isArray(catalogToSeed) && catalogToSeed.length
            ? catalogToSeed
            : defaultBooks;
        const existingIds = new Set(catalog.map(book => book.id));
        const initialCatalog = [
            ...catalog.filter(book => !deletedDefaults.includes(book.id)),
            ...defaultBooks.filter(book =>
                !existingIds.has(book.id) && !deletedDefaults.includes(book.id)
            )
        ];
        const initialBooks = initialCatalog.map(book => ({
            id: book.id,
            data: { ...book, available: Number(book.copies) || 0 }
        }));
        const { error: seedError } = await window.librarySupabase
            .from("library_books")
            .upsert(initialBooks, { onConflict: "id" });
        if (seedError) throw seedError;
        books = initialBooks.map(row => row.data);
        catalogNeedsInitialization = false;
    } else {
        books = [];
        catalogNeedsInitialization = true;
    }

    const { data: savedState, error: stateError } = await window.librarySupabase
        .from("library_user_data")
        .select("payload")
        .eq("user_id", authUser.id)
        .maybeSingle();
    if (stateError) throw stateError;

    const usernameKey = String(profile.username).toLowerCase();
    const storedBorrows = readJSON(STORAGE_KEYS.borrows, []);
    const localBorrows = (Array.isArray(storedBorrows) ? storedBorrows : []).filter(
        borrow => sameUser(borrow.username, profile.username)
    );
    const localState = {
        cart: readJSON(STORAGE_KEYS.cart, {})[usernameKey] || [],
        favorites: readJSON(STORAGE_KEYS.favorites, {})[usernameKey] || [],
        recentlyViewed: readJSON(STORAGE_KEYS.recentlyViewed, {})[usernameKey] || [],
        notifications: readJSON(STORAGE_KEYS.notifications, []),
        userRatings: readJSON(STORAGE_KEYS.userRatings, {})[usernameKey] || [],
        sales: readJSON(STORAGE_KEYS.sales, defaultSales),
        purchases: []
    };
    if (!savedState && localBorrows.length) {
        if (!bookRows.length && !["admin", "librarian"].includes(profile.role)) {
            throw new Error("An administrator must initialize the Supabase book catalog before existing loans can be migrated.");
        }
        const { error: importError } = await window.librarySupabase
            .rpc("import_library_loans", { p_loans: localBorrows });
        if (importError) throw importError;
    }

    let loanQuery = window.librarySupabase.from("library_loans").select("data");
    if (!["admin", "librarian"].includes(profile.role) || profile.banned) {
        loanQuery = loanQuery.eq("user_id", authUser.id);
    }
    const { data: loanRows, error: loansError } = await loanQuery;
    if (loansError) throw loansError;

    const state = savedState?.payload || localState;
    cart = Array.isArray(state.cart) ? state.cart : [];
    favorites = Array.isArray(state.favorites) ? state.favorites : [];
    recentlyViewed = Array.isArray(state.recentlyViewed) ? state.recentlyViewed : [];
    borrows = ["admin", "librarian"].includes(profile.role) && !profile.banned
        ? loanRows.map(row => row.data)
        : [
            ...borrows.filter(borrow => !sameUser(borrow.username, profile.username)),
            ...loanRows.map(row => row.data)
        ];
    notifications = Array.isArray(state.notifications) ? state.notifications : notifications;
    sales = Object.assign({}, defaultSales, state.sales || {});
    purchaseHistory = Array.isArray(state.purchases) ? state.purchases : [];
    userRatings[usernameKey] = Array.isArray(state.userRatings) ? state.userRatings : [];
    cartByUser[usernameKey] = cart;
    favoritesByUser[usernameKey] = favorites;
    recentByUser[usernameKey] = recentlyViewed;
    if (["admin", "librarian"].includes(profile.role) && !profile.banned) {
        const { data: transactions, error: transactionError } = await window.librarySupabase
            .from("library_transactions")
            .select("transaction_type,amount,details,occurred_at");
        if (transactionError) throw transactionError;
        const todayDate = today();
        const monthPrefix = todayDate.slice(0, 7);
        const todayTransactions = transactions.filter(item => item.occurred_at.slice(0, 10) === todayDate);
        const monthTransactions = transactions.filter(item => item.occurred_at.slice(0, 7) === monthPrefix);
        sales = {
            today: todayTransactions.reduce((sum, item) => sum + Number(item.amount || 0), 0),
            month: monthTransactions.reduce((sum, item) => sum + Number(item.amount || 0), 0),
            pending: 0,
            returns: transactions.filter(item => item.transaction_type === "return").length,
            count: transactions
                .filter(item => item.transaction_type === "purchase")
                .reduce((sum, item) => sum + (Array.isArray(item.details?.items)
                    ? item.details.items.reduce((quantity, product) => quantity + Number(product.quantity || 1), 0)
                    : 1), 0)
        };
    }
    if (catalogNeedsInitialization) {
        showToast("The shared catalog is not initialized. Ask an admin or librarian to sign in once to set it up.");
    }
    return profile;
}

function showSupabaseError(error, fallback) {
    console.error(fallback, error);
    showToast(`${fallback}: ${error.message || "Check your Supabase configuration and database schema."}`);
}

function initPasswordVisibilityToggles() {
    document.querySelectorAll('input[type="password"]').forEach(input => {
        const wrapper = document.createElement("div");
        wrapper.className = "password-input-wrapper";
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "password-toggle";
        toggle.textContent = "Show";
        toggle.setAttribute("aria-label", "Show password");
        toggle.setAttribute("aria-controls", input.id);
        toggle.setAttribute("aria-pressed", "false");
        toggle.addEventListener("click", () => {
            const isVisible = input.type === "password";
            input.type = isVisible ? "text" : "password";
            toggle.textContent = isVisible ? "Hide" : "Show";
            toggle.setAttribute("aria-label", `${isVisible ? "Hide" : "Show"} password`);
            toggle.setAttribute("aria-pressed", String(isVisible));
        });
        wrapper.appendChild(toggle);
    });
}

function isAdmin(username) {
    const account = getSavedAccounts().find(
        item => item.username?.toLowerCase() === String(username || "").toLowerCase()
    );

    return (account?.role === "admin" || account?.role === "librarian") && !account?.banned;
}

function isLibrarianOrAdmin(username) {
    const account = getSavedAccounts().find(
        item => item.username?.toLowerCase() === String(username || "").toLowerCase()
    );

    return (account?.role === "admin" || account?.role === "librarian") && !account?.banned;
}

function loadUserScopedData(username) {
    const key = String(username || "").toLowerCase() || "_guest";
    cart = Array.isArray(cartByUser[key]) ? [...cartByUser[key]] : [];
    favorites = Array.isArray(favoritesByUser[key]) ? [...favoritesByUser[key]] : [];
    recentlyViewed = Array.isArray(recentByUser[key]) ? [...recentByUser[key]] : [];
}

function persistUserScopedData() {
    if (!currentUser) return;
    const key = String(currentUser).toLowerCase();
    cartByUser[key] = cart;
    favoritesByUser[key] = favorites;
    recentByUser[key] = recentlyViewed;
}

function getCurrentAccount() {
    return getSavedAccounts().find(
        item => item.username?.toLowerCase() === String(currentUser || "").toLowerCase()
    ) || null;
}

function isUserPremium(username) {
    const acc = getSavedAccounts().find(item => item.username?.toLowerCase() === String(username || "").toLowerCase());
    if (acc?.membership !== "premium" || acc?.banned) return false;
    if (acc.premiumUntil && acc.premiumUntil < today()) return false;
    return true;
}

function setAuthenticated(isAuth, username = "") {
    appShell?.classList.toggle("hidden", !isAuth);
    loginPage?.classList.toggle("hidden", isAuth);

    if (isAuth) {
        currentUser = username || "admin";
        currentRole = isAdmin(currentUser) ? "admin" : "user";

        const nameElement = document.getElementById("userDisplayName");
        if (nameElement) nameElement.textContent = currentUser;

        refreshRoleBadge();
        applyRoleVisibility();

        loadUserScopedData(currentUser);
        startChatSession();
        setTimeout(checkAuthorNotice, 600);

        const setUsernameInput = document.getElementById("settingsUsername");
        if (setUsernameInput) setUsernameInput.value = currentUser;
        const setEmailInput = document.getElementById("settingsEmail");
        if (setEmailInput) {
            const acc = getCurrentAccount();
            setEmailInput.value = acc?.email || "";
        }
    } else {
        endChatSession();
        if (currentUser) persistUserScopedData();
        currentUser = null;
        currentRole = "user";
        currentAuthUser = null;
        cart = [];
        favorites = [];
        recentlyViewed = [];
    }
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("username")?.value.trim() || "";
    const password = document.getElementById("password")?.value || "";

    try {
        const { data, error } = await window.librarySupabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        const profile = await loadSupabaseData(data.user);
        if (profile.banned) {
            await window.librarySupabase.auth.signOut();
            throw new Error("This account has been banned. Contact a library administrator.");
        }

        setAuthenticated(true, profile.username || data.user.user_metadata?.username || email);
        saveLibraryData();
        loginError.textContent = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        showPage(isLibrarianOrAdmin(currentUser) ? "dashboard" : "books");
        renderAll();
    } catch (error) {
        await window.librarySupabase.auth.signOut();
        if (loginError) loginError.textContent = error.message || "Unable to sign in.";
    }
}

async function handleSignup(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("signupUsername");
    const passwordInput = document.getElementById("signupPassword");
    const confirmInput = document.getElementById("signupPasswordConfirm");

    if (!usernameInput || !passwordInput || !confirmInput || !signupError) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const email = document.getElementById("signupEmail")?.value.trim() || "";

    const isAuthorApplication = getSignupType() === "author";
    const penName = (document.getElementById("signupPenName")?.value || "").trim();
    const authorBio = (document.getElementById("signupAuthorBio")?.value || "").trim();

    if (!username || !password) {
        signupError.textContent = "Enter username and password.";
        return;
    }

    if (/\d/.test(username)) {
        signupError.textContent = "Username cannot contain numbers.";
        return;
    }

    if (isAuthorApplication) {
        const penProblem = validatePenName(penName);
        if (penProblem) {
            signupError.textContent = penProblem;
            return;
        }
    }

    if (password.length < 8) {
        signupError.textContent = "Password must be at least 8 characters.";
        return;
    }

    if (/\s/.test(password)) {
        signupError.textContent = "Password cannot contain spaces.";
        return;
    }

    if (password !== confirmInput.value) {
        signupError.textContent = "Passwords do not match.";
        return;
    }

    if (!email) {
        signupError.textContent = "Enter a valid email address.";
        return;
    }

    try {
        const { data, error } = await window.librarySupabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    author_status: isAuthorApplication ? "pending" : "none",
                    pen_name: isAuthorApplication ? penName : "",
                    author_bio: isAuthorApplication ? authorBio : "",
                    author_applied_at: isAuthorApplication ? today() : null
                }
            }
        });
        if (error) throw error;
        document.getElementById("username").value = email;
        signupForm.reset();
        showAuthForm("login");
        if (data.session && data.user) {
            await loadSupabaseData(data.user);
            setAuthenticated(true, username);
            saveLibraryData();
            showPage("books");
            renderAll();
        } else if (loginError) {
            loginError.textContent = isAuthorApplication
                ? "Check your email to confirm your account. Your author application will be reviewed after you sign in."
                : "Check your email to confirm your account, then log in.";
        }
    } catch (error) {
        signupError.textContent = error.message;
    }
}

async function handleLogout() {
    try {
        const { error } = await window.librarySupabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        showSupabaseError(error, "Unable to sign out");
        return;
    }
    setAuthenticated(false);
    loginForm?.reset();
    signupForm?.reset();
    showAuthForm("login");
    closeSidePanel();
}

let storageWarningShown = false;

function saveLibraryData() {
    persistUserScopedData();

    const entries = [
        [STORAGE_KEYS.cart, cartByUser],
        [STORAGE_KEYS.sales, sales],
        [STORAGE_KEYS.borrows, borrows],
        [STORAGE_KEYS.favorites, favoritesByUser],
        [STORAGE_KEYS.recentlyViewed, recentByUser],
        [STORAGE_KEYS.notifications, notifications],
        [STORAGE_KEYS.reports, reports],
        [STORAGE_KEYS.userRatings, userRatings]
    ];
    if (!catalogNeedsInitialization) entries.unshift([STORAGE_KEYS.books, books]);

    let failed = false;

    entries.forEach(([key, value]) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            failed = true;
        }
    });

    if (failed && !storageWarningShown) {
        storageWarningShown = true;
        alert("Your browser storage is full, so some changes may not be saved. Try deleting books with big pictures.");
    }

    if (currentAuthUser) {
        saveSupabaseData().catch(error => showSupabaseError(error, "Unable to save library data"));
    }
}

async function saveSupabaseData() {
    const account = getCurrentAccount();
    if (!currentAuthUser || !account) return;

    const usernameKey = String(currentUser).toLowerCase();
    const payload = {
        cart,
        favorites,
        recentlyViewed,
        notifications,
        userRatings: userRatings[usernameKey] || [],
        sales,
        purchases: purchaseHistory
    };

    const { error: stateError } = await window.librarySupabase
        .rpc("save_library_user_data", { p_payload: payload });
    if (stateError) throw stateError;

    const profiles = isLibrarianOrAdmin(currentUser) ? getSavedAccounts() : [account];
    await saveSupabaseProfiles(profiles);

    if (isLibrarianOrAdmin(currentUser) || isApprovedAuthor(currentUser)) {
        const booksToSave = isLibrarianOrAdmin(currentUser)
            ? books
            : books.filter(book => book.uploadedBy && sameUser(book.uploadedBy, currentUser));
        if (booksToSave.length) {
            const { error: booksError } = await window.librarySupabase
                .from("library_books")
                .upsert(booksToSave.map(book => ({ id: book.id, data: book })), { onConflict: "id" });
            if (booksError) throw booksError;
        }
    }
}

async function recordLibraryTransaction(type, details) {
    if (!currentAuthUser) return;
    const { error } = await window.librarySupabase
        .from("library_transactions")
        .insert({
            user_id: currentAuthUser.id,
            transaction_type: type,
            book_id: details.bookId || null,
            book_title: details.bookTitle || null,
            amount: Number(details.amount) || 0,
            details
        });
    if (error) throw error;
}

async function sendPasswordResetLink() {
    const email = document.getElementById("forgotEmail")?.value.trim() || "";
    const errorEl = document.getElementById("forgotError");
    if (!email) {
        errorEl.textContent = "Enter your email address.";
        return;
    }

    try {
        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        const { error } = await window.librarySupabase.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
        errorEl.textContent = "If an account exists for that email, a password reset link has been sent.";
    } catch (error) {
        errorEl.textContent = error.message || "Unable to send password reset email.";
    }
}

async function submitPasswordReset(event) {
    event.preventDefault();
    const password = document.getElementById("resetNewPassword")?.value || "";
    const confirmation = document.getElementById("resetConfirmPassword")?.value || "";
    const errorEl = document.getElementById("passwordResetError");
    errorEl.textContent = "";

    if (password.length < 8 || /\s/.test(password)) {
        errorEl.textContent = "Use a password of at least 8 characters with no spaces.";
        return;
    }
    if (password !== confirmation) {
        errorEl.textContent = "Passwords do not match.";
        return;
    }

    try {
        const { error } = await window.librarySupabase.auth.updateUser({ password });
        if (error) throw error;
        await window.librarySupabase.auth.signOut();
        passwordRecoveryMode = false;
        setAuthenticated(false);
        document.getElementById("passwordResetForm")?.reset();
        showAuthForm("login");
        if (loginError) loginError.textContent = "Password updated. Sign in with your new password.";
    } catch (error) {
        errorEl.textContent = error.message || "Unable to update your password.";
    }
}

function formatCurrency(value) {
    return `₱${Number(value || 0).toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function formatLocalDate(dateObject) {
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function today() {
    return formatLocalDate(new Date());
}

function addDays(date, numberOfDays) {
    const [year, month, day] = String(date).split("-").map(Number);
    return formatLocalDate(new Date(year, month - 1, day + numberOfDays));
}

function isOverdue(date) {
    return date < today();
}

function sameUser(a, b) {
    return String(a || "").toLowerCase() === String(b || "").toLowerCase();
}

function getUserBorrows() {
    return borrows.filter(
        borrow => sameUser(borrow.username, currentUser) && !borrow.returned
    );
}

function getUserHistory() {
    return borrows
        .filter(borrow => sameUser(borrow.username, currentUser))
        .sort((a, b) => (b.borrowedOn || "").localeCompare(a.borrowedOn || ""));
}

function addNotification(title, message) {
    notifications.unshift({
        id: Date.now(),
        title,
        message,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        read: !document.getElementById("notifDropdown")?.classList.contains("hidden")
    });

    saveLibraryData();
    renderNotifications();
}

function clearAllNotifications() {
    if (!notifications.length) return;
    if (!confirm("Clear all notifications?")) return;
    notifications = [];
    saveLibraryData();
    renderNotifications();
}

function renderNotifications() {
    const list = document.getElementById("notifList");
    const badge = document.getElementById("notifBadge");

    if (!list || !badge) return;

    const unreadCount = notifications.filter(notification => !notification.read).length;

    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.classList.remove("hidden");
    } else {
        badge.classList.add("hidden");
    }

    if (!notifications.length) {
        list.innerHTML = '<p class="empty">No notifications</p>';
        return;
    }

    list.innerHTML = notifications.map(notification => `
        <div class="notif-item ${notification.read ? "" : "unread"}">
            <strong>${escapeHTML(notification.title)}</strong>
            <p>${escapeHTML(notification.message)}</p>
            <time>${escapeHTML(notification.time)}</time>
        </div>
    `).join("");
}

function showPage(name) {
    if ((name === "dashboard" || name === "admin" || name === "support") && !isLibrarianOrAdmin(currentUser)) {
        name = "books";
    }

    if (name === "myBooks" && !isApprovedAuthor(currentUser)) {
        name = "books";
    }

    pages.forEach(page => page.classList.remove("active-page"));
    document.getElementById(name)?.classList.add("active-page");

    navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.page === name);
    });

    const titles = {
        dashboard: "Dashboard",
        books: "Books Catalog",
        authors: "Authors Directory",
        borrow: "Borrow & Return",
        cart: "Cart",
        search: "Search",
        profile: "Profile",
        settings: "Settings",
        myBooks: "My Books",
        messages: "Messages",
        techSupport: "Tech Support",
        support: "Support Inbox",
        admin: "Admin",
        rewards: "Rewards & Games"
    };

    const subtitles = {
        dashboard: "Library overview",
        books: "Browse and borrow books",
        authors: "Author directory",
        borrow: "Max 3 books • 14 days • ₱10 borrow fee",
        cart: "Your purchases",
        search: "Advanced filters",
        profile: "Your account",
        settings: "Manage account preferences",
        myBooks: "Upload and manage your books",
        messages: "Friends & private chat",
        techSupport: "Help center & live chat",
        support: "Chat with members",
        admin: "Admin tools",
        rewards: "Badges, challenges and mini games"
    };

    const titleElement = document.getElementById("pageTitle");
    const subtitleElement = document.getElementById("pageSubtitle");

    if (titleElement) titleElement.textContent = titles[name] || "Books Catalog";
    if (subtitleElement) subtitleElement.textContent = subtitles[name] || "";

    closeSidePanel();

    if (name === "support") renderSupportPage(true);
    if (name === "messages") renderMessagesPage(true);
    if (name === "techSupport") renderTechSupportPage();
}

function renderBookCard(book) {
    const isFavorite = favorites.includes(book.id);
    const isPremCard = book.isPremium;

    return `
        <div class="book-card ${isPremCard ? 'premium-card' : ''}">
            ${isPremCard ? '<span class="status premium-badge" style="margin-bottom:6px;">⭐ PREMIUM</span>' : ''}
            <h4>${escapeHTML(book.title)}</h4>
            <div class="meta">${escapeHTML(book.author)} · ${book.year || "—"}</div>
            <div class="meta">★ ${book.rating || "—"} · ${book.available || 0} avail</div>
            <div class="meta">Shelf: ${escapeHTML(book.shelf || "—")}</div>
            <div class="actions">
                <button class="action-btn" onclick="borrowBook('${escapeHTML(book.id)}')">Borrow</button>
                <button class="action-btn fav" onclick="toggleFavorite('${escapeHTML(book.id)}')">${isFavorite ? "♥" : "♡"}</button>
                <button class="action-btn rate" onclick="openRateModal('${escapeHTML(book.id)}')">Rate</button>
                <button class="action-btn report" onclick="openReportModal('book', '${escapeHTML(book.id)}')">Report</button>
                <button class="action-btn" onclick="viewBook('${escapeHTML(book.id)}')">View</button>
            </div>
        </div>
    `;
}

function renderDashboard() {
    if (!isLibrarianOrAdmin(currentUser)) return;

    document.getElementById("totalBooks").textContent = books.length;
    document.getElementById("totalCopies").textContent = books.reduce(
        (sum, book) => sum + (Number(book.copies) || 0), 0
    );
    document.getElementById("availableCount").textContent = books.reduce(
        (sum, book) => sum + (Number(book.available) || 0), 0
    );

    const activeBorrows = getUserBorrows();

    document.getElementById("myBorrowed").textContent = activeBorrows.length;
    document.getElementById("overdueCount").textContent = activeBorrows.filter(
        borrow => isOverdue(borrow.dueDate)
    ).length;

    document.getElementById("todaySales").textContent = formatCurrency(sales.today);

    const newArrivals = [...books]
        .sort((a, b) => (b.latest || "").localeCompare(a.latest || ""))
        .slice(0, 6);

    document.getElementById("newArrivals").innerHTML =
        newArrivals.map(renderBookCard).join("") || '<p class="empty">No books</p>';

    const popularBooks = [...books]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 6);

    document.getElementById("popularBooks").innerHTML =
        popularBooks.map(renderBookCard).join("") || '<p class="empty">No books</p>';

    const recentBooks = recentlyViewed
        .map(id => books.find(book => book.id === id))
        .filter(Boolean)
        .slice(0, 6);

    document.getElementById("recentlyViewed").innerHTML =
        recentBooks.length
            ? recentBooks.map(renderBookCard).join("")
            : '<p class="empty">None yet</p>';
}

function populateCategoryFilters() {
    const categories = [...new Set(books.map(book => book.category).filter(Boolean))].sort();

    ["filterCategory", "searchCategory"].forEach(id => {
        const select = document.getElementById(id);
        if (!select) return;

        const currentValue = select.value;

        select.innerHTML =
            '<option value="">Category</option>' +
            categories.map(category =>
                `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`
            ).join("");

        select.value = currentValue;
    });

    const years = [...new Set(books.map(book => book.year).filter(Boolean))]
        .sort((a, b) => b - a);

    const yearSelect = document.getElementById("searchYear");

    if (yearSelect) {
        const currentValue = yearSelect.value;

        yearSelect.innerHTML =
            '<option value="">Year</option>' +
            years.map(year => `<option value="${year}">${year}</option>`).join("");

        yearSelect.value = currentValue;
    }
}

function renderBooksPage() {
    const grid = document.getElementById("bookGrid");
    if (!grid) return;

    const query = (document.getElementById("booksSearch")?.value || "").toLowerCase().trim();
    const availabilityFilter = document.getElementById("filterAvailability")?.value || "";
    const categoryFilter = document.getElementById("filterCategory")?.value || "";
    const sort = document.getElementById("sortBooks")?.value || "title";

    let filteredBooks = books.filter(book => {
        const searchableText = [
            book.id,
            book.title,
            book.author,
            book.category,
            book.shelf,
            book.description
        ].join(" ").toLowerCase();

        if (query && !searchableText.includes(query)) return false;
        if (categoryFilter && book.category !== categoryFilter) return false;

        if (availabilityFilter === "Available" && (book.available || 0) <= 0) {
            return false;
        }

        if (
            availabilityFilter === "Borrowed" &&
            (book.available || 0) >= (book.copies || 0)
        ) {
            return false;
        }

        if (availabilityFilter === "Regular" && book.isPremium) return false;
        if (availabilityFilter === "Premium" && !book.isPremium) return false;

        return true;
    });

    filteredBooks.sort((a, b) => {
        if (sort === "author") return (a.author || "").localeCompare(b.author || "");
        if (sort === "year") return (b.year || 0) - (a.year || 0);
        if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
        return (a.title || "").localeCompare(b.title || "");
    });

    if (!filteredBooks.length) {
        grid.innerHTML = '<p class="empty" style="grid-column:1/-1;">No books found</p>';
        return;
    }

    const myActiveIds = new Set(getUserBorrows().map(b => b.id));

    grid.innerHTML = filteredBooks.map(book => {
        const status = (book.available || 0) > 0 ? "Available" : "Borrowed";
        const isFavorite = favorites.includes(book.id);
        const available = Number(book.available) || 0;
        const rating = Number(book.rating) || 0;
        const stars = "★".repeat(Math.min(5, Math.round(rating))) + "☆".repeat(Math.max(0, 5 - Math.round(rating)));
        const alreadyBorrowed = myActiveIds.has(book.id);
        const synopsis = (book.description || "").slice(0, 90);

        let primaryBtn;
        if (alreadyBorrowed) {
            primaryBtn = `<button class="primary-btn card-borrow-btn" style="background:linear-gradient(135deg,#059669,#047857);" onclick="returnBook('${escapeHTML(book.id)}')">Return</button>`;
        } else {
            const bs = getBorrowState(book);
            primaryBtn = `<button class="primary-btn card-borrow-btn" onclick="borrowBook('${escapeHTML(book.id)}')" ${bs.disabled ? "disabled" : ""} title="${escapeHTML(bs.reason)}">${bs.label}</button>`;
        }

        return `
            <div class="inventory-card ${book.isPremium ? 'premium-card' : ''}">
                <div class="inventory-card-cover ${hasRealPicture(book.image) ? "has-cover" : ""}">
                    ${hasRealPicture(book.image) ? `<img class="cover-img" src="${escapeHTML(book.image)}" alt="" loading="lazy" onerror="tryNextCoverFormat(this)">` : ""}
                    ${book.isPremium ? '<span class="premium-ribbon">⭐ PREMIUM</span>' : ''}
                    <div class="cover-placeholder">
                        <span class="cover-icon">📖</span>
                        <span class="cover-id">${escapeHTML(book.id)}</span>
                    </div>
                    <span class="status-pill status ${status.toLowerCase()}">${status}</span>
                </div>
                <div class="inventory-card-body">
                    <span class="card-category">${escapeHTML(book.category || "General")}</span>
                    <h4 class="card-title" title="${escapeHTML(book.title)}">${escapeHTML(book.title)}</h4>
                    <p class="card-author">${escapeHTML(book.author)} · ${book.year || "—"}</p>
                    ${synopsis ? `<p class="card-synopsis">${escapeHTML(synopsis)}${(book.description || "").length > 90 ? "…" : ""}</p>` : ""}
                    <div class="card-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-num">${rating.toFixed(1)}</span>
                    </div>
                    <div class="card-meta-row">
                        <span class="card-price">${formatCurrency(book.price)}</span>
                        <span class="card-copies">${available} available · Shelf ${escapeHTML(book.shelf || "—")} · Your loans ${myActiveIds.size}/${MAX_BORROWS}</span>
                    </div>
                    <div class="card-actions">
                        ${primaryBtn}
                        <button class="action-btn" onclick="addToCart('${escapeHTML(book.id)}')" title="${book.isPremium && !isUserPremium(currentUser) ? "Premium members only" : "Buy"}">${book.isPremium && !isUserPremium(currentUser) ? "🔒" : "🛒"}</button>
                        <button class="action-btn fav" onclick="toggleFavorite('${escapeHTML(book.id)}')" title="Favorite">${isFavorite ? "♥" : "♡"}</button>
                        <button class="action-btn rate" onclick="openRateModal('${escapeHTML(book.id)}')" title="Rate">★</button>
                        <button class="action-btn report" onclick="openReportModal('book', '${escapeHTML(book.id)}')" title="Report">⚑</button>
                        <button class="action-btn" onclick="viewBook('${escapeHTML(book.id)}')" title="Details">👁</button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function filterByAuthor(author) {
    showPage("books");

    const search = document.getElementById("booksSearch");

    if (search) {
        search.value = author;
        renderBooksPage();
    }
}

function renderBorrowPage() {
    const myTable = document.getElementById("myBorrowsTable");
    const historyTable = document.getElementById("historyTable");
    const activeBorrows = getUserBorrows();

    if (myTable) {
        myTable.innerHTML = activeBorrows.length
            ? activeBorrows.map(borrow => {
                const overdue = isOverdue(borrow.dueDate);

                return `
                    <tr>
                        <td>${escapeHTML(borrow.title)} ${borrow.isPremium ? '<span class="status premium-badge">⭐ VIP</span>' : ''}</td>
                        <td>${escapeHTML(borrow.borrowedOn)}</td>
                        <td>${escapeHTML(borrow.dueDate)}</td>
                        <td>${formatCurrency(borrow.borrowFee || 10)}</td>
                        <td>
                            <span class="status ${overdue ? "overdue" : "borrowed"}">
                                ${overdue ? "Overdue" : "Active"}
                            </span>
                        </td>
                        <td>
                            <button class="action-btn" onclick="returnBook('${escapeHTML(borrow.id)}')">Return</button>
                        </td>
                    </tr>
                `;
            }).join("")
            : '<tr><td colspan="6" class="empty">No active loans</td></tr>';
    }

    const history = getUserHistory();

    if (historyTable) {
        historyTable.innerHTML = history.length
            ? history.map(borrow => `
                <tr>
                    <td>${escapeHTML(borrow.title)}</td>
                    <td>${escapeHTML(borrow.borrowedOn)}</td>
                    <td>${escapeHTML(borrow.returnedOn || "—")}</td>
                    <td>
                        <span class="status ${
                            borrow.returned
                                ? "available"
                                : isOverdue(borrow.dueDate)
                                    ? "overdue"
                                    : "borrowed"
                        }">
                            ${
                                borrow.returned
                                    ? "Returned"
                                    : isOverdue(borrow.dueDate)
                                        ? "Overdue"
                                        : "Active"
                            }
                        </span>
                    </td>
                </tr>
            `).join("")
            : '<tr><td colspan="4" class="empty">No history</td></tr>';
    }
}

function renderCartPage() {
    const table = document.getElementById("cartTable");
    if (!table) return;

    table.innerHTML = cart.length
        ? cart.map(item => `
            <tr>
                <td>${escapeHTML(item.title)}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>${item.quantity}</td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
                <td>
                    <button class="action-btn delete" onclick="removeFromCart('${escapeHTML(item.id)}')">Remove</button>
                </td>
            </tr>
        `).join("")
        : '<tr><td colspan="5" class="empty">Cart empty</td></tr>';
}

function renderSearchPage() {
    const table = document.getElementById("searchResults");
    if (!table) return;

    const query = (document.getElementById("globalSearch")?.value || "").toLowerCase().trim();
    const category = document.getElementById("searchCategory")?.value || "";
    const year = document.getElementById("searchYear")?.value || "";
    const availability = document.getElementById("searchAvail")?.value || "";

    const filteredBooks = books.filter(book => {
        const searchableText = [book.id, book.title, book.author, book.category]
            .join(" ")
            .toLowerCase();

        if (query && !searchableText.includes(query)) return false;
        if (category && book.category !== category) return false;
        if (year && String(book.year) !== year) return false;
        if (availability === "Available" && (book.available || 0) <= 0) return false;

        return true;
    });

    table.innerHTML = filteredBooks.length
        ? filteredBooks.map(book => {
            const status = (book.available || 0) > 0 ? "Available" : "Borrowed";

            return `
                <tr>
                    <td><strong>${escapeHTML(book.title)}</strong></td>
                    <td>${escapeHTML(book.author)}</td>
                    <td>${escapeHTML(book.category)}</td>
                    <td>${book.year || "—"}</td>
                    <td><span class="status ${status.toLowerCase()}">${status}</span></td>
                    <td>${formatCurrency(book.price)}</td>
                </tr>
            `;
        }).join("")
        : '<tr><td colspan="6" class="empty">No matches</td></tr>';
}

function renderProfilePage() {
    const username = currentUser || "Reader";
    const account = getCurrentAccount();
    const activeBorrows = getUserBorrows();
    const history = getUserHistory();
    const isPrem = isUserPremium(currentUser);

    const returnedCount = history.filter(borrow => borrow.returned).length;
    const overdueCount = activeBorrows.filter(borrow => isOverdue(borrow.dueDate)).length;
    const baseRole = isLibrarianOrAdmin(currentUser) ? "Administrator" : (isPrem ? "Premium Member" : "Regular Member");
    const role = isApprovedAuthor(currentUser) ? `${baseRole} · Author` : baseRole;

    document.getElementById("profileUsername").textContent = username;
    document.getElementById("profileRole").textContent = role;
    document.getElementById("profileRoleDetail").textContent = role;
    document.getElementById("profileHeroName").textContent = username;

    const profileHeroContainer = document.getElementById("profileHeroContainer");
    const profileAvatar = document.getElementById("profileAvatar");
    const membershipActionArea = document.getElementById("membershipActionArea");

    if (isPrem) {
        profileHeroContainer?.classList.add("is-premium-hero");
        profileAvatar?.classList.add("is-premium-avatar");
        profileAvatar.textContent = "⭐";
        if (membershipActionArea) {
            membershipActionArea.innerHTML = `
                <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
                    <span class="status premium-badge" style="padding: 8px 14px; font-size: 13px;">✨ Premium Active${getCurrentAccount()?.premiumUntil ? " until " + escapeHTML(getCurrentAccount().premiumUntil) : ""}</span>
                    <button class="secondary-btn" onclick="cancelSubscription()" style="padding:6px 12px; font-size:12px;">Cancel Subscription</button>
                </div>
            `;
        }
    } else {
        profileHeroContainer?.classList.remove("is-premium-hero");
        profileAvatar?.classList.remove("is-premium-avatar");
        profileAvatar.textContent = isLibrarianOrAdmin(currentUser) ? "👑" : (username.charAt(0).toUpperCase() || "👤");
        if (membershipActionArea) {
            membershipActionArea.innerHTML = `<button id="upgradePremiumBtn" class="primary-btn" onclick="openPremiumModal()">✨ Upgrade to Premium (₱99/mo)</button>`;
        }
    }

    document.getElementById("profileJoined").textContent = account?.createdAt
        ? `Member since ${account.createdAt}`
        : "Library administrator account";

    document.getElementById("profileBorrowed").textContent = activeBorrows.length;

    document.getElementById("profileFavorites").textContent = favorites.filter(
        id => books.some(book => book.id === id)
    ).length;

    document.getElementById("profileReturned").textContent = returnedCount;
    document.getElementById("profileOverdue").textContent = overdueCount;
    document.getElementById("profileTotalBorrows").textContent = history.length;

    document.getElementById("profileReadingStatus").textContent =
        overdueCount > 0
            ? "Return a book soon"
            : activeBorrows.length > 0
                ? "Enjoying a good read"
                : "Ready to explore";

    const favoriteBooks = favorites
        .map(id => books.find(book => book.id === id))
        .filter(Boolean);

    document.getElementById("favoritesList").innerHTML = favoriteBooks.length
        ? favoriteBooks.map(renderBookCard).join("")
        : '<p class="empty">No favorites yet. Tap ♡ on a book to save it here.</p>';

    const activity = document.getElementById("profileActivity");

    if (activity) {
        activity.innerHTML = history.length
            ? history.slice(0, 5).map(borrow => `
                <div class="activity-row">
                    <span class="activity-icon">
                        ${
                            borrow.returned
                                ? "✅"
                                : isOverdue(borrow.dueDate)
                                    ? "⚠️"
                                    : "📘"
                        }
                    </span>
                    <div>
                        <strong>${escapeHTML(borrow.title)}</strong>
                        <p>
                            ${
                                borrow.returned
                                    ? `Returned ${escapeHTML(borrow.returnedOn || "")}`
                                    : `Due ${escapeHTML(borrow.dueDate || "—")}`
                            }
                        </p>
                    </div>
                    <span class="activity-status">
                        ${
                            borrow.returned
                                ? "Returned"
                                : isOverdue(borrow.dueDate)
                                    ? "Overdue"
                                    : "Borrowed"
                        }
                    </span>
                </div>
            `).join("")
            : '<p class="empty">Your borrowing activity will appear here.</p>';
    }
}

async function saveSettings(event) {
    event.preventDefault();
    const newUsername = document.getElementById("settingsUsername")?.value.trim();
    if (!newUsername) {
        alert("Username cannot be empty.");
        return;
    }

    if (newUsername.toLowerCase() !== currentUser.toLowerCase()) {
        const accounts = getSavedAccounts();
        if (accounts.some(acc => acc.username?.toLowerCase() === newUsername.toLowerCase() && !sameUser(acc.username, currentUser))) {
            alert("Username is already taken.");
            return;
        }

        const acc = accounts.find(item => item.username?.toLowerCase() === currentUser.toLowerCase());
        if (acc) {
            acc.username = newUsername;
            saveAccounts(accounts);
        }

        const previousName = currentUser;
        currentUser = newUsername;
        migrateUsernameData(previousName, newUsername);
    }

    const email = document.getElementById("settingsEmail")?.value.trim() || "";
    if (email && email !== currentAuthUser?.email) {
        try {
            const { data, error } = await window.librarySupabase.auth.updateUser({ email });
            if (error) throw error;
            if (data.user) currentAuthUser = data.user;
            showToast("Confirm the new email address using the link Supabase sent.");
        } catch (error) {
            alert(`Unable to update email: ${error.message}`);
            return;
        }
    }

    saveLibraryData();
    addNotification("Settings Updated", "Your account settings have been saved successfully.");
    alert("Settings saved successfully!");
    renderAll();
}

async function changePassword(event) {
    event.preventDefault();
    const currentPw = document.getElementById("currentPassword")?.value || "";
    const newPw = document.getElementById("newPassword")?.value || "";
    const confirmPw = document.getElementById("confirmNewPassword")?.value || "";
    const errorEl = document.getElementById("passwordError");

    if (errorEl) errorEl.textContent = "";

    if (newPw.length < 8) {
        if (errorEl) errorEl.textContent = "New password must be at least 8 characters.";
        return;
    }
    if (newPw !== confirmPw) {
        if (errorEl) errorEl.textContent = "New passwords do not match.";
        return;
    }

    try {
        if (!currentAuthUser?.email) throw new Error("Your signed-in email is unavailable.");
        const { error: signInError } = await window.librarySupabase.auth.signInWithPassword({
            email: currentAuthUser.email,
            password: currentPw
        });
        if (signInError) {
            if (errorEl) errorEl.textContent = "Current password is incorrect.";
            return;
        }

        const { error } = await window.librarySupabase.auth.updateUser({ password: newPw });
        if (error) throw error;

        document.getElementById("passwordForm")?.reset();
        addNotification("Password Updated", "Your password has been changed successfully.");
        alert("Password updated successfully!");
    } catch (error) {
        if (errorEl) errorEl.textContent = error.message || "Could not update password.";
    }
}

function saveNotifPref() {
    const enabled = document.getElementById("notifPrefToggle")?.checked ?? true;
    localStorage.setItem("libraryNotifPref", enabled ? "on" : "off");
    addNotification("Preference Saved", enabled ? "Email notifications enabled." : "Email notifications disabled.");
}

function toggleCompactCards() {
    const compact = document.getElementById("compactCardsToggle")?.checked ?? false;
    document.body.classList.toggle("compact-cards", compact);
    localStorage.setItem("libraryCompactCards", compact ? "on" : "off");
}

function clearCartData() {
    if (!confirm("Clear your shopping cart?")) return;
    cart = [];
    saveLibraryData();
    renderAll();
    addNotification("Cart Cleared", "Your shopping cart is now empty.");
}

function clearFavoritesData() {
    if (!confirm("Clear all favorites?")) return;
    favorites = [];
    saveLibraryData();
    renderAll();
    addNotification("Favorites Cleared", "Your favorites list has been cleared.");
}

function exportLibraryData() {
    const data = {
        user: currentUser,
        books: books.length,
        cart,
        borrows: borrows.filter(b => sameUser(b.username, currentUser)),
        favorites,
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `library-export-${currentUser}-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification("Export Complete", "Your library data was downloaded.");
}

function resetAllLocalData() {
    const typed = prompt("This will erase ALL library data in this browser (accounts, books, borrows, cart...).\nThis cannot be undone.\n\nType RESET to confirm:");
    if (typed === null) return;
    if (typed.trim() !== "RESET") {
        showToast("Reset cancelled: you must type RESET exactly.");
        return;
    }

    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem(AUTH_ACCOUNTS_KEY);
    localStorage.removeItem("libraryTheme");
    localStorage.removeItem(REWARDS_KEY);
    localStorage.removeItem("libraryDeletedDefaults");
    localStorage.removeItem("libraryNotifPref");
    localStorage.removeItem("libraryCompactCards");
    localStorage.removeItem("libraryChats");
    localStorage.removeItem("libraryAdminLastSeen");
    localStorage.removeItem("libraryAdminChatStatus");

    alert("All local data has been reset. The page will reload.");
    location.reload();
}

function renderDeleteAccountPanel() {
    const panel = document.getElementById("deleteAccountPanel");
    if (!panel) return;

    panel.classList.toggle("hidden", !currentUser);
}

function openDeleteAccountModal() {
    if (!currentUser) return;

    const modal = document.getElementById("deleteAccountModal");
    const errorElement = document.getElementById("deleteAccountError");

    document.getElementById("deleteAccountForm")?.reset();
    if (errorElement) errorElement.textContent = "";

    modal?.classList.remove("hidden");
    requestAnimationFrame(() => modal?.classList.add("show"));
}

function closeDeleteAccountModal() {
    const modal = document.getElementById("deleteAccountModal");

    modal?.classList.remove("show");
    setTimeout(() => modal?.classList.add("hidden"), 350);
}

function removeAccountData(username) {
    const key = String(username).toLowerCase();

    borrows.forEach(borrow => {
        if (!sameUser(borrow.username, username) || borrow.returned) return;

        const book = books.find(item => item.id === borrow.id);
        if (book) {
            book.available = Math.min(
                Number(book.copies) || 0,
                (Number(book.available) || 0) + 1
            );
        }
    });

    borrows = borrows.filter(borrow => !sameUser(borrow.username, username));

    books.forEach(book => {
        if (book.uploadedBy && sameUser(book.uploadedBy, username)) book.uploadedBy = null;
    });

    delete cartByUser[key];
    delete favoritesByUser[key];
    delete recentByUser[key];
    delete userRatings[key];
    delete userRatings[username];

    reports = reports.filter(report => !sameUser(report.reportedBy, username));

    const avatars = getAvatars();
    delete avatars[key];

    try {
        localStorage.setItem(AVATARS_KEY, JSON.stringify(avatars));
    } catch (error) {}

    loadSocial();
    delete socialData.friends[key];

    Object.keys(socialData.friends).forEach(other => {
        socialData.friends[other] = (socialData.friends[other] || []).filter(name => !sameUser(name, username));
    });

    socialData.requests = socialData.requests.filter(
        request => !sameUser(request.from, username) && !sameUser(request.to, username)
    );

    saveSocial();

    loadDMs();

    Object.keys(dmData).forEach(pair => {
        const users = dmData[pair]?.users;
        if (Array.isArray(users) && users.some(name => sameUser(name, username))) delete dmData[pair];
    });

    saveDMs();
    activeDmPeer = null;

    loadChats();
    delete chats[chatKey(username)];
    saveChats();

    const accounts = getSavedAccounts().filter(account => !sameUser(account.username, username));
    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
}

async function deleteAccount(event) {
    event.preventDefault();

    const errorElement = document.getElementById("deleteAccountError");
    const fail = message => {
        if (errorElement) errorElement.textContent = message;
    };

    fail("");

    if (!currentUser) {
        fail("Sign in to delete your account.");
        return;
    }

    const password = document.getElementById("deleteAccountPassword")?.value || "";
    const confirmText = (document.getElementById("deleteAccountConfirmText")?.value || "").trim();

    if (confirmText !== "DELETE") {
        fail("Type DELETE in capital letters to confirm.");
        return;
    }

    try {
        if (!currentAuthUser?.email) throw new Error("Your signed-in email is unavailable.");
        const { error: signInError } = await window.librarySupabase.auth.signInWithPassword({
            email: currentAuthUser.email,
            password
        });
        if (signInError) {
            fail("Password is incorrect.");
            return;
        }

        if (!confirm("Permanently delete your account? This cannot be undone.")) return;

        const { error } = await window.librarySupabase.rpc("delete_own_library_account");
        if (error) throw error;

        removeAccountData(currentUser);
        await window.librarySupabase.auth.signOut();
        setAuthenticated(false);

        loginForm?.reset();
        signupForm?.reset();
        showAuthForm("login");
        closeSidePanel();
        closeDeleteAccountModal();

        if (loginError) loginError.textContent = "Your account has been deleted.";
    } catch (error) {
        fail(error.message || "Could not delete your account.");
    }
}

function enforceAccountExists() {
    if (!currentUser || getAccountByName(currentUser)) return;

    endChatSession();
    currentUser = null;
    cart = [];
    favorites = [];
    recentlyViewed = [];
    handleLogout();

    if (loginError) loginError.textContent = "This account no longer exists.";
}

function renderAdminInventory() {
    const grid = document.getElementById("adminInventoryGrid");
    if (!grid || !isLibrarianOrAdmin(currentUser)) return;

    grid.innerHTML = books.map(book => {
        const available = Number(book.available) || 0;
        const copies = Number(book.copies) || 0;
        return `
            <div class="admin-inv-row">
                <div class="admin-inv-info">
                    <strong>${escapeHTML(book.title)}</strong>
                    <span class="muted-action">${escapeHTML(book.id)} · ${escapeHTML(book.shelf || "—")} · ${available} avail</span>
                </div>
                <div class="inventory-stepper">
                    <button class="quantity-btn" onclick="adjustCopies('${escapeHTML(book.id)}', -1)" ${copies <= 0 || available <= 0 ? "disabled" : ""}>−</button>
                    <span title="Total copies">${copies}</span>
                    <button class="quantity-btn" onclick="adjustCopies('${escapeHTML(book.id)}', 1)">+</button>
                </div>
                <button class="action-btn delete" onclick="deleteBook('${escapeHTML(book.id)}')">Del</button>
            </div>
        `;
    }).join("") || '<p class="empty">No books</p>';
}

function renderAdminPage() {
    if (!isLibrarianOrAdmin(currentUser)) return;

    const accounts = getSavedAccounts();

    document.getElementById("adminAccounts").textContent = accounts.length;

    const activeLoans = borrows.filter(borrow => !borrow.returned);

    document.getElementById("adminLoans").textContent = activeLoans.length;

    document.getElementById("adminOverdue").textContent = activeLoans.filter(
        borrow => isOverdue(borrow.dueDate)
    ).length;

    const rows = accounts.map(account => ({
            ...account,
            role: account.role || "user",
            membership: account.membership || "regular",
            banned: !!account.banned,
            protected: false
        }));

    const table = document.getElementById("adminUsersTable");
    if (!table) return;

    table.innerHTML = rows.map(account => {
        const isCurrentUser =
            account.username.toLowerCase() === String(currentUser).toLowerCase();

        const isProtected = account.protected || isCurrentUser;

        return `
            <tr>
                <td>
                    <strong>${escapeHTML(account.username)}</strong>
                    ${isCurrentUser ? " <small>(you)</small>" : ""}
                </td>
                <td>
                    <span class="status ${account.role === "admin" ? "available" : account.role === "librarian" ? "borrowed" : "available"}">
                        ${account.role === "admin" ? "Admin" : account.role === "librarian" ? "Librarian" : "Member"}${account.authorStatus === "approved" ? " ✍️ Author" : ""}
                    </span>
                </td>
                <td>
                    <span class="status ${account.membership === "premium" ? "premium-badge" : "borrowed"}">
                        ${account.membership === "premium" ? "⭐ Premium" : "Regular"}
                    </span>
                </td>
                <td>
                    <span class="status ${account.banned ? "overdue" : "available"}">
                        ${account.banned ? "Banned" : "Active"}
                    </span>
                </td>
                <td>${escapeHTML(account.createdAt || "—")}</td>
                <td>
                    ${
                        isProtected
                            ? '<span class="muted-action">Protected</span>'
                            : `
                                <div class="admin-actions">
                                    <button
                                        class="action-btn"
                                        onclick="toggleAdminRole('${escapeHTML(account.username)}')"
                                    >
                                        ${account.role === "admin" ? "Demote Admin" : "Make Admin"}
                                    </button>
                                    <button
                                        class="action-btn"
                                        onclick="toggleLibrarianRole('${escapeHTML(account.username)}')"
                                    >
                                        ${account.role === "librarian" ? "Remove Lib" : "Make Librarian"}
                                    </button>
                                    <button
                                        class="action-btn"
                                        onclick="adminResetPassword('${escapeHTML(account.username)}')"
                                    >
                                        Reset PW
                                    </button>
                                    <button
                                        class="action-btn ${account.banned ? "" : "delete"}"
                                        onclick="toggleBanUser('${escapeHTML(account.username)}')"
                                    >
                                        ${account.banned ? "Unban" : "Ban"}
                                    </button>
                                </div>
                            `
                    }
                </td>
            </tr>
        `;
    }).join("") || '<tr><td colspan="6" class="empty">No accounts yet.</td></tr>';

    renderAdminInventory();
    renderAuthorApplications();
}

function toggleAdminRole(username) {
    if (
        !isLibrarianOrAdmin(currentUser) ||
        username.toLowerCase() === String(currentUser).toLowerCase()
    ) {
        return;
    }

    const accounts = getSavedAccounts();

    const account = accounts.find(
        item => item.username.toLowerCase() === username.toLowerCase()
    );

    if (!account) return;

    if (account.banned) {
        alert("Unban this account before changing its role.");
        return;
    }

    account.role = account.role === "admin" ? "user" : "admin";

    saveAccounts(accounts);

    addNotification(
        "Account role updated",
        `${username} is now ${account.role === "admin" ? "an admin" : "a member"}.`
    );

    renderAll();
}

function toggleLibrarianRole(username) {
    if (
        !isLibrarianOrAdmin(currentUser) ||
        username.toLowerCase() === String(currentUser).toLowerCase()
    ) {
        return;
    }

    const accounts = getSavedAccounts();

    const account = accounts.find(
        item => item.username.toLowerCase() === username.toLowerCase()
    );

    if (!account) return;

    if (account.banned) {
        alert("Unban this account before changing its role.");
        return;
    }

    account.role = account.role === "librarian" ? "user" : "librarian";

    saveAccounts(accounts);

    addNotification(
        "Account role updated",
        `${username} is now ${account.role === "librarian" ? "a librarian" : "a member"}.`
    );

    renderAll();
}

function toggleBanUser(username) {
    if (
        !isLibrarianOrAdmin(currentUser) ||
        username.toLowerCase() === String(currentUser).toLowerCase()
    ) {
        return;
    }

    const accounts = getSavedAccounts();

    const account = accounts.find(
        item => item.username.toLowerCase() === username.toLowerCase()
    );

    if (!account) return;

    const action = account.banned ? "unban" : "ban";

    if (!confirm(`Are you sure you want to ${action} ${username}?`)) return;

    account.banned = !account.banned;

    saveAccounts(accounts);

    addNotification(
        "Account status updated",
        `${username} was ${account.banned ? "banned" : "unbanned"} by ${currentUser}.`
    );

    renderAll();
}

function adjustCopies(id, amount) {
    if (!isLibrarianOrAdmin(currentUser)) {
        alert("Admins or Librarians only.");
        return;
    }

    const book = books.find(item => item.id === id);
    if (!book) return;

    const copies = Number(book.copies) || 0;
    const available = Number(book.available) || 0;

    if (amount > 0) {
        book.copies = copies + 1;
        book.available = available + 1;
    } else {
        if (available <= 0 || copies <= 0) {
            alert("No available copy can be removed. Return borrowed books first.");
            return;
        }

        book.copies = copies - 1;
        book.available = available - 1;
    }

    saveLibraryData();
    renderAll();
}

function getBorrowState(book) {
    const mine = getUserBorrows();
    if (mine.some(b => b.id === book.id)) return { disabled: false, label: "Borrow", reason: "" };
    if (book.isPremium && !isUserPremium(currentUser)) return { disabled: false, label: "⭐ Premium", reason: "Premium membership is required; the server will check your current membership." };
    if ((Number(book.available) || 0) <= 0) return { disabled: false, label: "Borrow", reason: "The catalog shows no available copies; the server will check the latest availability." };
    if (mine.some(b => isOverdue(b.dueDate))) return { disabled: false, label: "Borrow", reason: "You may have an overdue loan; the server will check your current loans." };
    if (mine.length >= MAX_BORROWS) return { disabled: false, label: "Borrow", reason: "You may have reached the loan limit; the server will check your current loans." };
    return { disabled: false, label: "Borrow", reason: "" };
}

async function borrowBook(id) {
    const book = books.find(item => item.id === id);
    if (!book) return;

    try {
        const { data: result, error } = await window.librarySupabase
            .rpc("borrow_library_book", { p_book_id: id });
        if (error) throw error;
        if (!result?.book || !result?.loan) {
            await loadSupabaseData(currentAuthUser);
            renderAll();
            throw new Error("The borrowing service returned an invalid response. Please try again.");
        }
        Object.assign(book, result.book);
        const loan = result.loan;
        const borrowFee = Number(loan.borrowFee) || BORROW_FEE;
        const dueDate = loan.dueDate;
        if (!dueDate) {
            await loadSupabaseData(currentAuthUser);
            renderAll();
            throw new Error("The borrowing service did not return a due date. Please refresh and try again.");
        }

        borrows.push(loan);

        sales.today += borrowFee;
        sales.month += borrowFee;

        addNotification(
            "Book Borrowed",
            `You borrowed "${book.title}". Fee: ${formatCurrency(borrowFee)}. Due date: ${dueDate}`
        );

        saveLibraryData();
        renderAll();

        alert(`"${book.title}" borrowed!\nBorrow Fee: ${formatCurrency(borrowFee)}\nDue: ${dueDate}`);

        showPage("borrow");
    } catch (error) {
        if (error.code === "PGRST202" || /could not find the function|schema cache/i.test(error.message || "")) {
            showSupabaseError(
                new Error("The borrow function is not installed in Supabase. Run the latest supabase-schema.sql in the Supabase SQL Editor."),
                "Unable to borrow this book"
            );
        } else if (error.code === "P0001" && /book not found/i.test(error.message || "")) {
            showSupabaseError(
                new Error("This book is not in the shared Supabase catalog. Sign in once with an admin or librarian account to initialize the catalog, then try again."),
                "Unable to borrow this book"
            );
        } else {
            showSupabaseError(error, "Unable to borrow this book");
        }
    }
}

async function returnBook(id) {
    const loan = borrows.find(
        borrow => borrow.id === id &&
            sameUser(borrow.username, currentUser) &&
            !borrow.returned
    );

    if (!loan) return;

    const book = books.find(item => item.id === id);
    try {
        const { data: result, error } = await window.librarySupabase
            .rpc("return_library_book", { p_book_id: id });
        if (error) throw error;
        if (book) Object.assign(book, result.book);
        Object.assign(loan, result.loan);
    } catch (error) {
        showSupabaseError(error, "Unable to return this book");
        return;
    }

    loan.returned = true;
    loan.returnedOn = today();

    addNotification(
        "Book Returned",
        `You returned "${loan.title}". Thank you!`
    );

    saveLibraryData();
    renderAll();

    alert(`"${loan.title}" returned`);
}

function toggleFavorite(id) {
    const index = favorites.indexOf(id);

    if (index === -1) {
        favorites.push(id);
    } else {
        favorites.splice(index, 1);
    }

    saveLibraryData();
    renderAll();

    const detailPanel = document.getElementById("bookDetailPanel");
    if (detailPanel && detailPanel.classList.contains("show")) {
        viewBook(id);
    }
}

function viewBook(id) {
    recentlyViewed = [
        id,
        ...recentlyViewed.filter(item => item !== id)
    ].slice(0, 12);

    saveLibraryData();

    const book = books.find(item => item.id === id);
    if (!book) return;

    const panelBody = document.getElementById("detailPanelBody");
    if (!panelBody) return;

    const isFavorite = favorites.includes(book.id);
    const myActiveIds = new Set(getUserBorrows().map(b => b.id));
    const alreadyBorrowed = myActiveIds.has(book.id);
    const available = Number(book.available) || 0;

    let borrowReturnBtn;
    if (alreadyBorrowed) {
        borrowReturnBtn = `<button class="primary-btn" style="background:linear-gradient(135deg,#059669,#047857);" onclick="returnBook('${escapeHTML(book.id)}'); closeBookDetailPanel();">Return</button>`;
    } else {
        const bs = getBorrowState(book);
        borrowReturnBtn = `<button class="primary-btn" onclick="borrowBook('${escapeHTML(book.id)}'); closeBookDetailPanel();" ${bs.disabled ? "disabled" : ""} title="${escapeHTML(bs.reason)}">${bs.label}</button>`;
        if (bs.reason) borrowReturnBtn += `<p class="hint-text">${escapeHTML(bs.reason)}</p>`;
    }

    const detailPics = [book.image, ...(Array.isArray(book.gallery) ? book.gallery : [])].filter(hasRealPicture);

    const galleryHTML = detailPics.length ? `
        <div class="detail-gallery">
            <img id="detailMainPic" class="detail-main-pic" src="${escapeHTML(detailPics[0])}" alt="${escapeHTML(book.title)}" onerror="tryNextCoverFormat(this)">
            ${detailPics.length > 1 ? `
                <div class="detail-thumbs">
                    ${detailPics.map((src, index) => `<img src="${escapeHTML(src)}" class="detail-thumb ${index === 0 ? "active" : ""}" alt="Picture ${index + 1}" onclick="swapDetailPic(this)">`).join("")}
                </div>
            ` : ""}
        </div>
    ` : "";

    panelBody.innerHTML = `
        <div class="detail-header-section">
            <div class="detail-cover-badge">
                <span style="font-size: 42px;">📖</span>
                ${book.isPremium ? '<span class="status premium-badge" style="font-size:9px; padding:2px 6px; margin-top:4px;">⭐ PREMIUM</span>' : ''}
            </div>
            <div class="detail-titles">
                <span class="card-category">${escapeHTML(book.category || "General")}</span>
                <h2>${escapeHTML(book.title)}</h2>
                <p class="card-author">By ${escapeHTML(book.author)} · ★ ${book.rating || "—"}${book.uploadedBy ? " · ✍️ Author upload" : ""}</p>
            </div>
        </div>

        ${galleryHTML}

        <div class="detail-grid">
            <div class="detail-spec">
                <span>Category</span>
                <strong>${escapeHTML(book.category || "—")}</strong>
            </div>
            <div class="detail-spec">
                <span>Publication Year</span>
                <strong>${book.year || "—"}</strong>
            </div>
            <div class="detail-spec">
                <span>Shelf Location</span>
                <strong>${escapeHTML(book.shelf || "—")}</strong>
            </div>
            <div class="detail-spec">
                <span>Condition</span>
                <strong>${escapeHTML(book.condition || "—")}</strong>
            </div>
            <div class="detail-spec">
                <span>Available Copies</span>
                <strong>${book.available}</strong>
            </div>
            <div class="detail-spec">
                <span>Price</span>
                <strong>${formatCurrency(book.price)}</strong>
            </div>
            <div class="detail-spec">
                <span>Edition</span>
                <strong>${escapeHTML(book.edition || "1st")}</strong>
            </div>
            <div class="detail-spec">
                <span>Book ID</span>
                <strong>${escapeHTML(book.id)}</strong>
            </div>
        </div>

        <div class="detail-synopsis-box">
            <h4>Full Synopsis</h4>
            <p>${escapeHTML(book.description || "No synopsis available for this book.")}</p>
        </div>

        <div class="detail-actions-footer">
            ${borrowReturnBtn}
            <button class="secondary-btn" onclick="addToCart('${escapeHTML(book.id)}')">${book.isPremium && !isUserPremium(currentUser) ? "🔒 Premium only" : "Buy"}</button>
            <button class="secondary-btn fav" onclick="toggleFavorite('${escapeHTML(book.id)}')">${isFavorite ? "♥ Favorited" : "♡ Favorite"}</button>
            <button class="secondary-btn rate" onclick="openRateModal('${escapeHTML(book.id)}')">Rate</button>
        </div>
    `;

    const detailPanel = document.getElementById("bookDetailPanel");
    detailPanel?.classList.remove("hidden");
    requestAnimationFrame(() => {
        detailPanel?.classList.add("show");
    });

    if (isLibrarianOrAdmin(currentUser)) renderDashboard();
}

function closeBookDetailPanel() {
    const detailPanel = document.getElementById("bookDetailPanel");
    if (!detailPanel) return;
    detailPanel.classList.remove("show");
    setTimeout(() => {
        detailPanel.classList.add("hidden");
    }, 350);
}

function addToCart(id) {
    const book = books.find(item => item.id === id);
    if (!book) return;

    if (book.isPremium && !isUserPremium(currentUser)) {
        showToast("⭐ This is a Premium book. Upgrade to Premium in your profile to buy or borrow it.");
        return;
    }

    const inCart = cart.find(item => item.id === id)?.quantity || 0;
    if ((Number(book.available) || 0) <= inCart) {
        showToast(Number(book.available) > 0
            ? `Only ${book.available} cop${book.available == 1 ? "y" : "ies"} in stock.`
            : "Sorry, this book is out of stock.");
        return;
    }

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({
            id: book.id,
            title: book.title,
            price: Number(book.price) || 0,
            quantity: 1
        });
    }

    saveLibraryData();
    addNotification("Added to Cart", `"${book.title}" was added to your cart.`);
    alert(`"${book.title}" added to cart!`);
    renderCartPage();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveLibraryData();
    renderCartPage();
}

async function deleteBook(id) {
    const book = books.find(item => item.id === id);

    if (!book) return;

    const isOwner = !!book.uploadedBy && sameUser(book.uploadedBy, currentUser);

    if (!isLibrarianOrAdmin(currentUser) && !isOwner) return;

    if (borrows.some(borrow => borrow.id === id && !borrow.returned)) {
        alert("This book is currently borrowed. Wait until it is returned before deleting it.");
        return;
    }

    if (!confirm(`Delete "${book.title}"?`)) return;

    try {
        const { error } = await window.librarySupabase
            .from("library_books")
            .delete()
            .eq("id", id);
        if (error) throw error;
    } catch (error) {
        showSupabaseError(error, "Unable to delete book");
        return;
    }

    if (defaultBooks.some(item => item.id === id)) {
        try {
            const deleted = readJSON("libraryDeletedDefaults", []);
            if (!deleted.includes(id)) deleted.push(id);
            localStorage.setItem("libraryDeletedDefaults", JSON.stringify(deleted));
        } catch (error) {
            console.warn("Could not remember deleted book:", error);
        }
    }

    books = books.filter(item => item.id !== id);
    cart = cart.filter(item => item.id !== id);
    favorites = favorites.filter(favoriteId => favoriteId !== id);

    saveLibraryData();
    renderAll();
}

function deleteBooks() {
    if (!isLibrarianOrAdmin(currentUser)) return;

    const query = prompt("Title or ID to delete:");
    if (!query) return;

    const book = books.find(
        item =>
            item.id.toLowerCase() === query.toLowerCase() ||
            item.title.toLowerCase() === query.toLowerCase()
    );

    if (!book) {
        alert("Not found");
        return;
    }

    deleteBook(book.id);
}

function canUserRateBook(bookId) {
    const hasBorrowed = borrows.some(
        borrow => sameUser(borrow.username, currentUser) && borrow.id === bookId
    );
    if (hasBorrowed) return true;

    return purchaseHistory.some(order =>
        sameUser(order.username, currentUser) &&
        (order.id === bookId || order.items?.some(item => item.id === bookId))
    );
}

function openRateModal(bookId) {
    if (!canUserRateBook(bookId)) {
        alert("You can't rate this book because you have not borrowed or purchased it.");
        return;
    }

    const ratingKey = String(currentUser).toLowerCase();
    const userList = [...(userRatings[ratingKey] || []), ...(userRatings[currentUser] || [])];
    if (userList.includes(bookId)) {
        alert("You have already rated this book! You cannot rate the same book more than once.");
        return;
    }

    currentRatingBookId = bookId;
    selectedRatingStars = 5;
    const book = books.find(b => b.id === bookId);
    const titleEl = document.getElementById("rateBookTitle");
    if (titleEl && book) titleEl.textContent = book.title;
    document.getElementById("rateModal")?.classList.remove("hidden");
    document.getElementById("rateModal")?.classList.add("show");
    highlightStars(5);
}

function closeRateModal() {
    document.getElementById("rateModal")?.classList.remove("show");
    setTimeout(() => {
        document.getElementById("rateModal")?.classList.add("hidden");
    }, 350);
}

function setRatingSelection(stars) {
    selectedRatingStars = stars;
    highlightStars(stars);
}

function highlightStars(count) {
    const container = document.getElementById("starContainer");
    if (!container) return;
    const spans = container.querySelectorAll("span");
    spans.forEach((span, index) => {
        span.style.color = index < count ? "#fbbf24" : "#d1d5db";
    });
}

function submitRating() {
    if (!currentRatingBookId) return;
    if (!canUserRateBook(currentRatingBookId)) {
        alert("You can't rate this book because you have not borrowed or purchased it.");
        closeRateModal();
        return;
    }

    const ratingKey = String(currentUser).toLowerCase();
    if (!userRatings[ratingKey]) {
        userRatings[ratingKey] = [];
    }
    userRatings[ratingKey].push(currentRatingBookId);

    const book = books.find(b => b.id === currentRatingBookId);
    if (book) {
        const isFreshAuthorBook = !book.ratingCount && !Number(book.rating);
        const currentRating = isFreshAuthorBook ? 0 : (Number(book.rating) || 4.0);
        const voteCount = isFreshAuthorBook ? 0 : (Number(book.ratingCount) || 1);
        book.rating = Number(
            ((currentRating * voteCount + selectedRatingStars) / (voteCount + 1)).toFixed(1)
        );
        book.ratingCount = voteCount + 1;
        saveLibraryData();
        renderAll();
        alert(`Thank you! You rated "${book.title}" ${selectedRatingStars} stars.`);
    }
    closeRateModal();
}

function openReportModal(targetType, targetId) {
    reportingTargetType = targetType;
    reportingTargetId = targetId;
    document.getElementById("reportReasonText").value = "";
    document.getElementById("reportModal")?.classList.remove("hidden");
    document.getElementById("reportModal")?.classList.add("show");
}

function closeReportModal() {
    document.getElementById("reportModal")?.classList.remove("show");
    setTimeout(() => {
        document.getElementById("reportModal")?.classList.add("hidden");
    }, 350);
}

function submitReport() {
    const reason = document.getElementById("reportReasonText")?.value.trim();
    if (!reason) {
        alert("Please enter a reason for reporting.");
        return;
    }
    reports.push({
        id: Date.now(),
        reportedBy: currentUser,
        targetType: reportingTargetType,
        targetId: reportingTargetId,
        reason,
        date: today()
    });
    saveLibraryData();
    addNotification("Report Submitted", `Your report regarding the ${reportingTargetType} has been sent to library admins.`);
    alert("Report successfully submitted to administrators.");
    closeReportModal();
}

function openPremiumModal() {
    const modal = document.getElementById("premiumModal");
    if (!modal) return;

    clearTimeout(modal._closeTimer);
    const gcashOption = modal.querySelector('input[name="premiumPaymentMethod"][value="gcash"]');
    if (gcashOption) gcashOption.checked = true;
    const error = document.getElementById("premiumPaymentError");
    if (error) error.textContent = "";
    modal.classList.remove("hidden");
    togglePremiumPaymentDetails();
    requestAnimationFrame(() => {
        modal.classList.add("show");
        modal.querySelector(".help-close")?.focus();
    });
}

function closePremiumModal() {
    const modal = document.getElementById("premiumModal");
    if (!modal || modal.classList.contains("hidden")) return;

    modal.classList.remove("show");
    clearTimeout(modal._closeTimer);
    modal._closeTimer = setTimeout(() => {
        if (!modal.classList.contains("show")) {
            modal.classList.add("hidden");
            document.getElementById("upgradePremiumBtn")?.focus();
        }
    }, 350);
}

function togglePremiumPaymentDetails() {
    const method = document.querySelector(
        'input[name="premiumPaymentMethod"]:checked'
    )?.value || "gcash";

    ["gcash", "maya", "card", "bank"].forEach(name => {
        document.getElementById(
            `premium${name[0].toUpperCase()}${name.slice(1)}Details`
        )?.classList.toggle("hidden", method !== name);
    });

    const error = document.getElementById("premiumPaymentError");
    if (error) error.textContent = "";
}

async function confirmUpgradePremium() {
    const button = document.getElementById("premiumConfirmButton");
    const errorMessage = document.getElementById("premiumPaymentError");
    const method = document.querySelector(
        'input[name="premiumPaymentMethod"]:checked'
    )?.value || "gcash";

    if (!["gcash", "maya", "card", "bank"].includes(method)) {
        if (errorMessage) errorMessage.textContent = "Choose a valid demo payment method.";
        return;
    }

    if (button) button.disabled = true;
    if (errorMessage) errorMessage.textContent = "";
    try {
        const { data, error } = await window.librarySupabase.rpc("activate_demo_premium");
        if (error) throw error;
        const premiumUntil = data;

        const accounts = getSavedAccounts();
        const account = accounts.find(item => item.username?.toLowerCase() === String(currentUser).toLowerCase());

        if (account) {
            account.membership = "premium";
            account.premiumUntil = premiumUntil;
            saveAccounts(accounts);
        }

        sales.today += PREMIUM_PRICE;
        sales.month += PREMIUM_PRICE;
        saveLibraryData();

        addNotification("⭐ Premium Membership Activated!", "Welcome to VIP Premium! You now have unlimited access to all 75 exclusive premium books.");
        closePremiumModal();
        renderAll();
        alert(`Demo Premium activated via ${method === "card" ? "Visa / card" : method === "bank" ? "online banking" : method} until ${premiumUntil}. No payment was processed.`);
    } catch (error) {
        if (errorMessage) errorMessage.textContent = error.message || "Unable to activate Premium.";
        showSupabaseError(error, "Unable to activate Premium");
    } finally {
        if (button) button.disabled = false;
    }
}

async function cancelSubscription() {
    if (!confirm("Are you sure you want to cancel your Premium subscription?")) return;
    try {
        const { error } = await window.librarySupabase.rpc("cancel_demo_premium");
        if (error) throw error;
    } catch (error) {
        showSupabaseError(error, "Unable to cancel Premium");
        return;
    }

    const accounts = getSavedAccounts();
    const account = accounts.find(item => item.username?.toLowerCase() === String(currentUser).toLowerCase());

    if (account) {
        account.membership = "regular";
        account.premiumUntil = null;
        saveAccounts(accounts);
    }

    saveLibraryData();
    addNotification("Subscription Canceled", "Your Premium membership has been canceled. You are now a Regular member.");
    alert("Your Premium subscription has been successfully canceled.");
    renderAll();
}

const AVATARS_KEY = "libraryAvatars";
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

function getAvatars() {
    const saved = readJSON(AVATARS_KEY, {});
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
}

function getUserAvatar() {
    if (!currentUser) return "";
    return getAvatars()[String(currentUser).toLowerCase()] || "";
}

function storeUserAvatar(value) {
    if (!currentUser) return false;
    const avatars = getAvatars();
    avatars[String(currentUser).toLowerCase()] = value;

    try {
        localStorage.setItem(AVATARS_KEY, JSON.stringify(avatars));
        return true;
    } catch {
        alert("Could not save the avatar. Browser storage is full - try a smaller image.");
        return false;
    }
}

function paintAvatar(element, value) {
    if (!element || !value) return;

    if (/^(https?:\/\/|data:image\/)/i.test(value)) {
        element.textContent = "";
        const img = document.createElement("img");
        img.src = value;
        img.alt = "Avatar";
        img.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
        img.onerror = () => { element.textContent = "👤"; };
        element.appendChild(img);
    } else {
        element.textContent = value;
    }
}

function renderAvatars() {
    const value = getUserAvatar();
    const sideAvatar = document.getElementById("sideUserAvatar");

    if (!value) {
        if (sideAvatar) sideAvatar.textContent = "👤";
        return;
    }

    paintAvatar(sideAvatar, value);
    paintAvatar(document.getElementById("profileAvatar"), value);
}

function openAvatarModal() {
    const modal = document.getElementById("avatarModal");
    const urlInput = document.getElementById("customAvatarUrl");
    const fileInput = document.getElementById("customAvatarFile");

    if (urlInput) urlInput.value = "";
    if (fileInput) fileInput.value = "";

    modal?.classList.remove("hidden");
    requestAnimationFrame(() => modal?.classList.add("show"));
}

function closeAvatarModal() {
    const modal = document.getElementById("avatarModal");

    modal?.classList.remove("show");
    setTimeout(() => modal?.classList.add("hidden"), 350);
}

function applyAvatar(value) {
    if (!storeUserAvatar(value)) return;
    renderProfilePage();
    renderAvatars();
    closeAvatarModal();
}

function setAvatarChoice(emoji) {
    applyAvatar(emoji);
}

function saveCustomAvatar() {
    const fileInput = document.getElementById("customAvatarFile");
    const urlInput = document.getElementById("customAvatarUrl");
    const file = fileInput?.files?.[0];

    if (file) {
        if (!file.type.startsWith("image/")) {
            alert("Please choose an image file.");
            return;
        }
        if (file.size > MAX_AVATAR_BYTES) {
            alert("That image is too large. Please choose one under 2 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => applyAvatar(String(reader.result));
        reader.onerror = () => alert("Could not read that file. Please try another image.");
        reader.readAsDataURL(file);
        return;
    }

    const text = urlInput?.value.trim() || "";

    if (!text) {
        alert("Pick an emoji, paste an image URL, or upload a picture first.");
        return;
    }

    const isUrl = /^https?:\/\//i.test(text);

    if (!isUrl && Array.from(text).length > 8) {
        alert("For an emoji, enter just one or two characters. For an image, paste a full link starting with http:// or https://");
        return;
    }

    applyAvatar(text);
}

function renderAll() {
    populateCategoryFilters();
    renderDashboard();
    renderBooksPage();
    renderAuthorsPage();
    renderBorrowPage();
    renderCartPage();
    renderSearchPage();
    renderProfilePage();
    renderAvatars();
    renderNotifications();
    renderRewardsPage();
    renderRecoveryStatus();

    applyRoleVisibility();
    refreshRoleBadge();
    enforceThemeAccess();
    renderThemePicker();
    renderAuthorSettingsPanel();
    renderDeleteAccountPanel();
    renderMyBooksPage();
    renderChatWidget(true);
    renderMessagesPage();

    if (isLibrarianOrAdmin(currentUser)) {
        renderAdminPage();
        renderSupportPage(true);
    }

    saveLibraryData();
}

const THEMES = {
    dark:    { label: "Simple Dark",  icon: "🌙", dark: true,  desc: "Clean default dark mode" },
    light:   { label: "Light Mode",   icon: "☀️", dark: false, desc: "Bright and simple" },
    fire:    { label: "Hellish Fire", icon: "🔥", dark: true,  desc: "Lava reds and glowing embers" },
    galaxy:  { label: "Galaxy",       icon: "🌌", dark: true,  desc: "Deep space with twinkling stars" },
    sunny:   { label: "Sunny Day",    icon: "🌞", dark: false, desc: "Blue sky and warm sunshine" },
    ocean:   { label: "Ocean Depths", icon: "🌊", dark: true,  desc: "Deep teal waves and foam" },
    forest:  { label: "Enchanted Forest", icon: "🌲", dark: true,  desc: "Moss greens and soft mist" },
    rose:    { label: "Rose Garden",  icon: "🌹", dark: false, desc: "Soft pink petals and cream" },
    cyber:   { label: "Cyber Neon",   icon: "⚡", dark: true,  desc: "Neon cyan and magenta grid" },
    midnight:{ label: "Midnight Blue",icon: "🌃", dark: true,  desc: "Cool navy and silver moonlight" },
    sakura:  { label: "Sakura Blossom", icon: "🌸", dark: false, desc: "Cherry blossom pink spring" },
    sunset: { label: "Golden Sunset", icon: "🌇", dark: true, desc: "Amber, coral and dusky purple" },
    aurora: { label: "Aurora Lights", icon: "🌠", dark: true, desc: "Green and violet northern sky" },
    coffee: { label: "Coffee House", icon: "☕", dark: true, desc: "Warm espresso and cream" },
    matrix: { label: "Matrix Code", icon: "🟩", dark: true, desc: "Black terminal with green glow" },
    gold: { label: "Royal Gold", icon: "👑", dark: true, desc: "Black and luxurious gold" },
    mint: { label: "Fresh Mint", icon: "🍃", dark: false, desc: "Cool mint and soft green" },
    peach: { label: "Peach Cream", icon: "🍑", dark: false, desc: "Warm peach and apricot" }
};

const FANCY_THEMES = ["fire", "galaxy", "sunny", "ocean", "forest", "rose", "cyber", "midnight", "sakura", "sunset", "aurora", "coffee", "matrix", "gold", "mint", "peach"];

const PREMIUM_THEMES = ["galaxy", "cyber", "matrix", "aurora", "sunset", "gold"];

function canUseTheme(name) {
    return !PREMIUM_THEMES.includes(name) || isUserPremium(currentUser);
}

function enforceThemeAccess() {
    const current = document.body.dataset.theme;
    if (currentUser && PREMIUM_THEMES.includes(current) && !isUserPremium(currentUser)) {
        applyTheme("dark", true);
        showToast("Your Premium theme was switched back to Simple Dark because Premium is not active.");
    }
}

function getSavedTheme() {
    const saved = localStorage.getItem("libraryTheme");
    return THEMES[saved] ? saved : "dark";
}

function applyTheme(name, force = false) {
    if (!THEMES[name]) name = "dark";

    if (!force && !canUseTheme(name)) {
        showToast(`⭐ "${THEMES[name].label}" is a Premium theme. Upgrade to Premium to use it!`);
        showPage("profile");
        return;
    }

    document.body.dataset.theme = name;
    document.body.classList.toggle("dark-theme", THEMES[name].dark);
    document.body.classList.toggle("themed", FANCY_THEMES.includes(name));

    try {
        localStorage.setItem("libraryTheme", name);
    } catch (error) {
        console.warn("Could not save theme:", error);
    }

    renderThemePicker();
}

function renderThemePicker() {
    const picker = document.getElementById("themePicker");
    if (!picker) return;

    const current = document.body.dataset.theme || "dark";

    picker.innerHTML = Object.entries(THEMES).map(([key, theme]) => {
        const isPremTheme = PREMIUM_THEMES.includes(key);
        const locked = !canUseTheme(key);
        return `
        <button type="button" class="theme-card ${key === current ? "active" : ""} ${locked ? "locked" : ""}" style="position:relative;" onclick="applyTheme('${key}')" aria-pressed="${key === current}">
            ${isPremTheme ? `<span class="theme-premium-tag">${locked ? "🔒" : "⭐"} Premium</span>` : ""}
            <span class="theme-swatch swatch-${key}"><span>${theme.icon}</span></span>
            <strong>${theme.label}</strong>
            <small>${theme.desc}</small>
        </button>
    `;
    }).join("");
}

const REWARDS_KEY = "libraryRewards";
const XP_PER_LEVEL = 100;
const QUIZ_DAILY_XP_CAP = 25;
const QUIZ_XP_PER_ANSWER = 5;

let quizState = null;
let rouletteBookId = null;

const CHALLENGES = [
    { id: "borrow", icon: "📖", title: "Borrow a book",     desc: "Borrow 1 book this week",     goal: 1, xp: 20, metric: "borrowCount" },
    { id: "return", icon: "🔄", title: "Return a book",     desc: "Return 1 book this week",     goal: 1, xp: 20, metric: "returnedCount" },
    { id: "fav",    icon: "❤️", title: "Pick favorites",    desc: "Favorite 2 books this week",  goal: 2, xp: 15, metric: "favCount" },
    { id: "rate",   icon: "⭐", title: "Leave a rating",    desc: "Rate 1 book this week",       goal: 1, xp: 15, metric: "ratingCount" }
];

const BADGES = [
    { id: "first-borrow", icon: "📖", name: "First Chapter",   desc: "Borrow your first book",              test: m => m.borrowCount >= 1 },
    { id: "bookworm",     icon: "🐛", name: "Bookworm",        desc: "Borrow 5 books",                      test: m => m.borrowCount >= 5 },
    { id: "legend",       icon: "🏆", name: "Library Legend",  desc: "Borrow 15 books",                     test: m => m.borrowCount >= 15 },
    { id: "punctual",     icon: "⏰", name: "Always on Time",  desc: "Return 3 books on or before the due date", test: m => m.onTimeReturns >= 3 },
    { id: "explorer",     icon: "🧭", name: "Explorer",        desc: "Borrow from 3 different categories",  test: m => m.categoryCount >= 3 },
    { id: "collector",    icon: "❤️", name: "Collector",       desc: "Have 5 favorite books",               test: m => m.favCount >= 5 },
    { id: "critic",       icon: "⭐", name: "Critic",          desc: "Rate 3 books",                        test: m => m.ratingCount >= 3 },
    { id: "vip",          icon: "💎", name: "VIP",             desc: "Be a Premium member",                 test: m => m.premium },
    { id: "author",       icon: "✍️", name: "Published Author", desc: "Get approved as an author",          test: m => m.author },
    { id: "prolific",     icon: "📚", name: "Prolific Writer", desc: "Publish 3 books",                     test: m => m.authorBooks >= 3 },
    { id: "streak3",      icon: "🔥", name: "On Fire",         desc: "Reach a 3-day check-in streak",       test: m => m.bestStreak >= 3 },
    { id: "streak7",      icon: "🌟", name: "Unstoppable",     desc: "Reach a 7-day check-in streak",       test: m => m.bestStreak >= 7 },
    { id: "level5",       icon: "🎓", name: "Scholar",         desc: "Reach level 5",                       test: m => m.level >= 5 }
];

function readRewardsStore() {
    const data = readJSON(REWARDS_KEY, {});
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
}

function getMyRewards() {
    const store = readRewardsStore();
    const key = String(currentUser || "").toLowerCase();
    const r = store[key] || {
        xp: 0, streak: 0, bestStreak: 0, lastCheckin: "",
        cycle: null, claimed: {}, badgesSeen: null,
        quiz: { date: "", xp: 0 }
    };
    return { store, key, r };
}

function saveMyRewards(store, key, r) {
    store[key] = r;
    try {
        localStorage.setItem(REWARDS_KEY, JSON.stringify(store));
    } catch (error) {
        console.warn("Could not save rewards:", error);
    }
}

function getLevel(xp) {
    return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function addXP(r, amount) {
    const before = getLevel(r.xp);
    r.xp += amount;
    const after = getLevel(r.xp);
    if (after > before) {
        showToast(`🎉 Level up! You are now level ${after}.`);
        addNotification("Level Up!", `You reached level ${after}. Keep reading!`);
    }
}

function getRatingCount() {
    const key = String(currentUser || "").toLowerCase();
    return new Set([...(userRatings[key] || []), ...(userRatings[currentUser] || [])]).size;
}

function getRewardMetrics() {
    const mine = borrows.filter(borrow => sameUser(borrow.username, currentUser));
    const returned = mine.filter(borrow => borrow.returned);
    const categories = new Set(
        mine.map(borrow => books.find(book => book.id === borrow.id)?.category).filter(Boolean)
    );

    return {
        borrowCount: mine.length,
        returnedCount: returned.length,
        onTimeReturns: returned.filter(borrow => borrow.returnedOn && borrow.returnedOn <= borrow.dueDate).length,
        favCount: favorites.length,
        ratingCount: getRatingCount(),
        categoryCount: categories.size,
        premium: isUserPremium(currentUser),
        author: isApprovedAuthor(currentUser),
        authorBooks: books.filter(book => book.uploadedBy && sameUser(book.uploadedBy, currentUser)).length
    };
}

function getWeekStart(dateString) {
    const [year, month, day] = String(dateString).split("-").map(Number);
    const date = new Date(year, month - 1, day);
    const sinceMonday = (date.getDay() + 6) % 7;
    return formatLocalDate(new Date(year, month - 1, day - sinceMonday));
}

function ensureCycle(r, metrics) {
    const weekStart = getWeekStart(today());
    if (!r.cycle || r.cycle.weekStart !== weekStart) {
        r.cycle = {
            weekStart,
            base: {
                borrow: metrics.borrowCount,
                return: metrics.returnedCount,
                fav: metrics.favCount,
                rate: metrics.ratingCount
            }
        };
        r.claimed = {};
    }
}

function getChallengeProgress(challenge, r, metrics) {
    const base = r.cycle?.base?.[challenge.id] || 0;
    return Math.min(challenge.goal, Math.max(0, metrics[challenge.metric] - base));
}

function evaluateBadges(r, ctx) {
    const earned = BADGES.filter(badge => badge.test(ctx)).map(badge => badge.id);

    if (!Array.isArray(r.badgesSeen)) {
        r.badgesSeen = earned.slice();
        return earned;
    }

    const fresh = earned.filter(id => !r.badgesSeen.includes(id));
    fresh.forEach(id => {
        const badge = BADGES.find(item => item.id === id);
        r.badgesSeen.push(id);
        if (badge) {
            showToast(`🏅 New badge: ${badge.icon} ${badge.name}!`);
            addNotification("New Badge Earned!", `${badge.icon} ${badge.name}: ${badge.desc}`);
        }
    });

    return earned;
}

function dailyCheckIn() {
    if (!currentUser) return;
    const { store, key, r } = getMyRewards();

    if (r.lastCheckin === today()) {
        showToast("You already checked in today. Come back tomorrow!");
        return;
    }

    r.streak = r.lastCheckin === addDays(today(), -1) ? (r.streak || 0) + 1 : 1;
    r.bestStreak = Math.max(r.bestStreak || 0, r.streak);
    r.lastCheckin = today();

    const reward = 10 + Math.min(r.streak - 1, 6) * 2;
    addXP(r, reward);
    saveMyRewards(store, key, r);

    showToast(`✅ Checked in! Streak: ${r.streak} day${r.streak > 1 ? "s" : ""} · +${reward} XP`);
    renderRewardsPage();
}

function claimChallenge(id) {
    const challenge = CHALLENGES.find(item => item.id === id);
    if (!challenge || !currentUser) return;

    const { store, key, r } = getMyRewards();
    const metrics = getRewardMetrics();
    ensureCycle(r, metrics);

    if (r.claimed[id]) return;
    if (getChallengeProgress(challenge, r, metrics) < challenge.goal) {
        showToast("Finish the challenge first!");
        return;
    }

    r.claimed[id] = true;
    addXP(r, challenge.xp);
    saveMyRewards(store, key, r);

    showToast(`🎁 Challenge complete! +${challenge.xp} XP`);
    renderRewardsPage();
}

function spinRoulette() {
    const pool = books.filter(book =>
        (Number(book.available) || 0) > 0 && (!book.isPremium || isUserPremium(currentUser))
    );

    if (!pool.length) {
        showToast("No books are available right now.");
        return;
    }

    const display = document.getElementById("rouletteDisplay");
    const button = document.getElementById("rouletteBtn");
    if (button) button.disabled = true;

    let ticks = 0;
    const timer = setInterval(() => {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        if (display) display.textContent = "📚 " + pick.title;

        ticks += 1;
        if (ticks >= 10) {
            clearInterval(timer);
            rouletteBookId = pick.id;
            renderRewardsPage();
        }
    }, 90);
}

function shuffleArray(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function newQuizQuestion() {
    const pool = books.filter(book => book.author && !book.isPremium);
    const authors = [...new Set(pool.map(book => book.author))];

    if (authors.length < 4) {
        showToast("Not enough books in the library for a quiz yet.");
        return;
    }

    const book = pool[Math.floor(Math.random() * pool.length)];
    const wrong = shuffleArray(authors.filter(name => name !== book.author)).slice(0, 3);

    quizState = {
        title: book.title,
        correct: book.author,
        options: shuffleArray([book.author, ...wrong]),
        picked: null,
        message: ""
    };

    renderRewardsPage();
}

function answerQuiz(index) {
    if (!quizState || quizState.picked !== null) return;

    const choice = quizState.options[index];
    quizState.picked = index;

    if (choice === quizState.correct) {
        const { store, key, r } = getMyRewards();
        if (!r.quiz || r.quiz.date !== today()) r.quiz = { date: today(), xp: 0 };

        if (r.quiz.xp < QUIZ_DAILY_XP_CAP) {
            const gain = Math.min(QUIZ_XP_PER_ANSWER, QUIZ_DAILY_XP_CAP - r.quiz.xp);
            r.quiz.xp += gain;
            addXP(r, gain);
            quizState.message = `✅ Correct! +${gain} XP`;
        } else {
            quizState.message = "✅ Correct! (You hit today's quiz XP limit, but keep playing for fun.)";
        }
        saveMyRewards(store, key, r);
    } else {
        quizState.message = `❌ Not quite. The answer was ${quizState.correct}.`;
    }

    renderRewardsPage();
}

function renderRewardsPage() {
    const root = document.getElementById("rewardsContent");
    const strip = document.getElementById("profileBadges");
    if (!currentUser || (!root && !strip)) return;

    const { store, key, r } = getMyRewards();
    const metrics = getRewardMetrics();
    ensureCycle(r, metrics);

    const level = getLevel(r.xp);
    const ctx = { ...metrics, bestStreak: r.bestStreak || 0, level };
    const earned = evaluateBadges(r, ctx);
    saveMyRewards(store, key, r);

    if (strip) {
        const chips = BADGES.filter(badge => earned.includes(badge.id)).map(badge =>
            `<span class="badge-chip" title="${escapeHTML(badge.desc)}">${badge.icon} ${escapeHTML(badge.name)}</span>`
        ).join("");

        strip.innerHTML = (chips || '<p class="empty">No badges yet. Complete challenges to earn some!</p>') +
            `<button type="button" class="text-btn" onclick="showPage('rewards')">See all badges →</button>`;
    }

    if (!root) return;

    const xpInLevel = r.xp % XP_PER_LEVEL;
    const checkedInToday = r.lastCheckin === today();
    const streakIsAlive = r.lastCheckin === today() || r.lastCheckin === addDays(today(), -1);
    const shownStreak = streakIsAlive ? (r.streak || 0) : 0;

    const challengeHTML = CHALLENGES.map(challenge => {
        const progress = getChallengeProgress(challenge, r, metrics);
        const done = progress >= challenge.goal;
        const claimed = !!r.claimed[challenge.id];

        return `
            <div class="rw-card ${claimed ? "claimed" : ""}">
                <div class="rw-card-top">
                    <span class="rw-icon">${challenge.icon}</span>
                    <div class="rw-card-text">
                        <strong>${escapeHTML(challenge.title)}</strong>
                        <small>${escapeHTML(challenge.desc)}</small>
                    </div>
                    <span class="rw-xp">+${challenge.xp} XP</span>
                </div>
                <div class="rw-bar"><div class="rw-fill" style="width:${(progress / challenge.goal) * 100}%"></div></div>
                <div class="rw-card-bottom">
                    <small>${progress}/${challenge.goal}</small>
                    ${claimed
                        ? '<span class="rw-claimed">✅ Claimed</span>'
                        : `<button type="button" class="primary-btn" ${done ? "" : "disabled"} onclick="claimChallenge('${challenge.id}')">${done ? "Claim reward" : "In progress"}</button>`}
                </div>
            </div>
        `;
    }).join("");

    const badgeHTML = BADGES.map(badge => {
        const has = earned.includes(badge.id);
        return `
            <div class="badge-item ${has ? "earned" : "locked"}" title="${escapeHTML(badge.desc)}">
                <span class="badge-icon">${has ? badge.icon : "🔒"}</span>
                <strong>${escapeHTML(badge.name)}</strong>
                <small>${escapeHTML(badge.desc)}</small>
            </div>
        `;
    }).join("");

    const rouletteBook = rouletteBookId ? books.find(book => book.id === rouletteBookId) : null;
    const rouletteHTML = `
        <div class="rw-game-screen" id="rouletteDisplay">
            ${rouletteBook ? `📚 ${escapeHTML(rouletteBook.title)}` : "Press spin and let fate pick your next read!"}
        </div>
        ${rouletteBook ? `
            <p class="rw-game-sub">by ${escapeHTML(rouletteBook.author)} · ★ ${rouletteBook.rating || "—"} · ${Number(rouletteBook.available) || 0} available</p>
            <div class="rw-game-actions">
                <button type="button" class="secondary-btn" onclick="viewBook('${escapeHTML(rouletteBook.id)}')">View</button>
                <button type="button" class="primary-btn" onclick="borrowBook('${escapeHTML(rouletteBook.id)}')">Borrow it</button>
            </div>` : ""}
        <button type="button" id="rouletteBtn" class="primary-btn" onclick="spinRoulette()">🎲 ${rouletteBook ? "Spin again" : "Spin"}</button>
    `;

    const quizToday = r.quiz && r.quiz.date === today() ? r.quiz.xp : 0;
    let quizHTML;
    if (!quizState) {
        quizHTML = `
            <div class="rw-game-screen">Who wrote which book? Test yourself!</div>
            <button type="button" class="primary-btn" onclick="newQuizQuestion()">▶ Start quiz</button>
        `;
    } else {
        const answered = quizState.picked !== null;
        quizHTML = `
            <div class="rw-game-screen">Who wrote <em>${escapeHTML(quizState.title)}</em>?</div>
            <div class="quiz-options">
                ${quizState.options.map((option, index) => {
                    let state = "";
                    if (answered && option === quizState.correct) state = "correct";
                    else if (answered && index === quizState.picked) state = "wrong";
                    return `<button type="button" class="quiz-option ${state}" ${answered ? "disabled" : ""} onclick="answerQuiz(${index})">${escapeHTML(option)}</button>`;
                }).join("")}
            </div>
            ${answered ? `<p class="rw-game-sub">${escapeHTML(quizState.message)}</p>
                <button type="button" class="primary-btn" onclick="newQuizQuestion()">Next question →</button>` : ""}
        `;
    }

    root.innerHTML = `
        <div class="panel rw-level-panel">
            <div class="rw-level-badge">Lv ${level}</div>
            <div class="rw-level-info">
                <h3>${escapeHTML(currentUser)}</h3>
                <div class="rw-bar big"><div class="rw-fill" style="width:${xpInLevel}%"></div></div>
                <small>${xpInLevel}/${XP_PER_LEVEL} XP to level ${level + 1} · ${r.xp} XP total</small>
            </div>
            <div class="rw-checkin">
                <div class="rw-streak">🔥 ${shownStreak} day streak</div>
                <button type="button" class="primary-btn" ${checkedInToday ? "disabled" : ""} onclick="dailyCheckIn()">${checkedInToday ? "Checked in ✅" : "Daily check-in"}</button>
            </div>
        </div>

        <div class="panel">
            <h3>🎯 Weekly Challenges</h3>
            <p class="rw-sub">New challenges start every Monday (next reset: ${addDays(r.cycle.weekStart, 7)}).</p>
            <div class="rw-grid">${challengeHTML}</div>
        </div>

        <div class="panel">
            <h3>🏅 Badges <small class="rw-sub">${earned.length}/${BADGES.length} earned</small></h3>
            <div class="badge-grid">${badgeHTML}</div>
        </div>

        <div class="rw-games">
            <div class="panel">
                <h3>🎲 Book Roulette</h3>
                ${rouletteHTML}
            </div>
            <div class="panel">
                <h3>🧠 Guess the Author</h3>
                <p class="rw-sub">${QUIZ_XP_PER_ANSWER} XP per correct answer · ${quizToday}/${QUIZ_DAILY_XP_CAP} XP earned today</p>
                ${quizHTML}
            </div>
        </div>
    `;
}

function renderAuthorsPage() {
    const element = document.getElementById("authorList");
    if (!element) return;

    const map = new Map();
    const entryFor = name => {
        const k = String(name).trim().toLowerCase();
        if (!map.has(k)) map.set(k, { name: String(name).trim(), books: [], status: "", bio: "" });
        return map.get(k);
    };

    getSavedAccounts()
        .filter(account => ["pending", "approved"].includes(account.authorStatus) && !account.banned)
        .forEach(account => {
            const entry = entryFor(account.penName || account.username);
            entry.status = account.authorStatus;
            entry.bio = account.authorBio || "";
        });

    books.forEach(book => {
        if (book.author) entryFor(book.author).books.push(book);
    });

    const authors = [...map.values()].sort((a, b) => a.name.localeCompare(b.name));

    element.innerHTML = authors.map(author => {
        const count = author.books.length;
        const rated = author.books.filter(book => Number(book.rating) > 0);
        const avg = rated.length ? rated.reduce((sum, book) => sum + Number(book.rating), 0) / rated.length : 0;

        const tags = [];
        if (author.status === "approved") tags.push("✍️ Verified Author");
        if (author.status === "pending") tags.push("⏳ Pending approval");
        if (count >= 3) tags.push("📚 Prolific");
        if (avg >= 4.5) tags.push("⭐ Top Rated");

        return `
            <div class="author-card" data-author="${escapeHTML(author.name)}">
                <h4>${escapeHTML(author.name)}</h4>
                <div class="meta">${count} book${count === 1 ? "" : "s"}</div>
                ${author.bio ? `<p class="author-bio">${escapeHTML(author.bio.slice(0, 110))}${author.bio.length > 110 ? "…" : ""}</p>` : ""}
                <div class="author-tags">${tags.map(tag => `<span>${tag}</span>`).join("")}</div>
            </div>
        `;
    }).join("") || '<p class="empty">No authors yet</p>';
}

document.getElementById("authorList")?.addEventListener("click", event => {
    const card = event.target.closest(".author-card");
    if (!card) return;

    const name = card.dataset.author;
    const hasBooks = books.some(book => String(book.author || "").toLowerCase() === name.toLowerCase());

    if (hasBooks) {
        filterByAuthor(name);
    } else {
        showToast(`${name} hasn't published any books yet.`);
    }
});

function resetForgotForm() {
    document.getElementById("forgotForm")?.reset();
    const error = document.getElementById("forgotError");
    if (error) error.textContent = "";
}

function renderRecoveryStatus() {
    const element = document.getElementById("recoveryStatus");
    if (!element || !currentUser) return;
    const account = getCurrentAccount();
    element.textContent = `Password recovery is managed by Supabase${account?.email ? ` for ${account.email}` : ""}.`;
}

async function adminResetPassword(username) {
    if (!isLibrarianOrAdmin(currentUser) || sameUser(username, currentUser)) return;

    const account = getSavedAccounts().find(item => sameUser(item.username, username));
    if (!account?.email) return;
    if (account.role !== "user" && getCurrentAccount()?.role !== "admin") {
        alert("Only admins can reset a staff account's password.");
        return;
    }

    if (!confirm(`Send a password reset email to ${account.email}?`)) return;

    try {
        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        const { error } = await window.librarySupabase.auth.resetPasswordForEmail(account.email, { redirectTo });
        if (error) throw error;
        addNotification("Password reset", `You reset the password for ${account.username}.`);
        alert(`A password reset link was sent to ${account.email}.`);
    } catch (error) {
        showSupabaseError(error, "Unable to send password reset email");
    }
}

function getAccountByName(username) {
    return getSavedAccounts().find(account => sameUser(account.username, username)) || null;
}

function isApprovedAuthor(username) {
    const account = getAccountByName(username);
    return !!account && account.authorStatus === "approved" && !account.banned;
}

function applyRoleVisibility() {
    const staff = isLibrarianOrAdmin(currentUser);
    const author = isApprovedAuthor(currentUser);

    document.querySelectorAll(".admin-only").forEach(element => {
        element.classList.toggle("hidden", !staff);
    });

    document.querySelectorAll(".author-only").forEach(element => {
        element.classList.toggle("hidden", !author);
    });
}

function refreshRoleBadge() {
    const badge = document.getElementById("roleBadge");
    if (!badge || !currentUser) return;

    const isPrem = isUserPremium(currentUser);
    const isAuthor = isApprovedAuthor(currentUser);

    if (isAdmin(currentUser)) {
        badge.textContent = "ADMIN";
        badge.className = "role-badge admin";
    } else if (isPrem) {
        badge.textContent = isAuthor ? "⭐ PREMIUM · ✍️ AUTHOR" : "⭐ PREMIUM";
        badge.className = "role-badge premium";
    } else if (isAuthor) {
        badge.textContent = "✍️ AUTHOR";
        badge.className = "role-badge author";
    } else {
        badge.textContent = "MEMBER";
        badge.className = "role-badge";
    }
}

function validatePenName(name, ownUsername = "") {
    const clean = String(name || "").trim();

    if (clean.length < 2 || clean.length > 40) {
        return "Pen name must be 2 to 40 characters.";
    }

    const lower = clean.toLowerCase();
    const isOwner = value => !!ownUsername && !!value && sameUser(value, ownUsername);

    const usedByBook = books.some(
        book => String(book.author || "").toLowerCase() === lower && !isOwner(book.uploadedBy)
    );

    if (usedByBook) {
        return "That author name already exists in the library. Please choose a different pen name.";
    }

    const usedByAccount = getSavedAccounts().some(
        account => account.penName && account.penName.toLowerCase() === lower && !isOwner(account.username)
    );

    if (usedByAccount) {
        return "That pen name is already taken.";
    }

    return "";
}

function getSignupType() {
    return document.querySelector('input[name="signupType"]:checked')?.value || "regular";
}

function updateSignupType() {
    const isAuthor = getSignupType() === "author";

    document.querySelectorAll(".signup-type-option").forEach(option => {
        option.classList.toggle("active", !!option.querySelector("input")?.checked);
    });

    document.getElementById("authorSignupFields")?.classList.toggle("hidden", !isAuthor);

    const button = document.getElementById("signupSubmitBtn");
    if (button) button.textContent = isAuthor ? "Submit Author Application" : "Create Account";

    const penInput = document.getElementById("signupPenName");
    if (penInput) penInput.required = isAuthor;
}

function renderAuthorSettingsPanel() {
    const body = document.getElementById("authorSettingsBody");
    if (!body) return;

    const account = getCurrentAccount();

    if (!account) {
        body.innerHTML = "<p>Built-in administrator accounts can't apply as authors.</p>";
        return;
    }

    const status = account.authorStatus || "none";
    const pen = escapeHTML(account.penName || account.username);

    if (status === "approved") {
        body.innerHTML = `
            <p style="margin-bottom: 12px;">✅ You're an approved author as <strong>${pen}</strong>. Upload books from <strong>My Books</strong> in the menu.</p>
            <button type="button" class="secondary-btn" style="width:auto;" onclick="showPage('myBooks')">Go to My Books</button>
        `;
        return;
    }

    if (status === "pending") {
        body.innerHTML = `<p>⏳ Your author application as <strong>${pen}</strong> is waiting for an admin to review it.</p>`;
        return;
    }

    const intro = status === "rejected"
        ? '<p style="margin-bottom: 12px; color: var(--danger);">Your last application wasn\'t approved. You can update it and apply again.</p>'
        : '<p style="margin-bottom: 12px;">Want to publish your own books? Apply to become an author.</p>';

    body.innerHTML = `
        ${intro}
        <form id="authorApplyForm" onsubmit="applyAsAuthor(event)" style="max-width: 500px;">
            <label for="settingsPenName">Pen Name</label>
            <input type="text" id="settingsPenName" maxlength="40" value="${escapeHTML(account.penName || "")}" required>

            <label for="settingsAuthorBio">About You</label>
            <textarea id="settingsAuthorBio" rows="3" maxlength="300">${escapeHTML(account.authorBio || "")}</textarea>

            <p id="authorApplyError" class="error-message"></p>
            <button type="submit" class="primary-btn" style="width: 100%;">Apply as Author</button>
        </form>
    `;
}

async function applyAsAuthor(event) {
    event.preventDefault();

    const current = getCurrentAccount();
    if (!current) return;

    const errorElement = document.getElementById("authorApplyError");
    const penName = (document.getElementById("settingsPenName")?.value || "").trim();
    const bio = (document.getElementById("settingsAuthorBio")?.value || "").trim();

    const problem = validatePenName(penName, current.username);
    if (problem) {
        if (errorElement) errorElement.textContent = problem;
        return;
    }

    try {
        const { error } = await window.librarySupabase.rpc("apply_for_author", {
            p_pen_name: penName,
            p_author_bio: bio
        });
        if (error) throw error;
    } catch (error) {
        if (errorElement) errorElement.textContent = error.message || "Unable to send author application.";
        return;
    }

    const accounts = getSavedAccounts();
    const target = accounts.find(account => sameUser(account.username, current.username));
    if (!target) return;
    target.authorStatus = "pending";
    target.penName = penName;
    target.authorBio = bio;
    target.authorAppliedAt = today();

    saveAccounts(accounts);

    alert("Application sent! An admin will review it soon.");
    renderAll();
}

function renderAuthorApplications() {
    const table = document.getElementById("authorApplicationsTable");
    if (!table || !isLibrarianOrAdmin(currentUser)) return;

    const order = { pending: 0, approved: 1, rejected: 2 };

    const applications = getSavedAccounts()
        .filter(account => account.authorStatus && account.authorStatus !== "none")
        .sort((a, b) => (order[a.authorStatus] ?? 3) - (order[b.authorStatus] ?? 3));

    if (!applications.length) {
        table.innerHTML = '<tr><td colspan="6" class="empty">No author applications yet.</td></tr>';
        return;
    }

    table.innerHTML = applications.map(account => {
        const status = account.authorStatus;
        const statusClass = status === "approved" ? "available" : status === "rejected" ? "overdue" : "borrowed";
        const statusLabel = status === "approved" ? "Approved" : status === "rejected" ? "Not approved" : "Pending";
        const user = escapeHTML(account.username);

        let actions;
        if (status === "approved") {
            actions = `<button class="action-btn delete" data-review-user="${user}" data-decision="rejected">Remove author</button>`;
        } else if (status === "rejected") {
            actions = `<button class="action-btn" data-review-user="${user}" data-decision="approved">Approve</button>`;
        } else {
            actions = `
                <button class="action-btn" data-review-user="${user}" data-decision="approved">Approve</button>
                <button class="action-btn delete" data-review-user="${user}" data-decision="rejected">Reject</button>
            `;
        }

        return `
            <tr>
                <td><strong>${user}</strong></td>
                <td>${escapeHTML(account.penName || "—")}</td>
                <td class="author-bio-cell">${escapeHTML(account.authorBio || "—")}</td>
                <td>${escapeHTML(account.authorAppliedAt || account.createdAt || "—")}</td>
                <td><span class="status ${statusClass}">${statusLabel}</span></td>
                <td><div class="admin-actions">${actions}</div></td>
            </tr>
        `;
    }).join("");
}

function reviewAuthorApplication(username, decision) {
    if (!isLibrarianOrAdmin(currentUser)) return;

    const accounts = getSavedAccounts();
    const account = accounts.find(item => sameUser(item.username, username));
    if (!account) return;

    if (
        decision === "rejected" &&
        account.authorStatus === "approved" &&
        !confirm(`Remove author access from ${account.username}? Their published books stay in the library.`)
    ) {
        return;
    }

    account.authorStatus = decision;
    account.authorNoticeSeen = false;

    saveAccounts(accounts);
    renderAll();
}

function checkAuthorNotice() {
    if (!currentUser) return;

    const accounts = getSavedAccounts();
    const account = accounts.find(item => sameUser(item.username, currentUser));

    if (!account || account.authorNoticeSeen !== false) return;

    if (account.authorStatus === "approved") {
        account.authorNoticeSeen = true;
        saveAccounts(accounts);
        applyRoleVisibility();
        refreshRoleBadge();
        alert("🎉 Your author application was approved! Taking you to My Books so you can upload.");
        renderAll();
        showPage("myBooks");
        return;
    } else if (account.authorStatus === "rejected") {
        alert("Your author access was not approved. You can update your details in Settings and apply again.");
    } else {
        return;
    }

    account.authorNoticeSeen = true;
    saveAccounts(accounts);
    renderAll();
}

function migrateUsernameData(oldName, newName) {
    books.forEach(book => {
        if (book.uploadedBy && sameUser(book.uploadedBy, oldName)) book.uploadedBy = newName;
    });

    borrows.forEach(borrow => {
        if (sameUser(borrow.username, oldName)) borrow.username = newName;
    });

    loadChats();
    const oldKey = chatKey(oldName);
    const newKey = chatKey(newName);

    if (chats[oldKey]) {
        chats[newKey] = { ...chats[oldKey], username: newName };
        delete chats[oldKey];
        saveChats();
    }

    saveLibraryData();
}

const MAX_EXTRA_PICS = 3;
let pendingCover = "";
let pendingGallery = [];

function tryNextCoverFormat(img) {
    const formats = ["png", "jpeg", "webp"];
    const src = img.getAttribute("src") || "";
    const tried = Number(img.dataset.tried || 0);

    if (/^images\//i.test(src) && tried < formats.length) {
        img.dataset.tried = tried + 1;
        img.src = src.replace(/\.[a-z0-9]+$/i, "") + "." + formats[tried];
        return;
    }

    img.parentElement?.classList.remove("has-cover");
    img.remove();
}

function hasRealPicture(src) {
    return typeof src === "string" && src.length > 4 && !/no-cover\.jpg$/i.test(src);
}

function fileToCompressedDataURL(file, maxSide = 700, quality = 0.72) {
    return new Promise((resolve, reject) => {
        if (!file.type || !file.type.startsWith("image/")) {
            reject(new Error("Please choose an image file (JPG, PNG or WEBP)."));
            return;
        }

        if (file.size > 8 * 1024 * 1024) {
            reject(new Error("That image is too large. Please choose one under 8 MB."));
            return;
        }

        const reader = new FileReader();

        reader.onerror = () => reject(new Error("Could not read that image."));

        reader.onload = () => {
            const image = new Image();

            image.onerror = () => reject(new Error("That image could not be opened."));

            image.onload = () => {
                const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
                const width = Math.max(1, Math.round(image.width * scale));
                const height = Math.max(1, Math.round(image.height * scale));

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");
                context.fillStyle = "#ffffff";
                context.fillRect(0, 0, width, height);
                context.drawImage(image, 0, 0, width, height);

                resolve(canvas.toDataURL("image/jpeg", quality));
            };

            image.src = reader.result;
        };

        reader.readAsDataURL(file);
    });
}

function renderUploadPreviews() {
    const cover = document.getElementById("coverPreview");
    const gallery = document.getElementById("galleryPreview");

    if (cover) {
        cover.innerHTML = pendingCover
            ? `<div class="pic-thumb"><img src="${pendingCover}" alt="Cover preview"><button type="button" onclick="removeCoverPic()" title="Remove">×</button></div>`
            : '<span class="pic-empty">No cover picture yet</span>';
    }

    if (gallery) {
        gallery.innerHTML = pendingGallery.length
            ? pendingGallery.map((src, index) =>
                `<div class="pic-thumb"><img src="${src}" alt="Extra picture ${index + 1}"><button type="button" onclick="removeGalleryPic(${index})" title="Remove">×</button></div>`
            ).join("")
            : '<span class="pic-empty">No extra pictures</span>';
    }
}

function removeCoverPic() {
    pendingCover = "";
    renderUploadPreviews();
}

function removeGalleryPic(index) {
    pendingGallery.splice(index, 1);
    renderUploadPreviews();
}

async function handleCoverSelect(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    const errorElement = document.getElementById("bookUploadError");

    if (!file) return;
    if (errorElement) errorElement.textContent = "";

    try {
        pendingCover = await fileToCompressedDataURL(file, 640, 0.72);
    } catch (error) {
        if (errorElement) errorElement.textContent = error.message;
    }

    input.value = "";
    renderUploadPreviews();
}

async function handleGallerySelect(event) {
    const input = event.target;
    const files = Array.from(input.files || []);
    const errorElement = document.getElementById("bookUploadError");

    if (!files.length) return;
    if (errorElement) errorElement.textContent = "";

    for (const file of files) {
        if (pendingGallery.length >= MAX_EXTRA_PICS) {
            if (errorElement) errorElement.textContent = `You can add up to ${MAX_EXTRA_PICS} extra pictures.`;
            break;
        }

        try {
            pendingGallery.push(await fileToCompressedDataURL(file, 800, 0.7));
        } catch (error) {
            if (errorElement) errorElement.textContent = error.message;
        }
    }

    input.value = "";
    renderUploadPreviews();
}

function generateBookId() {
    let id;

    do {
        id = `BK-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 36).toString(36).toUpperCase()}`;
    } while (books.some(book => book.id === id));

    return id;
}

function handleBookUpload(event) {
    event.preventDefault();

    const errorElement = document.getElementById("bookUploadError");
    const fail = message => {
        if (errorElement) errorElement.textContent = message;
    };

    fail("");

    if (!isApprovedAuthor(currentUser)) {
        fail("Only approved authors can upload books.");
        return;
    }

    const account = getCurrentAccount();
    const read = id => (document.getElementById(id)?.value || "").trim();

    const title = read("uploadTitle");
    const category = read("uploadCategory");
    const price = Number(read("uploadPrice"));
    const copies = parseInt(read("uploadCopies"), 10);
    const year = parseInt(read("uploadYear"), 10) || new Date().getFullYear();
    const edition = read("uploadEdition") || "1st";
    const condition = read("uploadCondition") || "Good";
    const shelf = read("uploadShelf") || "Author Shelf";
    const description = read("uploadDescription");

    if (title.length < 2) return fail("Please enter the book title.");
    if (!category) return fail("Please enter a category.");
    if (!Number.isFinite(price) || price < 0) return fail("Please enter a valid price.");
    if (!Number.isInteger(copies) || copies < 1 || copies > 99) return fail("Copies must be between 1 and 99.");
    if (description.length < 10) return fail("Please write a synopsis (at least 10 characters).");
    if (!pendingCover) return fail("Please add a cover picture.");

    const authorName = account.penName || account.username;

    const duplicate = books.some(
        book => book.uploadedBy && sameUser(book.uploadedBy, currentUser) &&
            String(book.title).toLowerCase() === title.toLowerCase()
    );

    if (duplicate) return fail("You already published a book with that title.");

    const book = {
        id: generateBookId(),
        title,
        author: authorName,
        category,
        price,
        year,
        edition,
        copies,
        available: copies,
        shelf,
        condition,
        description,
        rating: 0,
        ratingCount: 0,
        latest: today(),
        image: pendingCover,
        gallery: [...pendingGallery],
        isPremium: false,
        uploadedBy: account.username,
        uploadedOn: today()
    };

    books.push(book);

    try {
        localStorage.setItem(STORAGE_KEYS.books, JSON.stringify(books));
    } catch (error) {
        books.pop();
        fail("Your browser storage is full. Try smaller pictures, remove an old book, or use fewer extra pictures.");
        return;
    }

    document.getElementById("bookUploadForm")?.reset();
    pendingCover = "";
    pendingGallery = [];
    renderUploadPreviews();

    addNotification("New Book Published", `${authorName} published "${title}".`);
    saveLibraryData();
    renderAll();

    alert(`"${title}" is now live in the library!`);
}

function renderMyBooksPage() {
    const list = document.getElementById("authorBooksList");
    if (!list) return;

    const datalist = document.getElementById("uploadCategoryList");

    if (datalist) {
        datalist.innerHTML = [...new Set(books.map(book => book.category).filter(Boolean))]
            .sort()
            .map(category => `<option value="${escapeHTML(category)}"></option>`)
            .join("");
    }

    const mine = books.filter(book => book.uploadedBy && sameUser(book.uploadedBy, currentUser));

    if (!mine.length) {
        list.innerHTML = '<p class="empty">You haven\'t published any books yet.</p>';
        return;
    }

    list.innerHTML = mine.map(book => {
        const pictureCount = (hasRealPicture(book.image) ? 1 : 0) + (Array.isArray(book.gallery) ? book.gallery.length : 0);

        return `
            <div class="author-book-row">
                <div class="author-book-thumb">${hasRealPicture(book.image) ? `<img src="${escapeHTML(book.image)}" alt="">` : "📖"}</div>
                <div class="author-book-info">
                    <strong>${escapeHTML(book.title)}</strong>
                    <span>${escapeHTML(book.category || "General")} · ${formatCurrency(book.price)} · ${Number(book.copies) || 0} copies · ${pictureCount} picture${pictureCount === 1 ? "" : "s"}</span>
                </div>
                <button class="action-btn" onclick="viewBook('${escapeHTML(book.id)}')">View</button>
                <button class="action-btn delete" onclick="deleteBook('${escapeHTML(book.id)}')">Delete</button>
            </div>
        `;
    }).join("");
}

function swapDetailPic(element) {
    const main = document.getElementById("detailMainPic");
    if (!main) return;

    main.src = element.src;

    document.querySelectorAll(".detail-thumb").forEach(thumb => {
        thumb.classList.toggle("active", thumb === element);
    });
}

const FRIENDS_KEY = "libraryFriends";
const DMS_KEY = "libraryDMs";

let socialData = { friends: {}, requests: [] };
let dmData = {};
let activeDmPeer = null;
let lastDmSig = "";

function loadSocial() {
    const saved = readJSON(FRIENDS_KEY, null);
    if (saved && typeof saved === "object") {
        socialData.friends = saved.friends && typeof saved.friends === "object" ? saved.friends : {};
        socialData.requests = Array.isArray(saved.requests) ? saved.requests : [];
    } else {
        socialData = { friends: {}, requests: [] };
    }
}

function saveSocial() {
    try {
        localStorage.setItem(FRIENDS_KEY, JSON.stringify(socialData));
    } catch (error) {
        console.warn("Could not save friends:", error);
    }
}

function loadDMs() {
    const saved = readJSON(DMS_KEY, {});
    dmData = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
}

function saveDMs() {
    try {
        localStorage.setItem(DMS_KEY, JSON.stringify(dmData));
    } catch (error) {
        console.warn("Could not save DMs:", error);
    }
}

function dmPairKey(a, b) {
    return [String(a || "").toLowerCase(), String(b || "").toLowerCase()].sort().join("::");
}

function getMyFriends() {
    if (!currentUser) return [];
    const key = String(currentUser).toLowerCase();
    const list = socialData.friends[key];
    return Array.isArray(list) ? list : [];
}

function setMyFriends(list) {
    if (!currentUser) return;
    const key = String(currentUser).toLowerCase();
    socialData.friends[key] = list;
}

function areFriends(a, b) {
    const ka = String(a || "").toLowerCase();
    const kb = String(b || "").toLowerCase();
    const list = socialData.friends[ka];
    return Array.isArray(list) && list.some(name => sameUser(name, kb));
}

function sendFriendRequest() {
    const input = document.getElementById("friendUsernameInput");
    const errorElement = document.getElementById("friendRequestError");
    const targetName = (input?.value || "").trim();

    if (errorElement) errorElement.textContent = "";

    if (!currentUser) return;
    if (!targetName) {
        if (errorElement) errorElement.textContent = "Enter a username.";
        return;
    }
    if (sameUser(targetName, currentUser)) {
        if (errorElement) errorElement.textContent = "You can't add yourself.";
        return;
    }

    loadSocial();

    const accounts = getSavedAccounts();
    const exists = accounts.some(a => sameUser(a.username, targetName) && !a.banned);

    if (!exists) {
        if (errorElement) errorElement.textContent = "That username was not found.";
        return;
    }

    if (areFriends(currentUser, targetName)) {
        if (errorElement) errorElement.textContent = "You're already friends.";
        return;
    }

    const pending = socialData.requests.find(
        r => r.status === "pending" &&
            ((sameUser(r.from, currentUser) && sameUser(r.to, targetName)) ||
             (sameUser(r.from, targetName) && sameUser(r.to, currentUser)))
    );

    if (pending) {
        if (errorElement) errorElement.textContent = "A request is already pending with this user.";
        return;
    }

    const official = builtIn
        ? targetName.toLowerCase()
        : (accounts.find(a => sameUser(a.username, targetName))?.username || targetName);

    socialData.requests.push({
        id: `fr-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        from: currentUser,
        to: official,
        status: "pending",
        createdAt: Date.now()
    });

    saveSocial();
    if (input) input.value = "";
    if (errorElement) errorElement.textContent = "";
    addNotification("Friend request sent", `Request sent to ${official}.`);
    renderMessagesPage(true);
}

function respondFriendRequest(requestId, accept) {
    loadSocial();
    const req = socialData.requests.find(r => r.id === requestId);
    if (!req || req.status !== "pending") return;
    if (!sameUser(req.to, currentUser)) return;

    req.status = accept ? "accepted" : "declined";

    if (accept) {
        const fromKey = String(req.from).toLowerCase();
        const toKey = String(req.to).toLowerCase();
        if (!Array.isArray(socialData.friends[fromKey])) socialData.friends[fromKey] = [];
        if (!Array.isArray(socialData.friends[toKey])) socialData.friends[toKey] = [];
        if (!socialData.friends[fromKey].some(n => sameUser(n, req.to))) socialData.friends[fromKey].push(req.to);
        if (!socialData.friends[toKey].some(n => sameUser(n, req.from))) socialData.friends[toKey].push(req.from);
        addNotification("New friend", `You and ${req.from} are now friends. Start chatting in Messages!`);
    }

    saveSocial();
    renderMessagesPage(true);
}

function removeFriend(username) {
    if (!currentUser || !confirm(`Remove ${username} from your friends?`)) return;
    loadSocial();
    const myKey = String(currentUser).toLowerCase();
    const theirKey = String(username).toLowerCase();
    socialData.friends[myKey] = (socialData.friends[myKey] || []).filter(n => !sameUser(n, username));
    socialData.friends[theirKey] = (socialData.friends[theirKey] || []).filter(n => !sameUser(n, currentUser));
    saveSocial();
    if (activeDmPeer && sameUser(activeDmPeer, username)) activeDmPeer = null;
    renderMessagesPage(true);
}

function getDmThread(peer, create = false) {
    if (!currentUser || !peer) return null;
    const key = dmPairKey(currentUser, peer);
    if (!dmData[key] && create) {
        dmData[key] = {
            users: [currentUser, peer],
            messages: [],
            unread: {},
            updatedAt: Date.now()
        };
    }
    return dmData[key] || null;
}

function pushDmMessage(peer, text) {
    loadDMs();
    const thread = getDmThread(peer, true);
    if (!thread) return;

    thread.messages.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        from: currentUser,
        text,
        ts: Date.now()
    });
    if (thread.messages.length > 200) thread.messages = thread.messages.slice(-200);

    const peerKey = String(peer).toLowerCase();
    thread.unread[peerKey] = (thread.unread[peerKey] || 0) + 1;
    thread.updatedAt = Date.now();
    saveDMs();
}

function markDmRead(peer) {
    loadDMs();
    const thread = getDmThread(peer);
    if (!thread || !currentUser) return;
    const myKey = String(currentUser).toLowerCase();
    thread.unread[myKey] = 0;
    saveDMs();
}

function openDmThread(peer) {
    if (!areFriends(currentUser, peer) && !isLibrarianOrAdmin(currentUser)) {
        alert("You can only chat with friends. Send them a friend request first.");
        return;
    }
    activeDmPeer = peer;
    markDmRead(peer);
    renderMessagesPage(true);
    document.getElementById("dmInput")?.focus();
}

function sendDmMessage(event) {
    event.preventDefault();
    const input = document.getElementById("dmInput");
    const text = (input?.value || "").trim();
    if (!text || !activeDmPeer || !currentUser) return;
    if (!areFriends(currentUser, activeDmPeer)) {
        alert("You're no longer friends with this user.");
        return;
    }
    pushDmMessage(activeDmPeer, text);
    if (input) input.value = "";
    renderMessagesPage(true);
}

function getMyDmUnreadTotal() {
    if (!currentUser) return 0;
    loadDMs();
    const myKey = String(currentUser).toLowerCase();
    return Object.values(dmData).reduce((sum, thread) => sum + (thread.unread?.[myKey] || 0), 0);
}

function renderMessagesPage(force = false) {
    if (!currentUser) return;

    loadSocial();
    loadDMs();

    const badge = document.getElementById("messagesNavBadge");
    const pendingForMe = socialData.requests.filter(r => r.status === "pending" && sameUser(r.to, currentUser)).length;
    const unread = getMyDmUnreadTotal() + pendingForMe;
    if (badge) {
        badge.textContent = unread;
        badge.classList.toggle("hidden", unread === 0);
    }

    const requestsEl = document.getElementById("friendRequestsList");
    const friendsEl = document.getElementById("friendsList");
    const threadsEl = document.getElementById("dmThreadsList");
    if (!friendsEl || !threadsEl) return;

    const incoming = socialData.requests.filter(r => r.status === "pending" && sameUser(r.to, currentUser));
    const outgoing = socialData.requests.filter(r => r.status === "pending" && sameUser(r.from, currentUser));

    if (requestsEl) {
        let html = "";
        if (incoming.length) {
            html += `<h4 class="messages-section-title">Incoming requests</h4>` +
                incoming.map(r => `
                    <div class="friend-request-row">
                        <strong>${escapeHTML(r.from)}</strong>
                        <div>
                            <button type="button" class="action-btn" data-fr-accept="${escapeHTML(r.id)}">Accept</button>
                            <button type="button" class="action-btn delete" data-fr-decline="${escapeHTML(r.id)}">Decline</button>
                        </div>
                    </div>
                `).join("");
        }
        if (outgoing.length) {
            html += `<h4 class="messages-section-title">Sent requests</h4>` +
                outgoing.map(r => `
                    <div class="friend-request-row">
                        <span>Waiting for <strong>${escapeHTML(r.to)}</strong></span>
                    </div>
                `).join("");
        }
        requestsEl.innerHTML = html;
    }

    const friends = getMyFriends();
    friendsEl.innerHTML = friends.length
        ? friends.map(name => `
            <button type="button" class="friend-item ${activeDmPeer && sameUser(activeDmPeer, name) ? "active" : ""}" data-open-dm="${escapeHTML(name)}">
                <span>👤 ${escapeHTML(name)}</span>
                <span class="friend-actions">
                    <span class="action-btn" data-open-dm="${escapeHTML(name)}" title="Chat">💬</span>
                    <span class="action-btn delete" data-remove-friend="${escapeHTML(name)}" title="Remove">×</span>
                </span>
            </button>
        `).join("")
        : '<p class="empty" style="padding:12px;">No friends yet. Add someone by username above.</p>';

    const myKey = String(currentUser).toLowerCase();
    const threads = Object.entries(dmData)
        .filter(([, t]) => Array.isArray(t.users) && t.users.some(u => sameUser(u, currentUser)) && (t.messages || []).length)
        .sort((a, b) => (b[1].updatedAt || 0) - (a[1].updatedAt || 0));

    threadsEl.innerHTML = threads.length
        ? threads.map(([, t]) => {
            const peer = t.users.find(u => !sameUser(u, currentUser)) || "?";
            const last = t.messages[t.messages.length - 1];
            const unreadCount = t.unread?.[myKey] || 0;
            return `
                <button type="button" class="support-item ${activeDmPeer && sameUser(activeDmPeer, peer) ? "active" : ""}" data-open-dm="${escapeHTML(peer)}">
                    <span class="support-item-top">
                        <strong>${escapeHTML(peer)}</strong>
                        ${unreadCount ? `<span class="nav-badge">${unreadCount}</span>` : ""}
                    </span>
                    <span class="support-snippet">${escapeHTML(String(last?.text || "").slice(0, 50))}</span>
                    <time>${last ? formatChatTime(last.ts) : ""}</time>
                </button>
            `;
        }).join("")
        : '<p class="empty" style="padding:12px;">No conversations yet.</p>';

    const header = document.getElementById("dmThreadHeader");
    const messagesEl = document.getElementById("dmMessages");
    const form = document.getElementById("dmForm");

    if (!activeDmPeer) {
        if (header) header.textContent = "Select a friend to start chatting";
        if (messagesEl) messagesEl.innerHTML = '<p class="empty">Pick a friend on the left to message them.</p>';
        form?.classList.add("hidden");
        return;
    }

    if (!areFriends(currentUser, activeDmPeer)) {
        activeDmPeer = null;
        renderMessagesPage(true);
        return;
    }

    markDmRead(activeDmPeer);
    const thread = getDmThread(activeDmPeer, true);

    if (header) {
        header.innerHTML = `<strong>💬 ${escapeHTML(activeDmPeer)}</strong>
            <button type="button" class="action-btn delete" data-remove-friend="${escapeHTML(activeDmPeer)}">Unfriend</button>`;
    }

    if (messagesEl) {
        messagesEl.innerHTML = (thread?.messages || []).map(msg => {
            const mine = sameUser(msg.from, currentUser);
            return `
                <div class="chat-msg ${mine ? "mine" : "theirs"}">
                    <span class="chat-msg-label">${mine ? "You" : escapeHTML(msg.from)}</span>
                    <div class="chat-bubble">${escapeHTML(msg.text).replace(/\n/g, "<br>")}</div>
                    <time>${formatChatTime(msg.ts)}</time>
                </div>
            `;
        }).join("") || '<p class="empty">Say hello! This is the start of your chat.</p>';
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    form?.classList.remove("hidden");
}

const CHAT_KEY = "libraryChats";
const ADMIN_SEEN_KEY = "libraryAdminLastSeen";
const ADMIN_PREF_KEY = "libraryAdminChatStatus";
const ADMIN_ONLINE_WINDOW_MS = 30000;
const ADMIN_HEARTBEAT_MS = 10000;
const AWAY_NOTICE_GAP_MS = 5 * 60 * 1000;

const CHAT_QUICK_OPTIONS = [
    {
        id: "recommend",
        label: "Recommend a book",
        keywords: ["recommend", "recommendation", "suggest me", "suggest a book"],
        reply: "Tell me a topic, genre, author, or reading level and I can suggest books from the catalog."
    },
    {
        id: "browse",
        label: "Browse the catalog",
        keywords: ["browse books", "open catalog", "show catalog", "find a book"],
        reply: "Opening the book catalog."
    },
    {
        id: "draft",
        label: "Create a book draft",
        keywords: ["create a book", "write a book", "book draft", "new book idea"],
        reply: "I can help draft book details. An approved author can review and use the draft in My Books."
    },
    {
        id: "return",
        label: "My return wasn't accepted",
        keywords: ["return", "returned", "giving back", "give back"],
        reply: "I'm sorry about that! Open the Borrow page and check \"My Borrowed Books\". If the book is still listed, press Return again. A successful return moves it to your History as Returned and shows a confirmation.\n\nStill stuck? Choose \"Talk to a person\" and send the Book ID so the admin can check it when they're back."
    },
    {
        id: "borrow",
        label: "I can't borrow a book",
        keywords: ["borrow", "can't borrow", "cannot borrow", "unavailable"],
        reply: "You can borrow up to 3 books at a time, for 14 days, with a ₱10 borrow fee per book.\n\nA borrow can be blocked if you already have 3 books, the book has no available copies, you already borrowed that title, or it's a Premium book and you're not a Premium member."
    },
    {
        id: "premium",
        label: "Premium membership help",
        keywords: ["premium", "vip", "subscription", "upgrade", "cancel"],
        reply: "Premium is ₱99/month and unlocks all the exclusive Premium books.\n\nTo upgrade: Profile → ✨ Upgrade to Premium.\nTo cancel: Profile → Cancel Subscription."
    },
    {
        id: "checkout",
        label: "Problem with my cart or purchase",
        keywords: ["cart", "checkout", "buy", "purchase", "payment", "pay"],
        reply: "To buy a book, tap the 🛒 button on it, review your Cart, then press Checkout. If checkout says the cart is empty, add the book again. If you were charged wrongly, choose \"Talk to a person\" and tell us what you bought."
    },
    {
        id: "report",
        label: "How do I report a book?",
        keywords: ["report", "damaged", "wrong info", "inappropriate"],
        reply: "Tap the ⚑ Report button on the book card, type the reason, then press Submit Report. The library team will look into it."
    },
    {
        id: "password",
        label: "Password or account problem",
        keywords: ["password", "login", "log in", "account", "username", "banned"],
        reply: "You can change your password in Settings → Security (you'll need your current password). You can also change your username and email in Settings.\n\nForgot your password? Use “Forgot password?” on the sign-in page and follow the reset link sent to your email.\n\nIf you're locked out or the account was banned by mistake, choose “Talk to a person” and include your username."
    },
    {
        id: "author",
        label: "How do I become an author?",
        keywords: ["author", "publish", "upload", "write a book"],
        reply: "Go to Settings → Author Status and press Apply as Author (new members can also pick \"Apply as Author\" when signing up). Once an admin approves you, a 📤 My Books page appears in your menu where you can upload books and pictures."
    },
    {
        id: "contact",
        label: "Contact info",
        keywords: ["contact", "phone", "email", "number", "call"],
        reply: "📞 0912 629 0432\n📧 gigachinchin@gmail.com"
    },
    {
        id: "human",
        label: "Talk to a person",
        keywords: ["admin", "human", "person", "agent", "staff", "someone"],
        flagHuman: true,
        reply: "Okay! I've flagged your chat for the admin. Please type your message below with as many details as you can (like the Book ID or what happened). They'll reply here as soon as they're back."
    }
];

const ADMIN_CANNED_REPLIES = [
    "Hi! Thanks for reaching out. How can I help?",
    "Could you send me the Book ID and what happened?",
    "All fixed! Please check again and let me know. 😊",
    "Thanks for your patience, we're looking into it."
];

let chats = {};
let chatOpen = false;
let activeSupportUser = null;
let adminHeartbeatTimer = null;
let chatRefreshTimer = null;
let lastChatSig = "";
let lastSupportSig = "";

function loadChats() {
    const saved = readJSON(CHAT_KEY, {});
    chats = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
}

function saveChats() {
    try {
        localStorage.setItem(CHAT_KEY, JSON.stringify(chats));
    } catch (error) {
        console.warn("Could not save chat:", error);
    }
}

function chatKey(username) {
    return String(username || "").toLowerCase();
}

function getChat(username, create = false) {
    const key = chatKey(username);

    if (!chats[key] && create) {
        chats[key] = { username, messages: [], adminUnread: 0, userUnread: 0, needsHuman: false, updatedAt: Date.now() };
    }

    return chats[key] || null;
}

function pushChatMessage(username, from, text, extra = {}) {
    loadChats();

    const chat = getChat(username, true);

    chat.messages.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        from,
        text,
        ts: Date.now(),
        ...extra
    });

    if (chat.messages.length > 200) chat.messages = chat.messages.slice(-200);

    if (from === "user") chat.adminUnread = (chat.adminUnread || 0) + 1;
    if (from === "admin") chat.userUnread = (chat.userUnread || 0) + 1;
    if (from === "bot" && !(chatOpen && sameUser(currentUser, username))) {
        chat.userUnread = (chat.userUnread || 0) + 1;
    }

    chat.updatedAt = Date.now();
    saveChats();
}

function markChatRead(username, role) {
    loadChats();

    const chat = getChat(username);
    if (!chat) return;

    if (role === "user") chat.userUnread = 0;
    else chat.adminUnread = 0;

    saveChats();
}

function flagChatForAdmin(username) {
    loadChats();

    const chat = getChat(username, true);
    chat.needsHuman = true;
    chat.updatedAt = Date.now();

    saveChats();
}

function formatChatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function isAdminOnline() {
    const seen = Number(localStorage.getItem(ADMIN_SEEN_KEY) || 0);
    return Date.now() - seen < ADMIN_ONLINE_WINDOW_MS;
}

function getAdminPref() {
    return localStorage.getItem(ADMIN_PREF_KEY) !== "away";
}

function beatAdmin() {
    if (currentUser && isLibrarianOrAdmin(currentUser) && getAdminPref()) {
        try {
            localStorage.setItem(ADMIN_SEEN_KEY, String(Date.now()));
        } catch (error) {}
    }
}

function startAdminHeartbeat() {
    clearInterval(adminHeartbeatTimer);
    beatAdmin();
    adminHeartbeatTimer = setInterval(beatAdmin, ADMIN_HEARTBEAT_MS);
}

function setAdminOnline(isOnline) {
    localStorage.setItem(ADMIN_PREF_KEY, isOnline ? "online" : "away");

    if (isOnline) {
        beatAdmin();
    } else {
        localStorage.setItem(ADMIN_SEEN_KEY, "0");
    }

    renderAdminStatus();
}

function renderAdminStatus() {
    const label = document.getElementById("adminStatusLabel");
    const toggle = document.getElementById("adminOnlineToggle");
    const online = getAdminPref();

    if (label) label.textContent = online ? "🟢 Online" : "⚫ Away (auto-help on)";
    if (toggle) toggle.checked = online;
}

function startChatSession() {
    loadChats();

    clearInterval(chatRefreshTimer);
    clearInterval(adminHeartbeatTimer);

    chatOpen = false;
    activeSupportUser = null;
    lastChatSig = "";
    lastSupportSig = "";

    if (isLibrarianOrAdmin(currentUser)) {
        startAdminHeartbeat();
        renderAdminStatus();
    }

    chatRefreshTimer = setInterval(refreshChatViews, 5000);
}

function endChatSession() {
    clearInterval(chatRefreshTimer);
    clearInterval(adminHeartbeatTimer);
    chatRefreshTimer = null;
    adminHeartbeatTimer = null;

    if (currentUser && isLibrarianOrAdmin(currentUser)) {
        try {
            localStorage.setItem(ADMIN_SEEN_KEY, "0");
        } catch (error) {}
    }

    chatOpen = false;
    activeSupportUser = null;

    document.getElementById("chatWidget")?.classList.add("hidden");
    document.getElementById("chatFab")?.classList.add("hidden");
}

function refreshChatViews() {
    if (!currentUser) return;

    loadChats();
    renderChatWidget();
    renderSupportPage();
}

function chatBubbleHTML(message, viewer) {
    const mine = message.from === viewer;

    let label;
    if (message.from === "bot") label = "🤖 Library AI Helper";
    else if (message.from === "admin") label = viewer === "admin" ? "You" : "🛡️ Support Team";
    else label = viewer === "user" ? "You" : "Member";

    const suggestedBooks = viewer === "user" && Array.isArray(message.suggestedBooks)
        ? message.suggestedBooks.map(book => `
            <button type="button" class="chat-chip" data-ai-open-book="${escapeHTML(book.id)}">
                Open ${escapeHTML(book.title || book.id)}
            </button>
        `).join("")
        : "";
    const selectedBook = viewer === "user" && message.selectedBook
        ? `<button type="button" class="chat-chip" data-ai-open-book="${escapeHTML(message.selectedBook.id)}">Open ${escapeHTML(message.selectedBook.title || "book")}</button>`
        : "";
    const navigation = viewer === "user" && ["books", "search", "myBooks"].includes(message.aiNavigation)
        ? `<button type="button" class="chat-chip" data-ai-navigate="${escapeHTML(message.aiNavigation)}">Go to ${message.aiNavigation === "myBooks" ? "My Books" : message.aiNavigation === "search" ? "Search" : "Book Catalog"}</button>`
        : "";
    const draft = viewer === "user" && message.bookDraft
        ? '<button type="button" class="chat-chip" data-ai-use-draft>Review this draft in My Books</button>'
        : "";
    const actions = suggestedBooks || selectedBook || navigation || draft
        ? `<div class="chat-options">${suggestedBooks}${selectedBook}${navigation}${draft}</div>`
        : "";

    return `
        <div class="chat-msg ${mine ? "mine" : "theirs"} from-${message.from}" data-message-id="${escapeHTML(message.id || "")}">
            <span class="chat-msg-label">${label}</span>
            <div class="chat-bubble">${escapeHTML(message.text).replace(/\n/g, "<br>")}</div>
            ${actions}
            <time>${formatChatTime(message.ts)}</time>
        </div>
    `;
}

function openChatWidget() {
    chatOpen = true;
    renderChatWidget(true);
    document.getElementById("chatInput")?.focus();
}

function closeChatWidget() {
    chatOpen = false;
    renderChatWidget(true);
}

function useAiBookDraft(message) {
    if (!isApprovedAuthor(currentUser) || !message?.bookDraft) {
        showToast("Only approved authors can use book drafts. Apply in Settings → Author Status.");
        return;
    }

    const draft = message.bookDraft;
    showPage("myBooks");
    const fields = {
        uploadTitle: String(draft.title || "").slice(0, 100),
        uploadCategory: String(draft.category || "").slice(0, 40),
        uploadYear: String(Math.min(2100, Math.max(1000, Number(draft.year) || new Date().getFullYear()))),
        uploadEdition: String(draft.edition || "1st").slice(0, 20),
        uploadPrice: String(Math.max(0, Number(draft.price) || 0)),
        uploadCopies: String(Math.min(99, Math.max(1, Number(draft.copies) || 1))),
        uploadDescription: String(draft.description || "").slice(0, 800)
    };

    Object.entries(fields).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) input.value = value;
    });

    closeChatWidget();
    document.getElementById("bookUploadForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById("uploadTitle")?.focus({ preventScroll: true });
    showToast("Draft filled in. Review the details, add a cover, then publish when ready.");
}

function handleAiChatAction(event) {
    const openBookButton = event.target.closest("[data-ai-open-book]");
    if (openBookButton) {
        const book = books.find(item => item.id === openBookButton.dataset.aiOpenBook);
        if (!book) {
            showToast("That book is no longer in the catalog.");
            return;
        }
        closeChatWidget();
        showPage("books");
        viewBook(book.id);
        return;
    }

    const navigationButton = event.target.closest("[data-ai-navigate]");
    if (navigationButton) {
        const page = navigationButton.dataset.aiNavigate;
        if (["books", "search", "myBooks"].includes(page)) {
            closeChatWidget();
            showPage(page);
        }
        return;
    }

    const draftButton = event.target.closest("[data-ai-use-draft]");
    if (draftButton) {
        const chat = getChat(currentUser);
        const message = chat?.messages.find(item => item.id === draftButton.closest(".chat-msg")?.dataset.messageId);
        useAiBookDraft(message);
    }
}

function renderChatWidget(force = false) {
    const fab = document.getElementById("chatFab");
    const widget = document.getElementById("chatWidget");
    if (!fab || !widget) return;

    const isMember = !!currentUser && !isLibrarianOrAdmin(currentUser);

    fab.classList.toggle("hidden", !isMember);

    if (!isMember) {
        widget.classList.add("hidden");
        chatOpen = false;
        return;
    }

    if (chatOpen && (getChat(currentUser)?.userUnread || 0) > 0) {
        markChatRead(currentUser, "user");
    }

    const chat = getChat(currentUser);
    const online = isAdminOnline();
    const unread = chatOpen ? 0 : (chat?.userUnread || 0);

    const fabBadge = document.getElementById("chatFabBadge");
    if (fabBadge) {
        fabBadge.textContent = unread;
        fabBadge.classList.toggle("hidden", unread === 0);
    }

    widget.classList.toggle("hidden", !chatOpen);
    fab.classList.toggle("chat-fab-open", chatOpen);

    const presence = document.getElementById("chatPresence");
    if (presence) {
        presence.textContent = online ? "🟢 Admin is online" : "🟡 Admin is away · quick help available";
        presence.className = `chat-presence ${online ? "online" : "away"}`;
    }

    if (!chatOpen) return;

    const messages = chat?.messages || [];
    const last = messages[messages.length - 1];
    const signature = JSON.stringify([messages.length, last?.id, online, currentUser]);

    if (!force && signature === lastChatSig) return;
    lastChatSig = signature;

    const greeting = online
        ? `Hi ${escapeHTML(currentUser)}! 👋 I'm your AI library helper, and the support team is online too. Ask for book recommendations, find a title, or get help with library services.`
        : `Hi ${escapeHTML(currentUser)}! 👋 I'm your AI library helper. Ask for book recommendations, find a title, navigate the catalog, or get help with library services.`;

    const messagesElement = document.getElementById("chatMessages");

    if (messagesElement) {
        messagesElement.innerHTML = `
            <div class="chat-msg theirs from-bot">
                <span class="chat-msg-label">🤖 Library Assistant</span>
                <div class="chat-bubble">${greeting}</div>
            </div>
            ${messages.map(message => chatBubbleHTML(message, "user")).join("")}
        `;
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }

    const optionsElement = document.getElementById("chatOptions");

    if (optionsElement) {
        optionsElement.classList.remove("hidden");
        optionsElement.innerHTML =
            `<span class="chat-options-title">Try asking</span>` +
            CHAT_QUICK_OPTIONS.map(option =>
                `<button type="button" class="chat-chip" data-option="${option.id}">${escapeHTML(option.label)}</button>`
            ).join("");
    }
}

function matchQuickOption(text) {
    const lower = String(text || "").toLowerCase();

    const ordered = [...CHAT_QUICK_OPTIONS].sort((a, b) => (b.flagHuman ? 1 : 0) - (a.flagHuman ? 1 : 0));

    return ordered.find(option => option.keywords.some(keyword => lower.includes(keyword))) || null;
}

function buildLocalBookAssistantReply(text, option) {
    const query = String(text || "").toLowerCase();
    const requestedDraft = /\b(create|write|draft|invent)\b.{0,40}\b(book|story|novel)\b/i.test(query);
    if (requestedDraft && isApprovedAuthor(currentUser)) {
        const title = String(text || "")
            .replace(/\b(create|write|draft|invent|a|an|book|story|novel|about|called|titled|for me|please)\b/gi, " ")
            .replace(/[^\p{L}\p{N}\s'-]/gu, "")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, 80) || "Untitled Book Idea";
        const concept = title === "Untitled Book Idea" ? "a new topic of your choice" : title;
        return {
            reply: `Here's a starter draft for “${title}”. Review and edit the details, add a cover, then publish it yourself.`,
            draft: {
                title,
                category: "Fiction",
                year: new Date().getFullYear(),
                edition: "1st",
                price: 250,
                copies: 3,
                description: `An original book concept exploring ${concept}. Develop the characters, setting, and central ideas to make this story your own.`
            }
        };
    }

    if (requestedDraft && !isApprovedAuthor(currentUser)) {
        return {
            reply: "I can help recommend books and browse the catalog. To create a book for publication, apply as an author in Settings → Author Status and wait for approval."
        };
    }

    if (/\b(browse|open|show|go to|navigate)\b.{0,40}\b(catalog|books|book list)\b/i.test(query) ||
        option?.id === "browse") {
        return { reply: "Opening the book catalog.", navigation: "books" };
    }

    const matches = books.map(book => {
        const searchable = `${book.title} ${book.author} ${book.category} ${book.description}`.toLowerCase();
        const words = query.split(/[^\p{L}\p{N}]+/u).filter(word =>
            word.length > 2 && !["recommend", "recommendation", "suggest", "book", "books", "please", "show", "find", "me", "about"].includes(word)
        );
        const score = words.reduce((total, word) => total + (searchable.includes(word) ? 1 : 0), 0);
        return { book, score };
    }).filter(item => item.score > 0);

    if (/\b(find|open|details|where is|navigate to)\b/i.test(query)) {
        const found = books.find(book =>
            query.includes(book.id.toLowerCase()) ||
            query.includes(String(book.title).toLowerCase())
        );
        if (found) {
            return { reply: `I found “${found.title}” by ${found.author}. Open its details to see availability and more.`, selectedBook: { id: found.id, title: found.title } };
        }
    }

    if (/\b(recommend|recommendation|suggest|similar|like)\b/i.test(query) || option?.id === "recommend") {
        const recommendations = (matches.length ? matches : books.map(book => ({ book, score: 0 })))
            .sort((a, b) => b.score - a.score || Number(b.book.rating || 0) - Number(a.book.rating || 0))
            .slice(0, 4)
            .map(({ book }) => ({ id: book.id, title: book.title, author: book.author }));
        return recommendations.length
            ? { reply: "Here are a few books from the catalog you might enjoy:", suggestedBooks: recommendations }
            : { reply: "I couldn't find books to recommend yet. Try another topic or browse the catalog.", navigation: "books" };
    }

    if (matches.length) {
        const found = matches.sort((a, b) => b.score - a.score || Number(b.book.rating || 0) - Number(a.book.rating || 0))[0].book;
        return { reply: `I found “${found.title}” by ${found.author} in ${found.category}. Open its details to learn more.`, selectedBook: { id: found.id, title: found.title } };
    }

    if (option) return { reply: option.reply };
    return {
        reply: "I can recommend books by topic, find a title or author, open the catalog, and help approved authors prepare a book draft. What would you like to do?",
        navigation: "books"
    };
}

async function sendUserChatMessage(text, optionId = null) {
    const clean = String(text || "").trim();

    if (!clean || !currentUser || isLibrarianOrAdmin(currentUser)) return;

    const username = currentUser;
    const issueType = document.getElementById("supportIssueType")?.value || "";
    const ref = (document.getElementById("supportRefInput")?.value || "").trim();

    const issueLabels = {
        borrow: "Borrow / Return",
        order: "Cart & Purchase",
        premium: "Premium Membership",
        account: "Account / Password",
        author: "Author / Publish",
        book: "Book Info / Report",
        other: "Other"
    };

    let payload = clean;
    if (!optionId && (issueType || ref)) {
        const parts = [];
        if (issueType) parts.push(`[${issueLabels[issueType] || issueType}]`);
        if (ref) parts.push(`Ref: ${ref}`);
        payload = `${parts.join(" ")} ${clean}`;
    }

    pushChatMessage(username, "user", payload, {
        issueType: issueType || undefined,
        ref: ref || undefined
    });

    renderChatWidget(true);
    if (!isAdminOnline()) {
        await botReply(username, payload, optionId || issueType || null);
    }
}

async function botReply(username, text, optionId) {
    const option = optionId
        ? CHAT_QUICK_OPTIONS.find(item => item.id === optionId)
        : matchQuickOption(text);

    if (option?.flagHuman) {
        pushChatMessage(username, "bot", option.reply);
        flagChatForAdmin(username);
        if (sameUser(currentUser, username)) renderChatWidget(true);
        return;
    }

    try {
        const chat = getChat(username);
        const history = (chat?.messages || [])
            .slice(-8)
            .filter(message => message.from === "user" || message.from === "bot" || message.from === "admin")
            .map(message => ({
                role: message.from === "user" ? "user" : "assistant",
                content: String(message.text || "").slice(0, 500)
            }));

        const { data, error } = await window.librarySupabase.functions.invoke("library-ai", {
            body: { messages: history }
        });
        if (error) throw error;
        if (!data?.reply || typeof data.reply !== "string") {
            throw new Error("The AI helper returned an empty response.");
        }

        pushChatMessage(username, "bot", data.reply, {
            suggestedBooks: Array.isArray(data.books) ? data.books : [],
            selectedBook: data.selectedBook || null,
            aiNavigation: data.navigation || null,
            bookDraft: data.draft || null
        });
        if (sameUser(currentUser, username)) renderChatWidget(true);
        return;
    } catch (error) {
        console.error("Library AI request failed:", error);
        if (sameUser(currentUser, username)) {
            showToast("AI service is unavailable. Using the catalog helper instead.");
        }
    }

    const fallback = buildLocalBookAssistantReply(text, option);
    pushChatMessage(username, "bot", fallback.reply, {
        suggestedBooks: fallback.suggestedBooks || [],
        selectedBook: fallback.selectedBook || null,
        aiNavigation: fallback.navigation || null,
        bookDraft: fallback.draft || null
    });

    if (sameUser(currentUser, username)) renderChatWidget(true);
}

function getSupportThreads() {
    return Object.values(chats)
        .filter(chat => chat && Array.isArray(chat.messages) && chat.messages.length)
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

function renderSupportPage(force = false) {
    if (!currentUser || !isLibrarianOrAdmin(currentUser)) return;

    const threads = getSupportThreads();
    const totalUnread = threads.reduce((sum, chat) => sum + (chat.adminUnread || 0), 0);

    const navBadge = document.getElementById("supportNavBadge");
    if (navBadge) {
        navBadge.textContent = totalUnread;
        navBadge.classList.toggle("hidden", totalUnread === 0);
    }

    const list = document.getElementById("supportList");
    if (!list) return;

    const signature = JSON.stringify([
        activeSupportUser,
        threads.map(chat => [chat.username, chat.updatedAt, chat.adminUnread, chat.needsHuman, chat.messages.length])
    ]);

    if (!force && signature === lastSupportSig) return;
    lastSupportSig = signature;

    list.innerHTML = threads.length
        ? threads.map(chat => {
            const last = chat.messages[chat.messages.length - 1];
            const active = activeSupportUser && sameUser(activeSupportUser, chat.username);

            return `
                <button type="button" class="support-item ${active ? "active" : ""}" data-support-user="${escapeHTML(chat.username)}">
                    <span class="support-item-top">
                        <strong>${escapeHTML(chat.username)}</strong>
                        ${chat.adminUnread ? `<span class="nav-badge">${chat.adminUnread}</span>` : ""}
                    </span>
                    <span class="support-snippet">${chat.needsHuman ? "🔔 " : ""}${escapeHTML(String(last.text).slice(0, 60))}</span>
                    <time>${formatChatTime(last.ts)}</time>
                </button>
            `;
        }).join("")
        : '<p class="empty">No conversations yet. When a member messages support, it appears here.</p>';

    const header = document.getElementById("supportThreadHeader");
    const messagesElement = document.getElementById("supportMessages");
    const form = document.getElementById("supportForm");
    const canned = document.getElementById("supportCanned");

    const chat = activeSupportUser ? getChat(activeSupportUser) : null;

    if (!chat) {
        if (header) header.textContent = "Select a conversation";
        if (messagesElement) messagesElement.innerHTML = '<p class="empty">Pick a member on the left to read and reply.</p>';
        form?.classList.add("hidden");
        canned?.classList.add("hidden");
        return;
    }

    if (header) {
        header.innerHTML = `
            <strong>${escapeHTML(chat.username)}</strong>
            ${chat.needsHuman ? '<span class="status borrowed">Wants a person</span>' : ""}
            <button type="button" class="action-btn delete" data-clear-chat="${escapeHTML(chat.username)}">Clear chat</button>
        `;
    }

    if (messagesElement) {
        messagesElement.innerHTML = chat.messages.map(message => chatBubbleHTML(message, "admin")).join("");
        messagesElement.scrollTop = messagesElement.scrollHeight;
    }

    form?.classList.remove("hidden");

    if (canned) {
        canned.classList.remove("hidden");
        canned.innerHTML = ADMIN_CANNED_REPLIES.map((text, index) =>
            `<button type="button" class="chat-chip" data-canned="${index}">${escapeHTML(text)}</button>`
        ).join("");
    }
}

function openSupportThread(username) {
    activeSupportUser = username;
    markChatRead(username, "admin");
    renderSupportPage(true);
    document.getElementById("supportInput")?.focus();
}

function sendAdminReply(event) {
    event.preventDefault();

    const input = document.getElementById("supportInput");
    const text = (input?.value || "").trim();

    if (!text || !activeSupportUser || !isLibrarianOrAdmin(currentUser)) return;

    pushChatMessage(activeSupportUser, "admin", text, { by: currentUser });

    loadChats();
    const chat = getChat(activeSupportUser);

    if (chat) {
        chat.needsHuman = false;
        chat.adminUnread = 0;
        saveChats();
    }

    if (input) input.value = "";
    renderSupportPage(true);
}

function clearSupportChat(username) {
    if (!isLibrarianOrAdmin(currentUser)) return;
    if (!confirm(`Delete the whole conversation with ${username}?`)) return;

    loadChats();
    delete chats[chatKey(username)];
    saveChats();

    if (activeSupportUser && sameUser(activeSupportUser, username)) activeSupportUser = null;

    renderSupportPage(true);
}

function initNewFeatureListeners() {
    document.getElementById("sideSettingsBtn")?.addEventListener("click", () => showPage("settings"));

    document.querySelectorAll('input[name="signupType"]').forEach(radio => {
        radio.addEventListener("change", updateSignupType);
    });
    updateSignupType();

    document.getElementById("uploadCover")?.addEventListener("change", handleCoverSelect);
    document.getElementById("uploadGallery")?.addEventListener("change", handleGallerySelect);
    document.getElementById("bookUploadForm")?.addEventListener("submit", handleBookUpload);
    renderUploadPreviews();

    document.getElementById("authorApplicationsTable")?.addEventListener("click", event => {
        const button = event.target.closest("[data-review-user]");
        if (button) reviewAuthorApplication(button.dataset.reviewUser, button.dataset.decision);
    });

    document.getElementById("chatFab")?.addEventListener("click", () => {
        if (chatOpen) closeChatWidget();
        else openChatWidget();
    });

    document.getElementById("chatClose")?.addEventListener("click", closeChatWidget);
    document.getElementById("chatMessages")?.addEventListener("click", handleAiChatAction);

    const sendChatMessageWithStatus = async (text, optionId = null) => {
        const input = document.getElementById("chatInput");
        const sendButton = document.querySelector("#chatForm button[type='submit']");
        const typing = document.getElementById("aiTyping");

        if (input) input.disabled = true;
        if (sendButton) sendButton.disabled = true;
        typing?.classList.remove("hidden");

        try {
            await sendUserChatMessage(text, optionId);
        } finally {
            if (input) {
                input.disabled = false;
                input.focus();
            }
            if (sendButton) sendButton.disabled = false;
            typing?.classList.add("hidden");
        }
    };

    document.getElementById("chatForm")?.addEventListener("submit", async event => {
        event.preventDefault();
        const input = document.getElementById("chatInput");
        const text = input?.value || "";
        if (input) input.value = "";
        await sendChatMessageWithStatus(text);
    });

    document.getElementById("chatOptions")?.addEventListener("click", event => {
        const chip = event.target.closest("[data-option]");
        if (!chip) return;

        const option = CHAT_QUICK_OPTIONS.find(item => item.id === chip.dataset.option);
        if (option) sendChatMessageWithStatus(option.label, option.id);
    });

    document.getElementById("sendFriendRequestBtn")?.addEventListener("click", sendFriendRequest);
    document.getElementById("friendUsernameInput")?.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendFriendRequest();
        }
    });
    document.getElementById("dmForm")?.addEventListener("submit", sendDmMessage);

    document.getElementById("messages")?.addEventListener("click", event => {
        const accept = event.target.closest("[data-fr-accept]");
        if (accept) {
            respondFriendRequest(accept.dataset.frAccept, true);
            return;
        }
        const decline = event.target.closest("[data-fr-decline]");
        if (decline) {
            respondFriendRequest(decline.dataset.frDecline, false);
            return;
        }
        const remove = event.target.closest("[data-remove-friend]");
        if (remove) {
            event.stopPropagation();
            removeFriend(remove.dataset.removeFriend);
            return;
        }
        const openDm = event.target.closest("[data-open-dm]");
        if (openDm) openDmThread(openDm.dataset.openDm);
    });

    document.getElementById("supportList")?.addEventListener("click", event => {
        const item = event.target.closest("[data-support-user]");
        if (item) openSupportThread(item.dataset.supportUser);
    });

    document.getElementById("supportThreadHeader")?.addEventListener("click", event => {
        const button = event.target.closest("[data-clear-chat]");
        if (button) clearSupportChat(button.dataset.clearChat);
    });

    document.getElementById("supportCanned")?.addEventListener("click", event => {
        const chip = event.target.closest("[data-canned]");
        const input = document.getElementById("supportInput");

        if (chip && input) {
            input.value = ADMIN_CANNED_REPLIES[Number(chip.dataset.canned)] || "";
            input.focus();
        }
    });

    document.getElementById("supportForm")?.addEventListener("submit", sendAdminReply);

    document.getElementById("adminOnlineToggle")?.addEventListener("change", event => {
        setAdminOnline(event.target.checked);
    });

    window.addEventListener("storage", event => {
        if (
            event.key === null ||
            event.key === CHAT_KEY ||
            event.key === ADMIN_SEEN_KEY ||
            event.key === ADMIN_PREF_KEY ||
            event.key === FRIENDS_KEY ||
            event.key === DMS_KEY
        ) {
            refreshChatViews();
            renderMessagesPage();
        }

        if (event.key === null || event.key === AUTH_ACCOUNTS_KEY) {
            enforceAccountExists();
            checkAuthorNotice();
        }
    });

    window.addEventListener("pagehide", () => {
        if (currentUser && isLibrarianOrAdmin(currentUser)) {
            try {
                localStorage.setItem(ADMIN_SEEN_KEY, "0");
            } catch (error) {}
        }
    });
}

function openSidePanel() {
    document.getElementById("sidePanel")?.classList.add("open");
    document.getElementById("sideOverlay")?.classList.remove("hidden");
}

function closeSidePanel() {
    document.getElementById("sidePanel")?.classList.remove("open");
    document.getElementById("sideOverlay")?.classList.add("hidden");
}

function openHelpModal() {
    const modal = document.getElementById("helpModal");

    modal?.classList.remove("hidden");

    requestAnimationFrame(() => {
        modal?.classList.add("show");
    });
}

function closeHelpModal() {
    const modal = document.getElementById("helpModal");

    modal?.classList.remove("show");

    setTimeout(() => {
        modal?.classList.add("hidden");
    }, 350);
}

const notifBell = document.getElementById("notifBell");
const notifDropdown = document.getElementById("notifDropdown");
const markReadBtn = document.getElementById("markReadBtn");

function closeNotifDropdown() {
    if (!notifDropdown || notifDropdown.classList.contains("hidden")) return;

    notifDropdown.classList.add("hidden");
    renderNotifications();
}

notifBell?.addEventListener("click", event => {
    event.stopPropagation();
    if (!notifDropdown) return;

    if (!notifDropdown.classList.contains("hidden")) {
        closeNotifDropdown();
        return;
    }

    notifDropdown.classList.remove("hidden");

    if (notifications.some(notification => !notification.read)) {
        notifications.forEach(notification => {
            notification.read = true;
        });

        saveLibraryData();
        document.getElementById("notifBadge")?.classList.add("hidden");
    }
});

markReadBtn?.addEventListener("click", () => {
    notifications.forEach(notification => {
        notification.read = true;
    });

    saveLibraryData();
    renderNotifications();
});

document.addEventListener("click", event => {
    if (
        notifDropdown &&
        !notifDropdown.contains(event.target) &&
        notifBell &&
        !notifBell.contains(event.target)
    ) {
        closeNotifDropdown();
    }
});

navItems.forEach(button => {
    button.addEventListener("click", function () {
        showPage(this.dataset.page);
    });
});

document.getElementById("deleteBookButton")?.addEventListener("click", deleteBooks);
document.getElementById("checkoutButton")?.addEventListener("click", checkoutCart);

document.getElementById("booksSearch")?.addEventListener("input", renderBooksPage);
document.getElementById("filterAvailability")?.addEventListener("change", renderBooksPage);
document.getElementById("filterCategory")?.addEventListener("change", renderBooksPage);
document.getElementById("sortBooks")?.addEventListener("change", renderBooksPage);

document.getElementById("globalSearch")?.addEventListener("input", renderSearchPage);
document.getElementById("searchCategory")?.addEventListener("change", renderSearchPage);
document.getElementById("searchYear")?.addEventListener("change", renderSearchPage);
document.getElementById("searchAvail")?.addEventListener("change", renderSearchPage);

document.getElementById("logoutBtn")?.addEventListener("click", handleLogout);

document.getElementById("sidePanelToggle")?.addEventListener("click", openSidePanel);
document.getElementById("sidePanelClose")?.addEventListener("click", closeSidePanel);
document.getElementById("sideOverlay")?.addEventListener("click", closeSidePanel);

document.getElementById("logoClick")?.addEventListener("click", openHelpModal);
document.getElementById("helpClose")?.addEventListener("click", closeHelpModal);
document.getElementById("helpOverlay")?.addEventListener("click", closeHelpModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeHelpModal();
        closeSidePanel();
        closeRateModal();
        closeReportModal();
        closePremiumModal();
        closeCheckoutPayment();
        closeDeleteAccountModal();
        closeBookDetailPanel();
        closeNotifDropdown();
    }
});

loginForm?.addEventListener("submit", handleLogin);

document.getElementById("signupBtn")?.addEventListener("click", () => {
    showAuthForm("signup");
});

document.getElementById("backToLoginBtn")?.addEventListener("click", () => {
    showAuthForm("login");
});

signupForm?.addEventListener("submit", handleSignup);
document.getElementById("passwordResetForm")?.addEventListener("submit", submitPasswordReset);

const TECH_FAQ = [
    { q: "My return wasn't accepted", a: "Open Borrow → My Borrowed Books and press Return again. A successful return moves the book to History." },
    { q: "Why can't I borrow a book?", a: "You can hold 3 books at once. Premium books need Premium membership, and a title with no available copies can't be borrowed." },
    { q: "How do I become an author?", a: "Settings → Author Status → Apply as Author. When an admin approves you, you're taken straight to My Books." },
    { q: "How do I upgrade or cancel Premium?", a: "Profile → Upgrade to Premium (₱99/mo). To stop, use Cancel Subscription on your Profile." },
    { q: "I forgot or want to change my password", a: "Settings → Security lets you set a new password with your current one. If you're locked out, chat with support." }
];

function renderTechSupportPage() {
    const list = document.getElementById("techFaqList");
    if (!list) return;

    list.innerHTML = TECH_FAQ.map(item => `
        <details class="tech-faq-item">
            <summary>${escapeHTML(item.q)}</summary>
            <p>${escapeHTML(item.a)}</p>
        </details>
    `).join("");
}

function openSupportTopic(topic) {
    if (isLibrarianOrAdmin(currentUser)) {
        showPage("support");
        return;
    }

    openChatWidget();

    const select = document.getElementById("supportIssueType");
    if (select) select.value = topic || "";

    document.getElementById("chatInput")?.focus();
}

document.addEventListener("click", event => {
    const card = event.target.closest("[data-support-topic]");
    if (card) openSupportTopic(card.dataset.supportTopic);
});

setInterval(() => {
    if (currentUser) checkAuthorNotice();
}, 4000);

applyTheme(getSavedTheme(), true);
initPasswordVisibilityToggles();
initNewFeatureListeners();

if (localStorage.getItem("libraryNotifPref") === "off") {
    const t = document.getElementById("notifPrefToggle");
    if (t) t.checked = false;
}
if (localStorage.getItem("libraryCompactCards") === "on") {
    document.body.classList.add("compact-cards");
    const t = document.getElementById("compactCardsToggle");
    if (t) t.checked = true;
}

let passwordRecoveryMode = false;
window.librarySupabase.auth.onAuthStateChange(event => {
    if (event === "PASSWORD_RECOVERY") {
        passwordRecoveryMode = true;
        loginForm?.classList.add("hidden");
        signupForm?.classList.add("hidden");
        document.getElementById("forgotForm")?.classList.add("hidden");
        document.getElementById("passwordResetForm")?.classList.remove("hidden");
        document.getElementById("authTitle").textContent = "Choose a new password";
        document.getElementById("authSubtitle").textContent = "Your password will be updated securely.";
    }
    if (event === "SIGNED_OUT" && currentAuthUser && !passwordRecoveryMode) {
        setAuthenticated(false);
        showAuthForm("login");
    }
});

async function restoreSupabaseSession() {
    try {
        const { data, error } = await window.librarySupabase.auth.getSession();
        if (error) throw error;
        if (passwordRecoveryMode) return;
        if (!data.session) {
            setAuthenticated(false);
            return;
        }

        const profile = await loadSupabaseData(data.session.user);
        if (profile.banned) {
            await window.librarySupabase.auth.signOut();
            setAuthenticated(false);
            return;
        }

        setAuthenticated(true, profile.username);
        showPage(isLibrarianOrAdmin(currentUser) ? "dashboard" : "books");
        renderAll();
        saveLibraryData();
    } catch (error) {
        setAuthenticated(false);
        await window.librarySupabase.auth.signOut();
        showSupabaseError(error, "Unable to restore your Supabase session");
    }
}

restoreSupabaseSession();

function checkoutCart() {
    if (!cart.length) {
        alert("Cart empty");
        return;
    }

    openCheckoutPayment();
}

function openCheckoutPayment() {
    if (!cart.length) return;

    const total = cart.reduce(
        (sum, item) =>
            sum + (Number(item.price) || 0) *
            (Number(item.quantity) || 1),
        0
    );

    const summary = document.getElementById(
        "checkoutOrderSummary"
    );

    if (summary) {
        summary.innerHTML = `
            ${cart.map(item => `
                <div class="checkout-order-line">
                    <span>${escapeHTML(item.title)} × ${Number(item.quantity) || 1}</span>
                    <span>${formatCurrency(
                        (Number(item.price) || 0) *
                        (Number(item.quantity) || 1)
                    )}</span>
                </div>
            `).join("")}

            <div class="checkout-order-line checkout-order-total">
                <span>Total</span>
                <span>${formatCurrency(total)}</span>
            </div>
        `;
    }

    const modal = document.getElementById(
        "checkoutPaymentModal"
    );
    if (!modal) {
        showToast("Checkout is unavailable. Please reload the page and try again.");
        return;
    }

    clearTimeout(modal._closeTimer);
    modal.classList.remove("hidden");
    toggleCheckoutPaymentDetails();
    requestAnimationFrame(() => {
        modal.classList.add("show");
        modal.querySelector(".help-close")?.focus();
    });
}

function closeCheckoutPayment() {
    const modal = document.getElementById(
        "checkoutPaymentModal"
    );
    if (!modal) return;
    if (modal.classList.contains("hidden")) return;

    modal.classList.remove("show");

    clearTimeout(modal._closeTimer);
    modal._closeTimer = setTimeout(() => {
        if (!modal.classList.contains("show")) {
            modal.classList.add("hidden");
            document.getElementById("checkoutButton")?.focus();
        }
    }, 250);
}

function toggleCheckoutPaymentDetails() {
    const method = document.querySelector(
        'input[name="checkoutPaymentMethod"]:checked'
    )?.value || "gcash";

    ["gcash", "maya", "bank"].forEach(name => {
        document.getElementById(
            `checkout${name[0].toUpperCase()}${name.slice(1)}Details`
        )?.classList.toggle("hidden", method !== name);
    });

    const error = document.getElementById(
        "checkoutPaymentError"
    );

    if (error) error.textContent = "";
}

function recordAuditEvent(action, description) {
    const entry = {
        id: Date.now(),
        action,
        description,
        username: currentUser || "system",
        createdAt: new Date().toISOString()
    };

    reports.unshift(entry);
    saveLibraryData();
}

function confirmCheckoutPayment() {
    if (!cart.length || !currentUser) return;

    const method = document.querySelector(
        'input[name="checkoutPaymentMethod"]:checked'
    )?.value || "gcash";
    if (!["gcash", "maya", "bank"].includes(method)) {
        const error = document.getElementById("checkoutPaymentError");
        if (error) error.textContent = "Choose a valid payment method.";
        return;
    }

    const total = cart.reduce(
        (sum, item) =>
            sum + (Number(item.price) || 0) *
            (Number(item.quantity) || 1),
        0
    );

    cart.forEach(item => {
        purchaseHistory.push({
            id: item.id,
            title: item.title,
            username: currentUser,
            purchasedOn: today(),
            quantity: Number(item.quantity) || 1,
            amount: (Number(item.price) || 0) *
                    (Number(item.quantity) || 1),
            paymentMethod: method
        });
    });

    sales.today += total;
    sales.month += total;
    sales.count += cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
    );

    recordAuditEvent(
        "Purchase transaction",
        `${cart.length} title(s), ${formatCurrency(total)} via ${method.toUpperCase()} (demo).`
    );

    cart = [];

    addNotification(
        "Checkout Complete",
        `Purchased items totaling ${formatCurrency(total)}.`
    );

    saveLibraryData();
    renderAll();
    closeCheckoutPayment();

    alert(
        `Demo checkout complete via ${method.toUpperCase()}! Total: ${formatCurrency(total)}. No payment was processed.`
    );
}
function renderYourBooksPage() {

    const grid = document.getElementById("yourBooksGrid");

    if (!grid) return;

    const byId = new Map();

    getUserBorrows().forEach(loan =>
        byId.set(loan.id, {
            id: loan.id,
            borrowed: true,
            purchased: false
        })
    );

    purchaseHistory
        .filter(order => sameUser(order.username, currentUser))
        .forEach(order => {

            const entry = byId.get(order.id) || {
                id: order.id,
                borrowed: false,
                purchased: false
            };

            entry.purchased = true;
            byId.set(order.id, entry);
        });

    const entries = [...byId.values()]
        .map(entry => ({
            ...entry,
            book: books.find(book => book.id === entry.id)
        }))
        .filter(entry => entry.book);

    grid.innerHTML = entries.length
        ? entries.map(({ book, borrowed, purchased }) => `
            <article class="owned-book-card">

                <div class="owned-book-cover">
                    ${
                        hasRealPicture(book.image)
                        ? `<img src="${escapeHTML(book.image)}"
                               alt="${escapeHTML(book.title)} cover">`
                        : '<span>📖</span>'
                    }
                </div>

                <div class="owned-book-info">

                    <span class="owned-book-status">
                        ${
                            borrowed && purchased
                            ? "Owned · On loan"
                            : borrowed
                            ? "Currently borrowed"
                            : "Purchased"
                        }
                    </span>

                    <h3>${escapeHTML(book.title)}</h3>

                    <p>
                        By ${escapeHTML(book.author || "Unknown author")}
                    </p>

                    <button type="button"
                            class="primary-btn"
                            onclick="openReader('${escapeHTML(book.id)}')">
                        Read book
                    </button>

                </div>
            </article>
        `).join("")
        : `
            <div class="owned-books-empty">
                <span>📚</span>
                <h3>Your shelf is waiting</h3>
                <p>Books you borrow or buy will show up here for easy reading.</p>
                <button class="primary-btn"
                        onclick="showPage('books')">
                    Browse books
                </button>
            </div>
        `;
}

function getReadableBookPages(book) {

    const supplied = Array.isArray(book.pages)
        ? book.pages
            .map(page =>
                typeof page === "string"
                ? page
                : page?.content
            )
            .filter(page =>
                typeof page === "string" && page.trim()
            )
        : [];

    if (supplied.length) {
        return {
            pages: supplied,
            demo: false
        };
    }

    const title = book.title || "Untitled Book";
    const author = book.author || "Unknown author";
    const category = book.category || "General";

    const description = book.description ||
        `An introduction to ${title} and its place in the ${category} collection.`;

    const subject = title.replace(/\s+Vol\.\s*\d+$/i, "");

    const guidance = {
        lens: `the ideas and practical questions surrounding ${subject}`,
        idea: `${description} A helpful way to begin is to separate what is known, what is assumed, and what still needs a clearer explanation.`,
        method: "Start with a question, gather dependable evidence, compare more than one explanation, and record how each conclusion follows from what you observed.",
        scenario: `Consider a real situation connected to ${subject}. The details may be incomplete, so identify what additional evidence would help you make a fair and useful decision.`,
        exercise: `Write one question about ${subject}. Note what you already know, what you would need to learn, and where you could look for a reliable answer.`
    };

    const pages = [

        // PAGE 1
        `A first look at ${subject}
By ${author}

${description}

Every subject becomes easier to explore when it is connected to a question that matters.

This preview approaches ${subject} through ${guidance.lens}.

As you read, notice which parts are facts, which are choices, and which depend on the situation.`,

        // PAGE 2
        `The central idea

${guidance.idea}

For ${subject}, the useful habit is to slow down long enough to explain how one step leads to the next.

When an explanation feels vague, ask for a concrete example and check whether the same reasoning still works.

Keep the book's description in view: ${description}`,

        // PAGE 3
        `A method you can use

${guidance.method}

Apply the method to one small case before trying a complicated one.

Write down what you expected, what happened, and what you learned.

A short record makes it easier to spot a mistaken assumption and to repeat a successful approach.`,

        // PAGE 4
        `From idea to practice

${guidance.scenario}

The details of a real example matter.

Ask who is affected, what constraints exist, and what evidence would change your mind.

Then compare possible responses by their benefits, risks, and cost.`,

        // PAGE 5
        `Review and next steps

Return to the description: ${description}

What question does ${subject} help answer?

Which part of the method would you try first, and what would count as a good result?

Try this: ${guidance.exercise}

End of the custom sample preview for ${title}.`
    ];

    return {
        demo: true,
        pages
    };
}

function loadReaderVoices() {

    if (!window.speechSynthesis) return;

    const select = document.getElementById("readerVoice");

    const voices = speechSynthesis.getVoices();

    const selected = select.value;

    if (voices.length) {

        select.replaceChildren(
            new Option("Default", "")
        );

        voices.forEach(voice => {
            select.add(
                new Option(
                    `${voice.name} · ${voice.lang}`,
                    voice.voiceURI
                )
            );
        });

        if ([...select.options].some(
            option => option.value === selected
        )) {
            select.value = selected;
        }
    }
}

function toggleReaderNarration() {

    if (!window.speechSynthesis ||
        !window.SpeechSynthesisUtterance) {
        return;
    }

    const speech = window.speechSynthesis;

    const button = document.querySelector(
        '[data-reader="listen"]'
    );

    if (speech.speaking && !speech.paused) {
        speech.pause();
        button.textContent = "▶ Resume";
        return;
    }

    if (speech.paused) {
        speech.resume();
        button.textContent = "⏸ Pause";
        return;
    }

    const text = document.getElementById(
        "readerPage"
    )?.innerText.trim();

    if (!text) return;

    speech.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const voiceURI = document.getElementById(
        "readerVoice"
    )?.value;

    const voice = speech.getVoices().find(
        item => item.voiceURI === voiceURI
    );

    if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
    }

    utterance.rate = Number(
        document.getElementById("readerRate")?.value
    ) || 1;

    utterance.onstart = () => {
        button.textContent = "⏸ Pause";
    };

    utterance.onend = () => {
        button.textContent = "🔊 Listen";
    };

    utterance.onerror = () => {
        button.textContent = "🔊 Listen";
    };

    speech.speak(utterance);
}

function stopReaderNarration() {

    if (window.speechSynthesis) {
        speechSynthesis.cancel();
    }

    const button = document.querySelector(
        '[data-reader="listen"]'
    );

    if (button) {
        button.textContent = "🔊 Listen";
    }
}