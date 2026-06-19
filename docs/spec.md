# RollDeluxe — Minimal Telegram dice bot

Summary

RollDeluxe is a tiny, single-purpose Telegram bot that responds to four commands: /start (friendly intro), /roll (returns a single random integer 1–6), /status (bot operational status), and /help (lists available commands). No persistence, no external APIs, no inline keyboards — intentionally minimal.

Audience

Telegram users who want a quick six-sided die roll via chat.

Core entities

- User: chat id and optionally username (used only to route replies).  
- Message: incoming Telegram update containing a command.  
- DiceRoll: integer 1..6 produced at request time.

Integrations & notification targets

- Telegram Bot API only (sendMessage, getUpdates long polling by default).  
- Bot token provided via environment variable (see Assumptions & defaults).  
- No external services, no analytics, no databases.

Interaction flows

1) /start
   - Trigger: user sends "/start".  
   - Bot action: reply with a short friendly welcome explaining the bot purpose and how to use /roll.  
   - Exact reply text (default): "Welcome to RollDeluxe! Send /roll to roll a six-sided die (1–6)."

2) /roll
   - Trigger: user sends "/roll".  
   - Bot action: generate a single random integer between 1 and 6 and reply with a single-line plain-text message containing only that integer (e.g. "4").  
   - Use Telegram sendMessage with chat_id and text set to the integer string; no extra formatting or markup.

3) /status
   - Trigger: user sends "/status".  
   - Bot action: reply with the text "Bot is operational."  
   - Use Telegram sendMessage; no extra formatting or markup.

4) /help
   - Trigger: user sends "/help".  
   - Bot action: reply with a list of available commands and their descriptions.  
   - Exact reply text: "Available commands:\n\n/start — Start the bot\n/status — Get bot operational status\n/help — Show this help message"

Command registration

- Set bot commands to: 
  - /start — Short welcome and usage
  - /roll — Roll a six-sided die
  - /status — Get bot operational status
  - /help — Show this help message
- Bot responds when these commands are received in private chats or group chats (standard Telegram command addressing rules apply).

Persistence

- None. No database, no file storage of user data, rolls, or logs beyond ephemeral process logs.

Payments

- None.

Non-goals

- No inline keyboards, no callbacks, no webhooks (default is long polling), no external APIs, no analytics, no user profiles.

Implementation notes

- Use a minimal long-polling loop (getUpdates) or a lightweight framework that abstracts it; keep the code tiny and dependency-minimal.  
- On errors from Telegram (rate limit/429), back off and retry per Telegram guidance.  
- Log only to stdout/stderr for debugging; do not persist logs.

## Assumptions & defaults

- Use long polling (getUpdates) by default — simplest deployment for a tiny bot with no external infra required.  
- Bot token must be provided in environment variable ROLLDELUXE_BOT_TOKEN — explicit, unique name avoids collisions and keeps config simple.  
- /roll reply contains only the integer ("1".."6") as plain text — this matches the owner's "single random integer" requirement exactly.  
- Use a cryptographically secure RNG when available (e.g., SystemRandom or equivalent) — ensures unpredictable rolls without a complex dependency chain.  
- Minimal logging to stdout (startup, incoming update summary, errors) — enough for debugging while keeping privacy and no persistence.
