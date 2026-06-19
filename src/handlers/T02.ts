import { Composer } from "grammy";
import { menuKeyboard } from "../toolkit/index.js";

const composer = new Composer();

const WELCOME_TEXT = [
  "Welcome to the AGNTDEV bot!",
  "",
  "Use the menu below to navigate the bot's features.",
].join("\n");

composer.command("start", async (ctx, next) => {
  const keyboard = menuKeyboard([
    { text: "Status", data: "menu:status" },
    { text: "Help", data: "menu:help" },
  ]);
  await ctx.reply(WELCOME_TEXT, { reply_markup: keyboard });
  await next();
});

composer.callbackQuery("menu:status", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Bot is operational.");
});

composer.callbackQuery("menu:help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    [
      "Available commands:",
      "/start — Show the main menu",
      "/status — Check bot operational status",
      "",
      "Tap a menu button to navigate.",
    ].join("\n"),
  );
});

export default composer;
