import { Composer } from "grammy";

const composer = new Composer();

composer.command("spec", async (ctx) => {
  await ctx.reply(
    [
      "RollDeluxe follows the spec at docs/spec.md.",
      "Available commands: /start, /roll, /status, /help",
      "Type /help for descriptions.",
    ].join("\n"),
  );
});

export default composer;