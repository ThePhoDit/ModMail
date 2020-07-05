import Caller from '../lib/structures/Caller';
import config from '../config';

export default async (caller: Caller): Promise<void> => {
	console.log('[BOT] Online.');
	caller.bot.editStatus('online', { name: config.bot_status || 'DM me for help.', type: 0 });
};