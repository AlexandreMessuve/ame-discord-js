import { SlashCommandBuilder } from "discord.js";

const pingCommande = {
    data:  new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot is alive'),
    async execute(interation) {
        await interation.reply('Yes i\'m Alive');
    },
};

export default pingCommande;