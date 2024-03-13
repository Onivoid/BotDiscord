import dotenv from 'dotenv';
dotenv.config();
const TOKEN: string = process.env.DISCORD_TOKEN || '';

import { ActivityOptions, ActivityType, Client, GatewayIntentBits } from 'discord.js';
import { REST, Routes } from 'discord.js';
import commands from './commands';
import events from './events';

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMembers] });
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.once('ready', async () => {
  console.log(`${client.user!.tag} is logged in \n
    Invitation : https://discord.com/oauth2/authorize?client_id=${client.user!.id}&scope=bot&permissions=27648860222`);

    const guildId = '267312518463094788';
    const guild = await client.guilds.cache.get(guildId);
    if (guild) {
      const activity: ActivityOptions = {
        name: `${guild.memberCount} membres 👀`,
        type: ActivityType.Watching,
      };
      setInterval(() => {
        client.user?.setActivity(activity);
      }, 1000 * 60 * 60);
    }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = commands.find(cmd => cmd.name === interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

for (const [event, handler] of Object.entries(events)) {
  client.on(event as any, handler);
}

client.login(TOKEN);