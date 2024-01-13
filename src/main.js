import 'dotenv/config';

import {Events} from 'discord.js';
import client from './setupClient.js';



client.on(Events.ClientReady, () => {
    console.log(`Connecté via ${client.user.tag}`)
});

client.on(Events.InteractionCreate, async interation => {
    if (!interation.isChatInputCommand()) return;

    const command = interation.client.commands.get(interation.commandName);
    
    if(!command){
        console.error(`No command match with ${interation.commandName}`)
        return;
    }

    try{
        await command.execute(interation);
    }catch(err){
        console.error(err);
        if(interation.replied || interation.deferred){
            await interation.followUp({content: 'Erreur en executant  la commande', ephemeral:true});
        }else{
            await interation.reply({content:'Erreur en executant la commande', ephemeral:true});
        }
    }
});


client.login(process.env.TOKEN);