import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const rest = new REST('10').setToken(process.env.TOKEN);

(async () => {
    try{
        await rest.delete(Routes.applicationCommand(process.env.CLIENT_ID, process.env.COMMAND_ID))
        console.log('Command delete successful');
    }catch(err){
        console.error(err);
    }
})();