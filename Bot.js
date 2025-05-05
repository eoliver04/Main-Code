const { Bot, InlineKeyboard } = require("grammy");
const express = require('express');
//const fetch = require("node-fetch"); // Asegúrate de que node-fetch esté instalado
// Configuración del bot
const BOT_TOKEN = "7784921544:AAG4AI5LxZThbKUm3RdbLvDjMaShJcMIq8E";
const bot = new Bot(BOT_TOKEN);
const userStates = {};
// Configuración de comandos
const commands = [
  { command: "start", description: "Inicializa el bot" },
  { command: "list", description: "Lista los elementos del almacén" },
  { command: "add", description: "Agrega elementos al almacén" },
  { command: "delete", description: "Elimina elementos" },
];
bot.api.setMyCommands(commands);

// Comando /start
bot.command("start", (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("Agregar Elemento", "addElement")
    .text("List", "listElements")
    .row()
    .text("Delete", "deleteElement");

  ctx.reply("Selecciona una opción", {
    reply_markup: keyboard,
  });
});

// Manejadores para los botones
bot.on("callback_query:data", async (ctx) => {
  const action = ctx.callbackQuery.data;
  const userId = ctx.from.id;

  if (action === "addElement") {
    userStates[userId] = { step: "askProductName", data: {} };
    await ctx.reply("Ingresa el nombre del producto");
  } else if (action === "listElements") {
    userStates[userId] = { step: "listElements", data: {} };
    await ctx.reply("Listando Ventas");
  } else if (action === "deleteElement") {
    userStates[userId] = { step: "deleteElements", data: {} };
    await ctx.reply("Elemento a eliminar");
  }

  await ctx.answerCallbackQuery();
});

// Manejador para los mensajes de texto
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const userState = userStates[userId];

  if (!userState) return;

  const userMessage = ctx.message.text;

  if (userState.step === "askProductName") {
    userState.data.productName = userMessage;
    userState.step = "askCantidad";
    await ctx.reply("Ingresa la cantidad del producto");
  } else if (userState.step === "askCantidad") {
    const quantity = parseInt(userMessage, 10);
    if (isNaN(quantity)) {
      await ctx.reply("Por favor, ingrese un número válido.");
      return;
    }
    userState.data.quantity = quantity;
    userState.step = "askPrecio";
    await ctx.reply("Ingresa el precio de los productos");
  } else if (userState.step === "askPrecio") {
    const price = parseFloat(userMessage);
    if (isNaN(price)) {
      await ctx.reply("Ingrese un precio válido.");
      return;
    }
    userState.data.price = price;

    const jsonDataADD = {
      Pname: userState.data.productName,
      Pprise: userState.data.quantity,
      Pamount: userState.data.price,
    };

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
          body: JSON.stringify(jsonDataADD),
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

    delete userStates[userId];
  }
});

// Configuración del servidor Express para manejar el webhook
const app = express();
app.use(express.json()); // Reemplaza bodyParser.json() con express.json()

// Inicializa el bot antes de manejar actualizaciones
(async () => {
  await bot.init(); // Inicializa el bot para obtener su información
  console.log("Bot inicializado correctamente");
})();

app.post("/Bot", (req, res) => {
  try {
    bot.handleUpdate(req.body); // Procesa la actualización entrante
    res.sendStatus(200);
  } catch (err) {
    console.error("Error al manejar la solicitud:", err);
    res.sendStatus(500);
  }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});