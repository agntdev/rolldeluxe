import { Composer } from "grammy";

const composer = new Composer();

composer.command("status", async (ctx) => {
  await ctx.reply("Bot is operational.");
});

export default composer;
