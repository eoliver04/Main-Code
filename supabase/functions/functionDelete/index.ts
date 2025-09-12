import { supabase } from "../../cliente.ts";

Deno.serve(async (req) => {
    if (req.method !== "POST") {
        return new Response(
            JSON.stringify({ error: "Metodo no permitido" }),
            {
                status: 400,
                headers: { "Content-Type": "application/json" },
            },
        );
    }

    try {
        const { id } = await req.json();
        if (!id) {
            return new Response(
                JSON.stringify({ error: "Se requiere el id del producto" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }

        const { error: errorDelte } = await supabase
            .from("Productos")
            .delete()
            .eq("id_productos", id);
        if (errorDelte) {
            return new Response(
                JSON.stringify({ error: "Error al eliminar" }),
                {
                    status: 405,
                    headers: { "Content-Type": "application/json" },
                },
            );
        }
        return new Response(
            JSON.stringify({ success: true }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            },
        );
    } catch (err) {
        console.error("Error al procesar la solicitud:", err);
        return new Response(
            JSON.stringify({ error: "Error al hacer la solicitud" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
    }
});
