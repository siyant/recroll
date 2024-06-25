import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error('Missing SUPABASE_URL or SUPABASE_KEY');
}
const db = createClient(SUPABASE_URL, SUPABASE_KEY);
export default db;
