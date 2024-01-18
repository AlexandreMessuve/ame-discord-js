import 'dotenv/config';

import {Events} from 'discord.js';
import client from './setupClient.js';
import i18next from 'i18next';
import fr from './locales/fr.json' assert {type: 'json'};
import en from './locales/en.json' assert {type: 'json'};

i18next.init({
    lng: 'en',
    resources: {
        en: {
            translation: en,
        },
        fr: {
            translation: fr
        },
    },
});


client.on(Events.ClientReady, () => {
    console.log(`Connected via ${client.user.username}`)
});

client.on(Events.InteractionCreate, async interaction => {
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
});


client.login(process.env.TOKEN);