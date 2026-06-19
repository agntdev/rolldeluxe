import { randomInt } from "node:crypto";
import { Composer, type CommandContext, type Context, GrammyError } from "grammy";

const composer = new Composer();

async function replyWithRetry(ctx: CommandContext<Context>, text: string, maxRetries = 5): Promise<void> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await ctx.reply(text);
      return;
    } catch (err) {
      if (err instanceof GrammyError && err.error_code === 429) {
        const retryAfter = (err.parameters?.retry_after ?? 1) * 1000;
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries exceeded for 429");
}

composer.command("roll", async (ctx) => {
  const result = randomInt(1, 7);
  console.log(`[roll] user ${ctx.from?.id ?? "unknown"} rolled ${result}`);
  await replyWithRetry(ctx, `You rolled a ${result}.`);
});

export default composer;
