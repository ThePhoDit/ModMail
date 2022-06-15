import Mail from '../lib/structures/Mail';

export default async (caller: Mail, error: Error & { code?: number }): Promise<void> => {
	if (!caller.bot) return;
	if (error.code?.valueOf() === 1006)
    		return console.log('[BOT] Connection reset by peer.');

	console.error(error);
};
