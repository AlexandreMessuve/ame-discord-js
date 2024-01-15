import 'dotenv/config';
import path from 'path';
import fs from 'fs/promises'; // Utilisation de fs/promises pour des promesses plutôt que des callbacks
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Map();
const commands  = [];
const foldersPath = path.join(__dirname, 'commands');

async function readCommands() {
  try {
    const commandFiles = (await fs.readdir(foldersPath)).filter(file  => file.endsWith('.js'));

      for (const file of commandFiles) {
        const filePath = path.join(foldersPath, file);
        const command = await import(filePath);
        const data =  command.default.data;
        const execute  = command.default.execute;
        if (data && execute) {
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
}
await readCommands();

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
export default client;
