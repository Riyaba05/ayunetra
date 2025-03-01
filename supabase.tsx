import { createClient } from "@supabase/supabase-js";
import { Database } from "./lib/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://nsaylbnbmzsbmdrdnoor.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
// const serviceRoleKey = process.env.serviceRoleKey ?? "";

if (!supabaseKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

// const supabase = createClient(supabaseUrl, supabaseKey);

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
