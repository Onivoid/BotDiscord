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
  name: 'reset-threads-config',
  description: 'Permet de réinitialiser la configuration des threads.',
  execute: async (interaction: CommandInteraction) => {
    if (!interaction.memberPermissions?.has("Administrator")) {
      await interaction.reply('Seuls les administrateurs peuvent utiliser cette commande.');
      return;
    }
    threadConfig.channels = [];
    await interaction.reply({ content: 'Configuration réinitialisée.', ephemeral: true });
    await fs.writeFileSync(setupThreadsPath, JSON.stringify(threadConfig, null, 2));
  },
};