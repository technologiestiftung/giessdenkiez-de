import { createClient } from "@supabase/supabase-js";
import { Database } from "../database.ts";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabaseClient = createClient<Database>(
	SUPABASE_URL,
	SUPABASE_KEY,
);
