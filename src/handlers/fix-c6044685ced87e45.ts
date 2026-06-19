import { Composer } from "grammy";

const composer = new Composer();

const WELCOME_TEXT = "Welcome to RollDeluxe! Send /roll to roll a six-sided die (1–6).";

composer.use(async (ctx, next) => {
  if (ctx.message?.text === "/start") {
    await ctx.reply(WELCOME_TEXT);
    return;
  }
  await next();
});

export default composer;