import {createCliente} from "@supabase/supabase-js"
import { URL,key } from "./keys.js";

export const supabase = createCliente(URL,key);
