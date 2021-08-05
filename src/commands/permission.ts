import Command from '../lib/structures/Command';

// permission {level/commandName} {add/remove} {ID}
export default new Command('permission', async (caller, cmd, _log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, `Please, select the level o command name.\n\
		Levels: **regular**, **support** and **admin**.\nUsage: ${config.prefix}permission {levelName/commandName} {add/remove} {role ID/user ID}`);
	if (!cmd.args[1] || ['add', 'remove', 'rmv'].indexOf(cmd.args[1]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, 'Please, select `add` or `remove`.');
	if (!cmd.args[2])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Please, select a role or user ID.');

	if (cmd.args[1] === 'add')
		// Levels
		if (['ADMIN', 'SUPPORT', 'REGULAR'].indexOf(cmd.args[0].toUpperCase()) >= 0) {
			if (config.levelPermissions[cmd.args[0].toUpperCase() as ('REGULAR' | 'SUPPORT' | 'ADMIN')].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, 'That ID is already added to the specified permission.');

			const updated = await caller.db.updateConfig(`levelPermissions.${cmd.args[0].toUpperCase()}`, cmd.args[2], 'PUSH');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permission has been added.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permissions could not be added.');
		}
		// Commands
		else {
			const command = caller.commands.get(cmd.args[0].toLowerCase()) || caller.commands.get(caller.aliases.get(cmd.args[0].toLowerCase()) as  string);
			if (!command)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The specified command does not exist.');

			if (config.commandsPermissions && config.commandsPermissions[cmd.args[0].toLowerCase()] && config.commandsPermissions[cmd.args[0].toLowerCase()].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, 'That ID is already added to the specified permission.');

			const updated = await caller.db.updateConfig(`commandsPermissions.${command.name}`, cmd.args[2], 'PUSH');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permission has been added.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permissions could not be added.');
		}

	else if (cmd.args[1] === 'remove' || cmd.args[1] === 'rmv')
		// Levels
		if (['ADMIN', 'SUPPORT', 'REGULAR'].indexOf(cmd.args[0].toUpperCase()) >= 0) {
			if (!config.levelPermissions[cmd.args[0].toUpperCase() as ('REGULAR' | 'SUPPORT' | 'ADMIN')].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, 'That ID is not added to the specified permission.');

			const updated = await caller.db.updateConfig(`levelPermissions.${cmd.args[0].toUpperCase()}`, cmd.args[2], 'PULL');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permission has been removed.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permissions could not be removed.');
		}
		// Commands
		else {
			const command = caller.commands.get(cmd.args[0].toLowerCase()) || caller.commands.get(caller.aliases.get(cmd.args[0].toLowerCase()) as  string);
			if (!command)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The specified command does not exist.');

			if (!(config.commandsPermissions || config.commandsPermissions[cmd.args[0].toLowerCase()]) || !config.commandsPermissions[cmd.args[0].toLowerCase()].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, 'That ID is not added to the specified permission.');

			const updated = await caller.db.updateConfig(`commandsPermissions.${command.name}`, cmd.args[2], 'PULL');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permission has been removed.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The permissions could not be removed.');
		}
},
{
	level: 'ADMIN',
	aliases: []
});