import { Message } from 'discord.js';
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

export default async (message: Message) => {
  await message.fetch();
  if (message.thread) return;
  if (message.attachments.some(attachment => attachment.contentType?.startsWith('image/'))) {
    if (threadConfig.channels.includes(message.channel.id)) {
      await message.startThread({
        name: 'Discussion',
        autoArchiveDuration: 1440,
      });
    }
  }
};