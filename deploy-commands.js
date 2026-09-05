require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID; // optional

if (!token || !clientId) {
  console.error('DISCORD_TOKEN and CLIENT_ID must be set in environment');
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const cmd = require(path.join(commandsPath, file));
  commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    if (guildId) {
      console.log(`Registering ${commands.length} commands to guild ${guildId}`);
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
      console.log('Guild commands registered.');
    } else {
      console.log(`Registering ${commands.length} global commands`);
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
      console.log('Global commands registered. Note: global propagation can take up to 1 hour.');
    }
  } catch (err) {
    console.error('Error registering commands:', err);
    process.exit(1);
  }
})();
