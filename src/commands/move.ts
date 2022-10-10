import Command from '../lib/structures/Command';
import {CategoryChannel } from 'eris';

export default new Command('move', async (caller, cmd, _log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.noCategory);
	const categoryID = config.categories[cmd.args[0]];
	if (!categoryID)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.notFound);

	const category = caller.bot.getChannel(categoryID);
	if (!category || !(category as CategoryChannel).permissionsOf(caller.bot.user.id).has(BigInt(60432)))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.notFound);
	if (category.id === cmd.channel.parentID)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.alreadyInCategory);

	// Check permissions to modify current channel's permissions.
	if (!cmd.channel.permissionsOf(caller.bot.user.id).has(BigInt(60432)))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.noPermission);

	const updated = cmd.channel.edit({ parentID: category.id })
		.then(() => true)
		.catch(() => false);
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.error);

	// Sync the permissions
	// Deletes the previous channel permissions.
	for (const permission of cmd.channel.permissionOverwrites.values())
		cmd.channel.deletePermission(permission.id);
	// Adds the new category's permissions.
	for (const permission of (category as CategoryChannel).permissionOverwrites.values())
		cmd.channel.editPermission(permission.id, permission.allow, permission.deny, permission.type);

	caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.move.success.replace('%s', (category as {name: string}).name));
},
{
	level: 'ADMIN',
	threadOnly: true,
	aliases: []
});