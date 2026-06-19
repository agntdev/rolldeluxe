import { Composer } from "grammy";

const composer = new Composer();

const WELCOME_TEXT = "Welcome to RollDeluxe! Send /roll to roll a six-sided die (1–6).";

composer.command("start", async (ctx) => {
  await ctx.reply(WELCOME_TEXT);
});

export default composer;
