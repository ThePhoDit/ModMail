import config from '../../config';
import {  Client } from 'eris';
import { EventEmitter } from 'events';
import UtilsManager from '../utils/index';
import db from 'quick.db';
import { readdir } from 'fs';
import { join } from 'path';
import Command from './Command';

class Caller extends EventEmitter {
	bot: Client;
	commands: Map<string, Command>
	aliases: Map<string, string>
	managers: string[];
	helpers: string[];
	category: string;
	logsChannel: string;
	utils = new UtilsManager(this);
	db = db;
	constructor(private readonly token: string) {
		super();
		this.token = token;
		this.bot = new Client(this.token, {
			disableEvents: {
				TYPING_START: true
			},
			restMode: true,
			allowedMentions: {
				roles: true,
				users: true,
				everyone: false
			},
			defaultImageFormat: 'png'
		});
		this.commands = new Map<string, Command>();
		this.aliases = new Map<string, string>();

		this.managers = config.bot_managers || [];
		this.helpers = config.bot_helpers || [];
		this.category = config.bot_category || '';
		this.logsChannel = config.logs_channel || '';

		this.utils = new UtilsManager(this);
		this.db = db;

		readdir(join(__dirname, '..', '..', 'events'), async (error, files) => {
			if (error) return console.error(error);
			console.log(`[Event Handler] Loading a total of ${files.length} files.`);

			files.forEach(async (file) => {
				if (!file.endsWith('.js') || file.endsWith('.map')) return;
				let event = await import(`${join(__dirname, '..', '..', 'events')}/${file}`);
				const name = file.split('.')[0];
				console.log(`[Event Handler] Loading event ${name}.`);

				if ((event).default instanceof Function) {
					event = Object.assign(event.default, event);
					delete event.default;
				}

				try {
					this.bot.on(name, event.bind(null, this));
				} catch (e) {
					console.error(`[Event Handler] ${e}`);
				} finally {
					delete require.cache[join(__dirname, '..', '..', 'events')];
				}
			});
		});

		readdir(join(__dirname, '..', '..', 'commands'), (error, files) => {
			if (error) console.error(error);
			console.log(`[Command Handler] Loading a total of ${files.length} files.`);

			files.forEach(async (file) => {
				if (!file.endsWith('.js') || file.endsWith('.map')) return;
				try {
					let props: Command = await import(`${join(__dirname, '..', '..', 'commands')}/${file}`);

					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					if ((props as any).default instanceof Command) {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						props = Object.assign((props as any).default, props);
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						delete (props as any).default;
					}

					console.log(`[Command Handler] Loading command ${props.name}.`);

					this.commands.set(props.name, props);
					props.options.aliases.forEach((alias) => {
						this.aliases.set(alias, props.name);
					});
				} catch (e) {
					console.warn(`[Command Handler] Command ${file} failed to load.\nStack Trace: ${e.stack.split('\n', 5).join('\n')}`);
				}
			});
		});
	}
	async login(): Promise<void> {
		this.bot.connect();
	}
}

export default Caller;