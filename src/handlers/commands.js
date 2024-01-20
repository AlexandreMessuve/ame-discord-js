import path from 'path';
import fs from 'fs/promises';
import { REST, Routes} from 'discord.js';

const commands = async(client) => {
    const commands = [];
    const foldersPath = process.env.PATHFILE+'commands/';
    try {
        const commandFiles = (await fs.readdir(foldersPath)).filter(file  => file.endsWith('.js'));
          for (const file of commandFiles) {
            const filePath = path.join(foldersPath, file);
            const props = await import(filePath);
            const data =  props.default.data;
            const execute  = props.default.execute;

            const command = {data, execute};
            if (command) {
                commands.push(data);
                client.commands.set(data.name, { data, execute });
            } else {
              console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
      } catch (error) {
        console.error(error);
        console.error(`Error reading commands: ${error.message}`);
      }
    
      client.once('ready', async () => {
        const rest = new REST('10').setToken(process.env.TOKEN);
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
      })
}

export default commands;