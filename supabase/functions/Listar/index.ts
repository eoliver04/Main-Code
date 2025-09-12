import { supabase } from "../../cliente.ts";
Deno.serve(async (req)=>{
  if (req.method !== "GET") {
    return new Response(JSON.stringify({
      error: "Metodo no permitido"
    }), {
      status: 405,
      headers: {
        "Content-Type": "aplication/json"
      }
    });
  }
  try {
    const url=new URL(req.url)
    const userId= url.searchParams.get("userId")
    
    
    const { data: dataProductos, error: errorProductos } = await supabase
    .from('Productos')
    .select('*')
    .eq('cliente',userId);
    if (errorProductos) {
      console.error('error al insertar ', errorProductos);
      return new Response(JSON.stringify({
        error: "Error al insertar en la base de datos"
      }), {
        status: 500,
        headers: {
          "Content-Type": "aplication/json"
        }
      });
    }
    return new Response(JSON.stringify(dataProductos), {
      status: 200,
      headers: {
        "Content-Type": "aplication/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: "error al hacer la solicitud "
    }), {
      status: 500,
      headers: {
        "Content-Type": "aplication/json"
      }
    });
  }
});
