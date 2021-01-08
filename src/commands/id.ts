import Command from '../lib/structures/Command';

export default new Command('id', async (caller, cmd, userDB) => {
	return caller.utils.discord.createMessage(cmd.channel.id, userDB!.user);
},
{
	level: 'HELPER',
	threadOnly: true,
	aliases: []
});