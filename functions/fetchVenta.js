import { key, VENTA } from "./keys.js";

export const venta = async (send, ctx) => {
  try {
    const response = await fetch(VENTA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(send),
    });

    if (response.ok) {
      await ctx.reply("The product has been sold correct");
    } else {
      const error = await response.json();
      ctx.reply("Faild to dols the product");
      console.error(
        `Fallo a la hora de la interaccion con la BD: ${JSON.stringify(error)}`
      );
    }
  } catch {
    console.error("Error al enviar datos a Supabase:", err);
    await ctx.reply("Error al guardar el producto");
  }
};
