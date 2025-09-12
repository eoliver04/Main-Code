import { createClient } from "jsr:@supabase/supabase-js@2";
import "https://deno.land/x/dotenv/load.ts";
const supUrl= Deno.env.get ("SUPABASE_URL") as string;
const supKey = Deno.env.get("SUPABASE_KEY") as string;

console.log("Supabase URL:", supUrl);
console.log("Supabase Key:", supKey);

export const supabase=createClient(supUrl,supKey);