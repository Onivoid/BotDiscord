import { CommandInteraction } from "discord.js";
import fs from 'fs';
import path from 'path';
const setupThreadsPath = path.resolve(__dirname, '../settings/setupThreads.json');

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
    await fs.writeFileSync('src/settings/setupThreads.json', JSON.stringify(threadConfig, null, 2));
    await interaction.reply({ content: 'Configuration réinitialisée.', ephemeral: true });
  },
};