import { supabase } from "../../cliente.ts";



// Verificar el cliente realizando una consulta simple
async function verifySupabaseClient() {
  try {
    const { data, error } = await supabase.from("Productos").select("*").limit(1);

    if (error) {
      console.error("Error al verificar el cliente de Supabase:", error.message);
    } else {
      console.log("Cliente de Supabase creado correctamente. Datos de prueba:", data);
    }
  } catch (err) {
    console.error("Error al conectar con Supabase:", err);
  }
}

verifySupabaseClient();