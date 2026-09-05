const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete recent messages in this channel')
    .addIntegerOption(opt =>
      opt.setName('amount')
        .setDescription('Number of messages to delete (max 1000)')
        .setRequired(true)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.reply({ content: 'You need the Manage Messages permission to use this command.', ephemeral: true });
    }

    const amount = interaction.options.getInteger('amount');
    if (amount <= 0) return interaction.reply({ content: 'Amount must be greater than 0.', ephemeral: true });

    await interaction.deferReply({ ephemeral: true });
    const channel = interaction.channel;
    let remaining = amount;
    let totalDeleted = 0;

    while (remaining > 0) {
      const chunk = Math.min(remaining, 100);
      try {
        const deleted = await channel.bulkDelete(chunk, true);
        const deletedCount = deleted.size ?? 0;
        totalDeleted += deletedCount;
        remaining -= deletedCount;
        if (deletedCount < chunk) break;
        await new Promise(res => setTimeout(res, 800));
      } catch (err) {
        console.error('bulkDelete error:', err);
        break;
      }
    }

    await interaction.editReply({ content: `Deleted ${totalDeleted} messages (requested ${amount}). Note: messages older than 14 days cannot be bulk deleted.` });
  }
};
