import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';

dotenv.config();

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('No token');

import * as https from 'https';

console.log('Starting standalone bot...');
const bot = new Telegraf(token, {
    telegram: {
        agent: new https.Agent({ family: 4 })
    }
});

bot.start((ctx) => ctx.reply('Working!'));
bot.on('text', (ctx) => {
    console.log('Received message:', ctx.message.text);
    ctx.reply('Echo: ' + ctx.message.text);
});

bot.launch().then(() => {
    console.log('Standalone bot launched successfully!');
}).catch((err) => {
    console.error('Standalone bot failed:', err);
});
