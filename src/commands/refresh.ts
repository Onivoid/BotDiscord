import { CommandInteraction, ActivityOptions, ActivityType } from "discord.js";

export default {
  name: 'refresh_counter',
  description: 'Redémarre le compteur de membres du bot',
  execute: async (interaction: CommandInteraction) => {
    const guildId = '267312518463094788';
    const guild = await interaction.client.guilds.cache.get(guildId);
    const activity: ActivityOptions = {
      name: `${guild?.memberCount} membres 👀`,
      type: ActivityType.Watching,
    };
    interaction.reply('Compteur de membres redémarré');
    return interaction.client.user?.setActivity(activity);
  }
};