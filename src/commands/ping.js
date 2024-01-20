import { SlashCommandBuilder } from "discord.js";
import i18next from "i18next";
const pingCommand = {
    data:  new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check if the bot is online')
        .setDescriptionLocalization('fr', 'Regarde si le bot est en ligne.'),

    async execute(interaction) {
        console.log(interaction);
        await interaction.reply(i18next.t('pingMessage'));
    },
};

export default pingCommand;