import { Message } from 'discord.js';
import fs from 'fs';

const threadConfig = JSON.parse(fs.readFileSync('src/settings/setupThreads.json', 'utf-8'));

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