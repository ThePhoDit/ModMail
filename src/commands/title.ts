import Command from '../lib/structures/Command';

export default new Command('title', async (caller, cmd, log) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a title or write `removetitle` to remove the title.');
	const updated = await caller.db.updateLog(log!._id, 'title', cmd.args[0] === 'removetitle' ? '' : cmd.args.join(' '), cmd.args[0] === 'removetitle' ? 'UNSET' : 'SET');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'The title has been updated.');
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, 'The title could not be updated.');
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});