import Command from '../lib/structures/Command';

export default new Command('unsubscribe', async (caller, cmd, log) => {
	if (!log!.subscriptions.includes(cmd.msg.author.id))
		return caller.utils.discord.createMessage(cmd.channel.id, 'You are not subscribed to this thread.');
	const updated = await caller.db.updateLog(log!._id, 'subscriptions', cmd.msg.author.id, 'PULL');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'You will not receive any longer notifications on new responses.');
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'There was an error unsubscribing you to this thread.');
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});