import interactionCreate from '../events/interactionCreate.js';
import ready from '../events/ready.js';
import { Events } from 'discord.js';


export default async(client)=> {
    await client.on(Events.ClientReady, async() => {
       await  ready(client);
    })
    await client.on(Events.InteractionCreate, async interaction => {
        await interactionCreate(interaction);
    })
}