import Mail from '../lib/structures/Mail';

export default async (caller: Mail): Promise<void> => {
	const config = await caller.db.getConfig();

	// Edits the Discord status from the bot.
	caller.bot.editStatus('online', {
		name: config?.status || 'DM me for help.',
		type: 0
	});

	console.log(`[BOT] ${caller.bot.user.username} is ready.`);
};