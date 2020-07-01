if (!process.env.BOT_TOKEN) throw new Error('[Bot Start] No token found.');

import Caller from './lib/structures/Caller';
const Client = new Caller(process.env.BOT_TOKEN);
Client.login();

