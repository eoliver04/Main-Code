import { key } from "./keys.js";
import { ADD } from "./keys.js";
const add = async (send,ctx)=>{
    try {
      const response = await fetch(
        ADD,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${key}` ,
          },
          body: JSON.stringify(send),
        }
      );

      if (response.ok) {
        await ctx.reply("El producto se ha guardado correctamente");
      } else {
        const error = await response.json();
        console.error(`Fallo al agregar a Supabase: ${JSON.stringify(error)}`);
        await ctx.reply("Fallo al agregar el producto");
      }
    } catch (err) {
      console.error("Error al enviar datos a Supabase:", err);
      await ctx.reply("Error al guardar el producto");
    }
};
module.exports=add;