import i18next from 'i18next';
export default async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    /**
     * Represents a command.
     * @type {Object}
     */
    const command = interaction.client.commands.get(interaction.commandName);
    
    if(!command){
        console.error(`No command match with ${interaction.commandName}`)
        return;
    }
    const lang = interaction.options.getString('lang');
    if(lang){
        await i18next.changeLanguage(lang, err => err ? console.log(err): null);
    }
    try{
        await command.execute(interaction);
    }catch(err){
        console.error(err);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: i18next.t('errorMessage'), ephemeral:true});
        }else{
            await interaction.reply({content:i18next.t('errorMessage'), ephemeral:true});
        }
    }
}