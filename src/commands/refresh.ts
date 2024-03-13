import { CommandInteraction } from "discord.js";
import pm2 from 'pm2';

export default {
  name: 'refresh',
  description: 'Redémarre le bot',
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Redémarrage du bot...');
    pm2.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(2);
      }
      
      pm2.restart('dist/index.js', (err) => {
        pm2.disconnect();
        if (err) {
          throw err;
        }
      });
    });
  },
};