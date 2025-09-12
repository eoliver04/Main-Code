import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supUrl = Deno.env.get("SUP_URL") as string;
const supKey = Deno.env.get("key") as string;
export const supabase = createClient(supUrl, supKey);