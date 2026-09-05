const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user and optionally remove recent messages')
    .addUserOption(o => o.setName('user').setDescription('User to ban').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Reason for the ban').setRequired(false))
    .addIntegerOption(o => o.setName('delete_days').setDescription('Delete messages from last N days (0-7)').setRequired(false)),
  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: 'You need the Ban Members permission to use this command.', ephemeral: true });
    }

    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') ?? 'No reason provided';
    const deleteDays = interaction.options.getInteger('delete_days') ?? 0;

    await interaction.deferReply({ ephemeral: true });

    try {
      await interaction.guild.members.ban(target.id, { reason, deleteMessageDays: Math.min(Math.max(deleteDays, 0), 7) });
      await interaction.editReply({ content: `Banned ${target.tag}. Removed messages from last ${deleteDays} day(s) where supported.` });
    } catch (err) {
      console.error('ban error:', err);
      await interaction.editReply({ content: `Failed to ban ${target.tag}. Ensure I have Ban Members permission and that the target is bannable.` });
    }
  }
};
