import Command from '../lib/structures/Command';

export default new Command('alias', async (caller, cmd, _log, config) => {
	if (!cmd.args[0] || ['add', 'remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.noOption);
	if (!cmd.args[1])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.noName);
	if (caller.aliases.has(cmd.args[1]))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.reservedAlias);
	if (!cmd.args[2] && ['remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.noCommand);

	const command = caller.commands.get(cmd.args[2]);
	if (!command && ['remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.invalidCommand);

	if (cmd.args[0] === 'add') {
		if (config.aliases && config.aliases[cmd.args[1]])
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.alreadyExists);

		const updated = await caller.db.updateConfig(`aliases.${cmd.args[1]}`, command!.name);
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.created);
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.createdError);
	}
	else if (cmd.args[0] === 'remove' || cmd.args[0] === 'rmv') {
		if (!(config.aliases || config.aliases[cmd.args[1]]))
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.unknownAlias);

		const updated = await caller.db.updateConfig(`aliases.${cmd.args[1]}`, '', 'UNSET');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.deleted);
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.alias.deletedError);
	}

},
{
	level: 'ADMIN',
	aliases: ['aliases']
});