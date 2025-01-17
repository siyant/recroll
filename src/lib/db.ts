import { SUPABASE_KEY, SUPABASE_URL } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export default supabase;
