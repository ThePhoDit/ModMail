import Caller from '../lib/structures/Caller';
import { Channel, TextChannel } from 'eris';
import { Thread } from '../lib/types/Database';

export default async (caller: Caller, channel: Channel): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;
	// If not text or not in ModMail category.
	if (channel.type !== 0) return;
	if (!caller.logsChannel) return;
	const userDB: Thread = await caller.db.get(`threads.${(channel as TextChannel).topic}`);
	if (!userDB) return;
	if (!userDB.opened) return;

	const messages: string[] = [];
	for (const msg of (channel as TextChannel).messages.values()) {
		if (!msg.content && msg.embeds.length === 0) continue;
		messages.push(`${msg.author.id === (channel as TextChannel).topic ?
			'DM' : 'SERVER'} | ${msg.author.username}#${msg.author.discriminator} | ${msg.content ? msg.content : msg.embeds[0].description}`);
	}

	caller.db.set(`threads.${(channel as TextChannel).topic}`, { userID: userDB.userID, opened: false, current: null, total: userDB.total + 1 });
	await caller.utils.discord.createMessage(caller.logsChannel, `A thread from ${(channel as TextChannel).name} has been closed.`, false,
		{ name: `${(channel as TextChannel).name}-${Date.now()}.html`, file: Buffer.from(`
<html lang="en">
<head>
  <title>ModMail Logs</title>
  <meta name="description" content="Log of a closed thread.">
  <link rel="icon" href=${caller.bot.user.dynamicAvatarURL()} type="image/icon type">
</head>
<body>
	<h1>Thread Logs</h1><br><br>
	<h3>Message Location | Author | Content</h3><br>
  <p>${messages.join('<br>')}</p>
</body>
</html>
`)});
};