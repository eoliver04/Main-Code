import { supabase } from "../../cliente.ts";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metodo no permitido" }),
      {
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { Pname, Pprise, Pamount,userId } = await req.json();

    console.log("Datos recibidos:", { Pname, Pprise, Pamount,userId });

    const { error: errorAdd } = await supabase
      .from("Productos")
      .insert([{ nombre: Pname, precio_unitario: Pprise, cantidad: Pamount,cliente:userId }]);

    if (errorAdd) {
      console.error("Error al insertar en la base de datos:", errorAdd);
      return new Response(
        JSON.stringify({ error: errorAdd.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

  } catch (err) {
    console.error("Error al procesar la solicitud:", err);
    return new Response(
      JSON.stringify({ error: "Error al hacer la solicitud" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
