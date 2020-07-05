import dotenv from 'dotenv';
import { keepAlive } from './server';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Monitor = require('ping-monitor');
dotenv.config();
if (!process.env.BOT_TOKEN) throw new Error('[Bot Start] No token found.');

if (process.env.HOST && process.env.HOST == 'REPLIT') {
	if (!process.env.URL) throw new Error('[REPL.IT] Provide an URL.');
	keepAlive();
	const monitor = new Monitor({
		website: process.env.URL,
		title: 'ModMail',
		interval: 15 // minutes
	});

	monitor.on('up', (res: { website: string; }) => console.log(`${res.website} is up.`));
	monitor.on('down', (res: { website: string; statusMessage: string; }) => console.log(`${res.website} is down - ${res.statusMessage}`));
	monitor.on('stop', (website: string) => console.log(`${website} has stopped.`)	);
	monitor.on('error', (error: Error) => console.log(error));
}

import Caller from './lib/structures/Caller';
const Client = new Caller(process.env.BOT_TOKEN);
Client.login();

