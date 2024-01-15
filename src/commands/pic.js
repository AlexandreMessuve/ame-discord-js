import axios from "axios";
import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import { Buffer } from 'node:buffer';


const picCommande = {
    data: new SlashCommandBuilder()
        .setName('pic')
        .setDescription('Send a random pic')
        .addStringOption(
            option => option.setName('category')
                .setDescription('The pic category')
                .setChoices(
                    { name: 'Random category', value: 'random' },
                    { name: 'Nature', value: 'nature' },
                    { name: 'City', value: 'city' },
                    { name: 'Technology', value: 'technology' },
                    { name: 'Food', value: 'food' },
                    { name: 'Still Life', value: 'still_life' },
                    { name: 'Wild Life', value: 'wild_life' },
                    { name: 'Abstract', value: 'abstract' },
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const category = await interaction.options.getString('category') === 'random' ? '' : await interaction.options.getString('category');
        try {
            const resp = await axios.get(`https://api.api-ninjas.com/v1/randomimage?category=${category}`, {
                headers: {
                    'Accept': 'application/json',
                    'X-Api-Key': process.env.NINJA_API_KEY
                }
            });
            const buffer = new Buffer.from(resp.data, "base64");
            const picture = new AttachmentBuilder(buffer, { name: 'image.jpg' })
               await interaction.reply({
                content: 'Your pic here :',
                files: [picture]
               })
            console.log('Send pic successful');
        } catch (error) {
            console.error(error);
            await interaction.reply('An error occured, please try later');
        }



    },
};

export default picCommande;