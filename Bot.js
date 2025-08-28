import { token } from "./keys.js";

import { list } from "./fetchList.js";

import { add } from "./fetchAdd.js";
import { Bot, InlineKeyboard } from "grammy";
import express from "express";
import { deleteElement } from "./fetchDelete.js";
import { checkCliente } from "./functions/cliente.js";

// Configuración del bot
const BOT_TOKEN = token;
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
bot.command("start", async (ctx) => {
  const userId = ctx.from.id;
  const userName = ctx.from.first_name;

  const resultado = await checkCliente(userId, userName);

  const keyboard = new InlineKeyboard()
    .text("Agregar Elemento", "addElement")
    .text("Listar Productos", "listProducts")
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

  await ctx.answerCallbackQuery();

  if (action === "addElement") {
    userStates[userId] = { step: "askProductName", data: {} };
    await ctx.reply("Ingresa el nombre del producto");
    return;
  } else if (action === "deleteElement") {
    const items = await list(userId);

    if (!Array.isArray(items) || items.length === 0) {
      await ctx.reply("No hay elementos para listar.");
      await ctx.answerCallbackQuery();
      return;
    }
    //teclado dinamico
    const keyboard = new InlineKeyboard();
    items.forEach((item) => {
      keyboard.text(item.nombre, `eliminar_${item.id_productos}`).row();
    });
    await ctx.reply("Lista de productos:", {
      reply_markup: keyboard,
    });
    await ctx.answerCallbackQuery();
    return;
  } else if (action.startsWith("eliminar_")) {
    const id = action.split("_")[1];
    const producto = await list(userId);

    const selected = producto.find((p) => p.id_productos == id);

    const confirmKeyboard = new InlineKeyboard()
      .text("Sí, eliminar", `confirmarEliminar_${id}`)
      .text("No Cancelar", "cancelarEliminar");
    await ctx.reply(
      `Seguro que deseas eliminar el producto ${
        selected ? selected.nombre : "desconocido"
      }`,
      {
        reply_markup: confirmKeyboard,
      }
    );
  } else if (action.startsWith("confirmarEliminar_")) {
    const id = action.split("_")[1];
    await deleteElement({ id }, ctx);
  } else if (action === "cancelarEliminar") {
    await ctx.reply("Operacion cancelada");
  } else if (action === "listProducts") {
    const items = await list(userId);
    const keyboard = new InlineKeyboard();
    items.forEach((item) => {
      keyboard.text(item.nombre, `show_${item.id_productos}`);
    });
    await ctx.reply("Lista de productos", {
      reply_markup: keyboard,
    });
  } else if (action.startsWith("show_")) {
    const id = action.split("_")[1];
    const productos =await list(userId);
    const producto = productos.find((p) => p.id_productos == id);
    if (producto) {
      const InfoKeyboard = new InlineKeyboard()
        .text(`Nombre: ${producto.nombre}`)
        .row()
        .text(`Cantidad: ${producto.cantidad}`)
        .row()
        .text(`Precio: ${producto.precio_unitario}`);
      await ctx.reply("Informacion del producto", {
        reply_markup: InfoKeyboard,
      });
    } else {
      ctx.reply("Producto no enctrodo");
    }
  }

  await ctx.answerCallbackQuery();
});

// Manejador para los mensajes de texto
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const userState = userStates[userId];

  if (!userState) return;

  const userMessage = ctx.message.text;
  //para agregar elementos
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
      Pprise: userState.data.price,
      Pamount: userState.data.quantity,
      userId: userId,
    };

    await add(jsonDataADD, ctx);

    delete userStates[userId];
  }
});

// Configuración del servidor Express para manejar el webhook
const app = express();
app.use(express.json());

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
