import Command from '../lib/structures/Command';

// permission {level/command} {level/commandName} {ID}
export default new Command('permission', async (caller, cmd, _log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, `Please, select \`level\` or \`command\`.\n\
		Usage: ${config.prefix}permission {level/command} {levelName/commandName} {role ID/user ID}`);
	if (!cmd.args[1])
		return caller.utils.discord.createMessage(cmd.channel.id, `Please, select the level o command name.\n\
		Levels: **regular**, **support** and **admin**.`);
	if (!cmd.args[2])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Please, select a role or user ID.');
},
{
	level: 'ADMIN',
	aliases: []
});