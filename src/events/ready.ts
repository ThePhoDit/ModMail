import Mail from '../lib/structures/Mail';
import { CategoryChannel } from 'eris';

export default async (caller: Mail): Promise<void> => {
	let config = await caller.db.getConfig();

	// If there's no config, it creates one along with a category for the bot.
	if (!config) {
		const category: CategoryChannel | false = await caller.bot.createChannel(process.env.MAIN_GUILD_ID!, 'MODMAIL', 4, {
			permissionOverwrites: [
				{
					id: process.env.MAIN_GUILD_ID!,
					type: 'role',
					allow: 0,
					deny: 1024 // Read messages & View channel. This means only admins can see the category the first time.
				}
			]
		})
			.catch(() => false);

		if (!category) throw new Error('[INIT ERROR] A category could not be created. Please make sure I\'m inside the main guild and that I have the proper permissions.');

		caller.logger.debug('[INIT] Category created on main guild.');

		config = await caller.db.createConfig({
			mainCategoryID: category.id
		},
		process.env.MAIN_GUILD_ID!);

		if (!config) throw new Error('[DATABASE] Could not create a config for the selected guild.');
	}

	// Edits the Discord status from the bot.
	caller.bot.editStatus('online', {
		name: config.status || 'DM me for help.',
		type: 0
	});

	caller.logger.info(`[BOT] ${caller.bot.user.username} is ready.`);
};