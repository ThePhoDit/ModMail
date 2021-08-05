import Command from '../lib/structures/Command';

export default new Command('id', async (caller, cmd, log) => {
	return caller.utils.discord.createMessage(cmd.channel.id, log!.recipient.id);
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});