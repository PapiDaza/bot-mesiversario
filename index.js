const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// CONFIGURA ESTO
const CHANNEL_ID = "1450004520066089051";
const FECHA_INICIO = new Date(2025, 1, 1); // 1 Febrero 2025

client.once("ready", () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

// COMANDO DE PRUEBA
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!mes") {
    const hoy = new Date();

    let meses =
      (hoy.getFullYear() - FECHA_INICIO.getFullYear()) * 12 +
      (hoy.getMonth() - FECHA_INICIO.getMonth());

    const años = Math.floor(meses / 12);
    meses = meses % 12;

    let tiempo = "";
    if (años > 0) tiempo += `${años} año${años > 1 ? "s" : ""} `;
    tiempo += `${meses} mes${meses !== 1 ? "es" : ""}`;

    message.channel.send(
      `🧪 **PRUEBA**\n💕 Llevamos **${tiempo}** juntos ❤️`
    );
  }
});

// MENSAJE AUTOMÁTICO CADA MES
cron.schedule("0 9 1 * *", async () => {
  const canal = await client.channels.fetch(CHANNEL_ID);
  if (!canal) return;

  const hoy = new Date();
  let meses =
    (hoy.getFullYear() - FECHA_INICIO.getFullYear()) * 12 +
    (hoy.getMonth() - FECHA_INICIO.getMonth());

  const años = Math.floor(meses / 12);
  meses %= 12;

  let tiempo = "";
  if (años > 0) tiempo += `${años} año${años > 1 ? "s" : ""} `;
  tiempo += `${meses} mes${meses !== 1 ? "es" : ""}`;

  canal.send(
    `💕 **Feliz mesiversario** 💕\n` +
    `Hoy cumplimos **${tiempo}** juntos ❤️\n` +
    `Desde el **1 de febrero de 2025** 🥰`
  );
});

client.login(process.env.TOKEN);




