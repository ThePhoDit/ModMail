import Command from '../lib/structures/Command';

export default new Command('note', async (caller, cmd, log) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.note.noNote);
	const updated = await caller.db.updateLog(log!._id, 'note', cmd.args[0] === 'removenote' ? '' : cmd.args.join(' '), cmd.args[0] === 'removenote' ? 'UNSET' : 'SET');
	if (updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.note.success);
	if (!updated)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.note.error);
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});