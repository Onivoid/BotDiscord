import { CommandInteraction } from "discord.js";

export default {
  name: 'ping',
  description: 'Replies with Pong!',
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong!');
  },
};