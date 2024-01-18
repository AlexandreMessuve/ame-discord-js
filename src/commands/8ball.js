// Importing necessary modules
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import i18next from "i18next";

/**
 * Represents the 8ball command
 * @type {Object} eightBallCommand
 * @property {SlashCommandBuilder} data - The slash command builder object.
 * @property {Function} execute - The function that executes the 8ball command.
 */
const eightBallCommand = {
    // Defining the data property of the object
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('8ball Game')
        .setDescriptionLocalization('fr', 'Jeu du 8ball')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('This will be your question 8ball')
                .setDescriptionLocalization('fr', 'Ceci sera votre question pour le jeu 8ball')
                .setRequired(true)
        )
        .addStringOption(option  => 
            option.setName('lang')
                .setDescription('Define the language')
                .setDescriptionLocalization('fr', 'Défini le langage')
                .addChoices(
                    {name: 'English', value: 'en', name_localizations:{fr: 'Anglais'}},
                    {name: 'French', value: 'fr', name_localizations:{fr: 'Français'}})
                .setRequired(true)
            ),
    /**
     * Executes the 8ball command.
     * @param {Object} interaction - The interaction object.
     * @returns {Promise<void>}
     */
    async execute(interaction) {
        try {
            // Getting the question and language from the interaction options
            const question = await interaction.options.getString('question');
            const logo = '🎱 | ';

            // Creating the title for the embed using i18next
            const titleEmbed = i18next.t('eightBallEmbedTitle', { username: interaction.user.globalName, logo: logo });

            // Defining the choices for the 8ball game
            const choices = [
                'choice01',
                'choice02',
                'choice03',
                'choice04',
                'choice05',
                'choice06',
                'choice07',
                'choice08',
                'choice09',
                'choice10',
                'choice11',
                'choice12',
                'choice13',
                'choice14',
                'choice15',
                'choice16',
                'choice17',
                'choice18',
                'choice19',
                'choice20'
            ];

            // Generating a random number to select a choice from the choices array
            const ball = Math.floor(Math.random() * (choices.length));

            // Creating the first embed with the question
            const embed = new EmbedBuilder()
                .setColor('Purple')
                .setTitle(titleEmbed)
                .addFields({ name: 'Question', value: `${question}`, inline: true });

            // Creating the second embed with the question and the answer
            const embed2 = new EmbedBuilder()
                .setColor('Purple')
                .setTitle(titleEmbed)
                .addFields({ name: 'Question', value: `${question}`, inline: true })
                .addFields({ name: i18next.t('eightBallEmbedAnswer'), value: `${i18next.t(choices[ball],  {logo:logo})}`, inline: true });

            // Creating a button component
            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('button')
                        .setLabel(i18next.t('eightBallButton', {logo: logo}))
                        .setStyle(ButtonStyle.Primary)
                );

            // Sending the initial message with the embed and button components
            const msg = await interaction.reply({ embeds: [embed], components: [button] });

            // Creating a message component collector to listen for button clicks
            const collector = msg.createMessageComponentCollector();

            // Handling the button click event
            collector.on('collect', async i => {
                if (i.customId == 'button') {
                    // Updating the message with the second embed and removing the button component
                    i.update({ embeds: [embed2], components: [] });
                }
            });

        } catch (error) {
            console.error(error);
            interaction.reply('An error occured, please try later');
        }

    }
};


export default eightBallCommand;