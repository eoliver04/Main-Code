import { key } from "./keys.js";
import { DELETE } from "./keys.js";
export const deleteElement = async (send, ctx) => {
  try {
    const response = await fetch(DELETE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(send),
    });

    if (response.ok) {
      await ctx.reply("El producto se ha eliminado correctamente");
    } else {
      const error = await response.json();
      console.error(`Fallo al eliminar en Supabase: ${JSON.stringify(error)}`);
      await ctx.reply("Fallo al eliminar el producto");
    }
  } catch (err) {
    console.error("Error al enviar datos a Supabase:", err);
    await ctx.reply("Error al eliminar el producto");
  }
};
