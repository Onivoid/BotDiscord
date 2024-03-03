import { ModalSubmitInteraction } from 'discord.js';
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

interface ThreadConfig {
  channels: string[];
}

const threadConfig: ThreadConfig = JSON.parse(fs.readFileSync(setupThreadsPath, 'utf-8'));

export default async (interaction: ModalSubmitInteraction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'setup-threads') {
    const channelIds: string[] = interaction.fields.getTextInputValue("channels").split(';');
    threadConfig.channels = threadConfig.channels.concat(channelIds)
      .filter((value, index, self) => self.indexOf(value) === index);
    await interaction.reply({ content: 'Channels configurés.', ephemeral: true });
    fs.writeFileSync(setupThreadsPath, JSON.stringify(threadConfig, null, 2));
  }
};