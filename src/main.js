import 'dotenv/config';
import {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} from 'discord.js';
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



const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]

});
client.commands = new Collection();

["events", "commands", "errors"].forEach(async handler => {
  const handlerImport = await import(`./handlers/${handler}.js`);
  const handlerFunction = handlerImport.default;
  if (typeof handlerFunction === 'function') {
    await handlerFunction(client);
  } else{
    console.error(`[ERROR]: Invalid handler function in ./handlers/${handler}`);
  }
});

try{
await client.login(process.env.TOKEN);
}catch (e) {
    console.error(e);
}
