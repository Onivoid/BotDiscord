import { CommandInteraction } from "discord.js";
import fs from 'fs';
import path from 'path';
const setupThreadsPath = path.resolve(__dirname, '../settings/setupThreads.json');

const threadConfig = JSON.parse(fs.readFileSync(setupThreadsPath, 'utf-8'));

export default {
  name: 'show-threads-config',
  description: 'Permet de voir la configuration des threads.',
  execute: async (interaction: CommandInteraction) => {
    if (!interaction.memberPermissions?.has("Administrator")) {
      await interaction.reply('Seuls les administrateurs peuvent utiliser cette commande.');
      return;
    }
    const response = threadConfig.channels.length > 0 ?
      threadConfig.channels.map((channel: string) => `<#${channel}>`) :
      ['Aucun channel configuré.'];
    await interaction.reply({ content: `Channels configurés : ${response.join(', ')}`, ephemeral: true });
  },
};