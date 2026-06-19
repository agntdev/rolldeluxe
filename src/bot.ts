import { readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createBot } from "./toolkit/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const handlersDir = resolve(__dirname, "handlers");

export interface Session {
}

export async function buildBot(token: string) {
  const bot = createBot<Session>(token, {
    initial: () => ({}),
  });

  for (const entry of readdirSync(handlersDir)) {
    if (!entry.endsWith(".js")) continue;
    const mod = await import(`./handlers/${entry}`);
    if (mod.default) {
      bot.use(mod.default);
    }
  }

  return bot;
}
