import Command from '../lib/structures/Command';

export default new Command('rename', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.rename.noName);
	cmd.channel.edit({
		name: cmd.args.join()
	})
		.then(() => caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.rename.success))
		.catch(() => caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.rename.error));
},
{
	level: 'ADMIN',
	threadOnly: true,
	aliases: []
});