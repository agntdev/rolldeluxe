import { buildBot } from "./bot.js";

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("BOT_TOKEN is required");
  process.exit(1);
}

const bot = await buildBot(token);
bot.start();
