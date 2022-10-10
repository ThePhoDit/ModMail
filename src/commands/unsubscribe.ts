import Command from '../lib/structures/Command';

export default new Command('unsubscribe', async (caller, cmd, log) => {
	if (!log!.subscriptions.includes(cmd.msg.author.id))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.unsubscribe.notSubscribed);
	const updated = await caller.db.updateLog(log!._id, 'subscriptions', cmd.msg.author.id, 'PULL');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.unsubscribe.success);
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.unsubscribe.error);
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});