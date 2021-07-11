import Command from '../lib/structures/Command';

export default new Command('userlogs', async (caller, cmd) => {
	if (!process.env.LOGS_URL)
		return caller.utils.discord.createMessage(cmd.channel.id, 'You have no logs URL configured.');
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a user ID.');
	const links = await caller.db.getUserLogs(cmd.args[0]);
	if (!links) return caller.utils.discord.createMessage(cmd.channel.id, 'No logs found.');

	caller.utils.discord.createMessage(cmd.channel.id, links.map((log) => `${process.env.LOGS_URL}logs?id=${log._id}`).join('\n'));
},
{
	level: 'SUPPORT',
	aliases: ['logs']
});