import 'dotenv/config';

import {Events} from 'discord.js';
import client from './setupClient.js';



client.on(Events.ClientReady, () => {
    console.log(`Connected with ${client.user.tag}`)
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    
    if(!command){
        console.error(`No command match with ${interaction.commandName}`)
        return;
    }

    try{
        await command.execute(interaction);
    }catch(err){
        console.error(err);
        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: 'An error occured, try again later', ephemeral:true});
        }else{
            await interaction.reply({content:'An error occured, try again later', ephemeral:true});
        }
    }
});


client.login(process.env.TOKEN);