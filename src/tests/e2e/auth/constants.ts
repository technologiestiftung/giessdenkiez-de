import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

export const baseUrl = process.env.VITE_BASE_URL;
export const supabaseApiUrl = process.env.VITE_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY ?? "";
export const inbucketUrl = process.env.TEST_SUPABASE_INBUCKET_URL ?? "";

export const supabaseClient = createClient(supabaseApiUrl, supabaseAnonKey);

export const defaultEmail = "user@example.com";
export const defaultUsername = "username";
export const defaultPassword = '123qwe!"§QWE';
