const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a brief help message about available commands'),
  async execute(interaction) {
    const helpText = `Available commands:\n` +
      `/ping — check latency\n` +
      `/purge <amount> — delete recent messages in the current channel (Manage Messages required)\n` +
      `/ban <user> [reason] [delete_days] — ban a user and remove their recent messages (Ban Members required)`;

    await interaction.reply({ content: helpText, ephemeral: true });
  }
};
