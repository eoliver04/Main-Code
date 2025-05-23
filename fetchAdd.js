const add = async (send,ctx)=>{
    try {
      const response = await fetch(
        "https://xxnhehkvqwxwmqmonqhn.supabase.co/functions/v1/FunctionAdd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4bmhlaGt2cXd4d21xbW9ucWhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjgzODk0MCwiZXhwIjoyMDU4NDE0OTQwfQ.XNxdrDqcyDB7-LLtLuoOaN7OLevGpzjjgBfyVbT4osA",
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