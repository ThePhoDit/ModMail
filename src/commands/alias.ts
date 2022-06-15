import Command from '../lib/structures/Command';

export default new Command('alias', async (caller, cmd, _log, config) => {
	if (!cmd.args[0] || ['add', 'remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, 'Please, use `add` or `remove`.');
	if (!cmd.args[1])
		return caller.utils.discord.createMessage(cmd.channel.id, 'You have to specify an alias.');
	if (caller.aliases.has(cmd.args[1]))
		return caller.utils.discord.createMessage(cmd.channel.id, 'You cannot use that alias name, it is a reserved alias for the bot.');
	if (!cmd.args[2] && ['remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, 'You have to specify the command that will be connected to the selected alias.');

	const command = caller.commands.get(cmd.args[2]);
	if (!command && ['remove', 'rmv'].indexOf(cmd.args[0]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, 'Command not found.');

	if (cmd.args[0] === 'add') {
		if (config.aliases && config.aliases[cmd.args[1]])
			return caller.utils.discord.createMessage(cmd.channel.id, 'That alias already exists.');

		const updated = await caller.db.updateConfig(`aliases.${cmd.args[1]}`, command!.name);
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'The alias has been created.');
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'The alias could not be created.');
	}
	else if (cmd.args[0] === 'remove' || cmd.args[0] === 'rmv') {
		if (!(config.aliases || config.aliases[cmd.args[1]]))
			return caller.utils.discord.createMessage(cmd.channel.id, 'That alias does not exists.');

		const updated = await caller.db.updateConfig(`aliases.${cmd.args[1]}`, '', 'UNSET');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'The alias has been removed.');
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'The alias could not be removed.');
	}

},
{
	level: 'ADMIN',
	aliases: ['aliases']
});