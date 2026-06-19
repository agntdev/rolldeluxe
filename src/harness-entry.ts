import { buildBot } from "./bot.js";

export async function makeBot() {
  return buildBot(process.env.BOT_TOKEN ?? "harness-test-token");
}
