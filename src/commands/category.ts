import Command from '../lib/structures/Command';

export default new Command('category', async (caller, cmd, _log, config) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `create`, `edit`, `delete` or `list`.');
	if (!cmd.args[1] && ['show', 'list'].indexOf(cmd.args[0]) < 0) return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.noCategory);

	const categoryID = config.categories[cmd.args[1]];

	const list: string[] = [],
		categories: string[][] = [],
		s = 10;
	let categoriesRAW: Record<string, string>,
		category,
		updated;

	switch (cmd.args[0]) {
		// Create a category.
		case 'create': case 'add': case 'new':
			// Check if the category exists
			if (categoryID)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.exists);

			if (!cmd.args[2])
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.notFoundID);
			category = caller.bot.getChannel(cmd.args[2]);
			if (!category || category.type !== 4 || category.guild.id !== process.env.MAIN_GUILD_ID)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.notFoundID);

			updated = await caller.db.updateConfig(`categories.${cmd.args[1]}`, category.id);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.created);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.createdError);
			break;

		// Delete a snippet.
		case 'delete': case 'remove': case 'rmv':
			if (!categoryID)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.notFoundName);
			// eslint-disable-next-line no-case-declarations
			updated = await caller.db.updateConfig(`categories.${cmd.args[1]}`, '', 'UNSET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.deleted);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.deletedError);
			break;

		// Show all snippets
		case 'list': case 'show':
			categoriesRAW = config.categories;
			if (!categoriesRAW || Object.keys(categoriesRAW).length === 0)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.empty);

			for (const name of Object.keys(categoriesRAW))
				// @ts-ignore
				list.push(`${name} | ${caller.bot.getChannel(config.categories[name]).name}`);


			while (list.length > 0)
				categories.push(list.splice(0, s));
			// Send the list
			for (const s of categories)
				caller.utils.discord.createMessage(cmd.channel.id, `\`\`\`\n${caller.lang.commands.category.list}\n-----------\n${s.join('\n')}\`\`\``);
			break;
		default:
			caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.category.help);
			break;
	}
},
{
	level: 'ADMIN',
	aliases: []
});
