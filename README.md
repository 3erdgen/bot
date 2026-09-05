# Discord Starter Bot

This repository contains a simple starter Discord bot using discord.js v14 with slash commands.

Included commands:
- /ping — check latency
- /purge <amount> — delete recent messages in the current channel (requires Manage Messages)
- /ban <user> [reason] [delete_days] — ban a user and remove their recent messages (requires Ban Members)
- /help — shows available commands

Important: Do NOT commit your bot token. Revoke any token you previously posted publicly and store the token in a secret.

Setup (local):
1. Copy .env.example to .env and set DISCORD_TOKEN, CLIENT_ID, and GUILD_ID.
2. Install dependencies: npm install
3. Register commands to your development guild: npm run register-commands
4. Run locally: npm start

Deploying:
- Use the included Dockerfile or set the start command to `npm start` in most hosts (Render, Fly, Railway).
- Add DISCORD_TOKEN, CLIENT_ID, and GUILD_ID as environment variables/secrets on your host.

Permissions:
- The bot requires the Manage Messages permission for purge and Ban Members permission for ban.

Notes:
- Discord bulk delete cannot remove messages older than 14 days. The /purge command will delete what it can and report results.
- The ban command uses Discord's deleteMessageDays option (0-7) where supported.

Security:
- Never commit .env or tokens. Use GitHub Secrets or your host's secret store.

License: MIT
