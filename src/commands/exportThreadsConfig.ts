import { CommandInteraction } from "discord.js";
import fs from 'fs';
import path from 'path';
const settingsDir = path.resolve(__dirname, '../settings');
let setupThreadsPath: string;

if (!fs.existsSync(settingsDir)) {
  fs.mkdirSync(settingsDir);
}

setupThreadsPath = path.resolve(settingsDir, 'setupThreads.json');

export default {
  name: 'export-threads-config',
  description: 'Exporte la configuration des threads.',
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply({ content: 'Configuration des threads exportée.', files: [{attachment: setupThreadsPath}] });
  },
};