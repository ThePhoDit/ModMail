import Command from '../lib/structures/Command';

export default new Command('subscribe', async (caller, cmd, log) => {
	if (log!.subscriptions.includes(cmd.msg.author.id))
		return caller.utils.discord.createMessage(cmd.channel.id, 'You are already subscribed to this thread.');
	const updated = await caller.db.updateLog(log!._id, 'subscriptions', cmd.msg.author.id, 'PUSH');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'You will now receive notifications on new responses.');
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'There was an error subscribing you to this thread.');
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});