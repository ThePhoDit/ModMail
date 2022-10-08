import Command from '../lib/structures/Command';

// permission {level/commandName} {add/remove} {ID}
export default new Command('permission', async (caller, cmd, _log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.noLevel.replace('%p', config.prefix));
	if (!cmd.args[1] || ['add', 'remove', 'rmv'].indexOf(cmd.args[1]) < 0)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.noOption);
	if (!cmd.args[2])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.noID);

	if (cmd.args[1] === 'add')
		// Levels+
		if (['ADMIN', 'SUPPORT', 'REGULAR'].indexOf(cmd.args[0].toUpperCase()) >= 0) {
			if (config.levelPermissions[cmd.args[0].toUpperCase() as ('REGULAR' | 'SUPPORT' | 'ADMIN')].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.alreadyExists);

			const updated = await caller.db.updateConfig(`levelPermissions.${cmd.args[0].toUpperCase()}`, cmd.args[2], 'PUSH');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.added);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.addedError);
		}
		// Commands
		else {
			const command = caller.commands.get(cmd.args[0].toLowerCase()) || caller.commands.get(caller.aliases.get(cmd.args[0].toLowerCase()) as  string);
			if (!command)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.unknownCommand);

			if (config.commandsPermissions && config.commandsPermissions[command.name] && config.commandsPermissions[command.name].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.alreadyExists);

			const updated = await caller.db.updateConfig(`commandsPermissions.${command.name}`, cmd.args[2], 'PUSH');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.added);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.addedError);
		}

	else if (cmd.args[1] === 'remove' || cmd.args[1] === 'rmv')
		// Levels
		if (['ADMIN', 'SUPPORT', 'REGULAR'].indexOf(cmd.args[0].toUpperCase()) >= 0) {
			if (!config.levelPermissions[cmd.args[0].toUpperCase() as ('REGULAR' | 'SUPPORT' | 'ADMIN')].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.notExists);

			const updated = await caller.db.updateConfig(`levelPermissions.${cmd.args[0].toUpperCase()}`, cmd.args[2], 'PULL');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.removed);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.removedError);
		}
		// Commands
		else {
			const command = caller.commands.get(cmd.args[0].toLowerCase()) || caller.commands.get(caller.aliases.get(cmd.args[0].toLowerCase()) as  string);
			if (!command)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.unknownCommand);

			if (!config.commandsPermissions || !config.commandsPermissions[command.name] || !config.commandsPermissions[command.name].includes(cmd.args[2]))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.notExists);

			const updated = await caller.db.updateConfig(`commandsPermissions.${command.name}`, cmd.args[2], 'PULL');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.removed);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.permission.removedError);
		}
},
{
	level: 'ADMIN',
	aliases: []
});