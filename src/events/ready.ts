import Mail from '../lib/structures/Mail';
import { STATUSES } from '../Constants';

export default async (caller: Mail): Promise<void> => {
	const config = await caller.db.getConfig();

	// Edits the Discord status from the bot.
	caller.bot.editStatus('online', {
		name: config?.status || 'DM me for help.',
		type: config?.statusType as STATUSES ?? 0,
		url: config?.statusURL
	});

	// Find and close all scheduled threads every ten minutes.
	if (!caller.closingThreads) {
		caller.closingThreadsFunc(true);
		setInterval(async () => {
			const toClose = await caller.db.getClosingScheduledLogs();
			if (!toClose) return;

			for (const log of toClose)
				caller.utils.misc.closeThread(log, await caller.db.getConfig(), undefined, log.closureMessage);
		}, 300000); // 5 minutes
	}

	console.log(`[BOT] ${caller.bot.user.username} is ready.`);
};