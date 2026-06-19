import { Composer } from "grammy";

const composer = new Composer();

const HELP_TEXT = [
  "Available commands:",
  "",
  "/start — Start the bot",
  "/status — Get bot operational status",
  "/help — Show this help message",
].join("\n");

composer.command("help", async (ctx) => {
  await ctx.reply(HELP_TEXT);
});

export default composer;
