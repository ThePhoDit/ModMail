import Command from '../lib/structures/Command';

export default new Command('userlogs', async (caller, cmd) => {
	if (!process.env.LOGS_URL)
		return caller.utils.discord.createMessage(cmd.channel.id, 'You have no logs URL configured.');
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a user ID.');
	const links = await caller.db.getUserLogs(cmd.args[0]);
	if (!links) return caller.utils.discord.createMessage(cmd.channel.id, 'No logs found.');

	// Send multiple messages if there are too many logs.
	const linksMap = links.map((log) => `<${process.env.LOGS_URL}log?id=${log._id}>`);
	const linksArray: string[][] = [];
	while (linksMap.length > 0)
		linksArray.push(linksMap.splice(0, 20));

	for (const logs of linksArray)
		caller.utils.discord.createMessage(cmd.channel.id, logs.join('\n'));
},
{
	level: 'SUPPORT',
	aliases: ['logs']
});