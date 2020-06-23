import { Client } from 'eris';
import { EventEmitter } from 'events';
import UtilsManager from '../utils/index';

class Caller extends EventEmitter {
	bot: Client;
	private utils: UtilsManager;
	constructor(private readonly token: string) {
		super();
		this.token = token;
		this.bot = new Client(this.token, {
			disableEvents: {
				TYPING_START: true
			},
			messageLimit: 500,
			restMode: true,
			allowedMentions: {
				roles: true,
				users: true,
				everyone: false
			},
			defaultImageFormat: 'png'
		});
		this.utils = new UtilsManager(this);
	}
	async login(): Promise<void> {
		this.bot.connect();
	}
}

export default Caller;