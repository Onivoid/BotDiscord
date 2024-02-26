
import { ActionRowBuilder, CommandInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export default {
  name: 'setup-threads',
  description: 'Permet d\'initialiser les threads automatique sur un salon.',
  execute: async (interaction: CommandInteraction) => {
    if (!interaction.memberPermissions?.has("Administrator")) {
      await interaction.reply('Seuls les administrateurs peuvent utiliser cette commande.');
      return;
    }
    const modal = new ModalBuilder()
        .setTitle("Modal")
        .setCustomId(`setup-threads`)
        .setComponents(
            new ActionRowBuilder({
                components: [
                    new TextInputBuilder() 
                      .setLabel("Insérer les ID de channels (22;33)")
                      .setCustomId("channels").setStyle(TextInputStyle.Short),
                ],
            })
        )
    await interaction.showModal(modal).catch(console.error);
  },
};