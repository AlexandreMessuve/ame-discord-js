// Importing necessary modules
import axios from "axios";
import { SlashCommandBuilder, AttachmentBuilder } from "discord.js";
import i18next from "i18next";
import { Buffer } from 'node:buffer';



/**
 * Represents a slash command for sending a random pic.
 * @type {Object}picCommand
 * @property {SlashCommandBuilder} data - The data property of the object defining the slash command.
 * @property {Function} execute - The function that executes the command to retrieve and send a random image.
 */
const picCommand = {
    // Defining the data property of the object
    data: new SlashCommandBuilder()
        .setName('pic')
        .setDescription('Send a random pic')
        .setDescriptionLocalization('fr', 'Envoi une image aléatoire')
        .addStringOption(
            option => option.setName('category')
                .setDescription('The pic category')
                .setDescriptionLocalization('fr', 'Catégorie d\'image')
                .setChoices(
                    { name: 'Random category', value: 'random', name_localizations: { fr: 'Catégorie aléatoire' } },
                    { name: 'Nature', value: 'nature' },
                    { name: 'City', value: 'city', name_localizations: { fr: 'Ville' } },
                    { name: 'Technology', value: 'technology', name_localizations: { fr: 'Technologie' } },
                    { name: 'Food', value: 'food', name_localizations: { fr: 'Nourriture' } },
                    { name: 'Still Life', value: 'still_life', name_localizations: { fr: 'Nature morte' } },
                    { name: 'Wild Life', value: 'wildlife', name_localizations: { fr: 'Nature sauvage' } },
                    { name: 'Abstract', value: 'abstract', name_localizations: { fr: 'Abstrait' } },
                )
                .setRequired(true)
        ),
    /**
     * Executes the command to retrieve and send a random image based on the specified category.
     * @param {Interaction} interaction - The interaction object representing the command interaction.
     * @returns {Promise<void>} - A promise that resolves once the command execution is complete.
     */
    async execute(interaction) {
        const category = interaction.options.getString('category') === 'random' ? '' : interaction.options.getString('category');

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
                content: i18next.t('picMessage'),
                files: [picture]
            })
            console.log(`Send pic successful in ${interaction.member.guild.name}`);
        } catch (error) {
            console.error(error);
            await interaction.reply(i18next.t('errorMessage'));
        }
    },
};

export default picCommand;