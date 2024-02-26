import { CommandInteraction } from "discord.js";
import fs from 'fs';
import path from 'path';
const settingsDir = path.resolve(__dirname, '../settings');
let setupThreadsPath: string;

if (!fs.existsSync(settingsDir)) {
  fs.mkdirSync(settingsDir);
}

setupThreadsPath = path.resolve(settingsDir, 'setupThreads.json');

if (!fs.existsSync(setupThreadsPath)) {
  fs.writeFileSync(setupThreadsPath, JSON.stringify({ channels: [] }), 'utf-8');
}

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