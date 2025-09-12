import {createClient} from "@supabase/supabase-js"
import { URL,key } from "../functions/keys.js";

export const supabase = createClient(URL,key);
