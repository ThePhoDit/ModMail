import Command from '../lib/structures/Command';

export default new Command('move', async (caller, cmd, _log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a category name.');
	const categoryID = config.categories[cmd.args[0]];
	if (!categoryID)
		return caller.utils.discord.createMessage(cmd.channel.id, 'There is no category configured with such name.');

	const category = caller.bot.getChannel(categoryID);
	if (!category)
		return caller.utils.discord.createMessage(cmd.channel.id, 'There is no category configured with such name.');
	if (category.id === cmd.channel.parentID)
		return caller.utils.discord.createMessage(cmd.channel.id, 'This thread is already in the selected category.');

	const updated = cmd.channel.edit({ parentID: category.id })
		.then(() => true)
		.catch(() => false);
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'The channel could not be moved.');
	caller.utils.discord.createMessage(cmd.channel.id, 'Thread moved.');
},
{
	level: 'ADMIN',
	threadOnly: true,
	aliases: []
});