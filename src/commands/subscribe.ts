import Command from '../lib/structures/Command';

export default new Command('subscribe', async (caller, cmd, log) => {
	if (log!.subscriptions.includes(cmd.msg.author.id))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.subscribe.alreadySubscribed);
	const updated = await caller.db.updateLog(log!._id, 'subscriptions', cmd.msg.author.id, 'PUSH');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.subscribe.success);
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.subscribe.error);
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});