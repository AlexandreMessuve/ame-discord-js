import path from 'path';
import fs from 'fs/promises'; // Utilisation de fs/promises pour des promesses plutôt que des callbacks
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Client, GatewayIntentBits } from 'discord.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Map();

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
            client.commands.set(data.name, { data, execute });
        } else {
          console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
      }
    
  } catch (error) {
    console.error(`Error reading commands: ${error.message}`);
  }
}

readCommands();

export default client;
