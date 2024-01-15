import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder} from "discord.js";

const eightBallCommande = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('8ball Game')
        .addStringOption(option => 
            option.setName('question')
                .setDescription('This will be your question 8ball')
                .setRequired(true)
            ),
    async execute(interaction) {
        try {
            const question = await interaction.options.getString('question');
            const choices = [
                "🎱 | Yes, definitely ! ", 
                "🎱 | It is certain !", 
                "🎱 | Without a doubt !", 
                "🎱 | Yes, absolutely !",
                "🎱 | You can count on it !",
                "🎱 | As I see it, yes ! ",
                "🎱 | Very likely !",
                "🎱 | Yes !",
                "🎱 | Signs point to yes !",
                "🎱 | Reply hazy, try again !",
                "🎱 | Ask again later !",
                "🎱 | Better not tell you now !",
                "🎱 | Cannot predict now. !",
                "🎱 | Concentrate and ask again !",
                "🎱 | Don't count on it !",
                "🎱 | My sources say no !",
                "🎱 | Outlook not so good !",
                "🎱 | Very doubtful !",
                "🎱 | Outlook not good !",
                "🎱 | No !",
            
            ];
            const ball = Math.floor(Math.random() * (choices.length - 1));
            
            const embed = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(`🎱 | ${interaction.user.globalName}'s 8ball game`)
                .addFields({name: 'Question', value: `${question}`, inline:true});
    
            const embed2 = new EmbedBuilder()
                .setColor('Blue')
                .setTitle(`🎱 | ${interaction.user.globalName}'s 8ball game`)
                .addFields({name: 'Question', value: `${question}`, inline:true})
                .addFields({name: 'Answer', value: `${choices[ball]}`, inline:true});
    
            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('button')
                        .setLabel('🎱 Roll the ball !')
                        .setStyle(ButtonStyle.Primary)
    
                );
                
                const msg = await interaction.reply({embeds: [embed], components: [button]});
    
                const collector = msg.createMessageComponentCollector();
    
                collector.on('collect',async i => {
                    if(i.customId == 'button') {
                        i.update({embeds: [embed2], components: []});
                    }
                });
            
        } catch (error) {
            console.error(error);
            interaction.reply('An error occured, please try later');
        }

    }
};

export default eightBallCommande;