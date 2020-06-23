if (!process.env.TOKEN) throw new Error('[Bot Start] No token found.');

import Caller from './lib/structures/Caller';
const Client = new Caller(process.env.TOKEN);
Client.login();

