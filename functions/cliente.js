import { supabase } from "../supabaseClient.js";


export const checkCliente=async (userId,userName) => {

    const {data,error}=await supabase
        .from("clientes")
        .select("id_telegram")
        .eq("id",userId)
        .single();
    if (error|| !data){
        await supabase 
            .from("clientes")
            .insert([{
                id_telegram:userId,
                nombre:userName
            }])
        return {nuevo: true}    
    }   
    return{nuevo : false }
}