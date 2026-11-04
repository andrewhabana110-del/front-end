const SUPABASE_URL = "https://snjdoqhgdsfvyidszsei.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_le-EpECqIo0SWqRu23Yvmg_p-Uj6XiM";

if (!window.supabase?.createClient) {
    throw new Error("Supabase SDK failed to load. Check your internet connection and reload.");
}

window.librarySupabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
