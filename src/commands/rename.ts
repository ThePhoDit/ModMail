import Command from '../lib/structures/Command';

export default new Command('rename', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a new channel name.');
	cmd.channel.edit({
		name: cmd.args.join()
	})
		.then(() => caller.utils.discord.createMessage(cmd.channel.id, 'The name has been edited.'))
		.catch(() => caller.utils.discord.createMessage(cmd.channel.id, 'There has been an error editing the name of the channel.'));
},
{
	level: 'ADMIN',
	threadOnly: true,
	aliases: []
});