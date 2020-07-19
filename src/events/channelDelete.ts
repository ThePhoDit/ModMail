import Caller from '../lib/structures/Caller';
import { Channel, TextChannel } from 'eris';
import { Thread } from '../lib/types/Database';
import { COLORS } from '../Constants';

export default async (caller: Caller, channel: Channel): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	// If not text or not in ModMail category.
	if (channel.type !== 0) return;
	const userDB: Thread = await caller.db.get(`mail.threads.${(channel as TextChannel).topic}`);
	if (!userDB) return;
	if (!userDB.opened) return;

	const messages: string[] = [];
	for (const msg of (channel as TextChannel).messages.values()) {
		if (!msg.content && msg.embeds.length === 0) continue;
		let location: string;
		// Location of the message.
		if (msg.embeds.length > 0 &&
			(msg.embeds[0].color === parseInt(COLORS.RED.replace('#', ''), 16) ||
				msg.embeds[0].color === parseInt(COLORS.BLUE.replace('#', ''), 16))) location = 'DM';
		else if (msg.embeds.length > 0) location = 'SERVER';
		else location = 'SERVER - Out Of Thread';
		// Message author
		const author = msg.embeds.length > 0 ? msg.embeds[0].author?.name || `${msg.author.username}#${msg.author.discriminator}` : `${msg.author.username}#${msg.author.discriminator}`;
		const content = msg.embeds.length > 0 && msg.embeds[0].description ? msg.embeds[0].description : msg.content;
		const files: string[] = [];
		if (msg.attachments.length > 0) for (const file of msg.attachments) files.push(file.url);
		messages.push(`${location} | ${author} | ${content} | ${files.join(' ')}`);
	}

	caller.db.set(`mail.threads.${(channel as TextChannel).topic}`, { userID: userDB.userID, opened: false, current: null, total: userDB.total + 1 });

	if (!caller.logsChannel) return;
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
	<h3>Message Location | Author | Content | Files</h3><br>
  <p>${messages.join('<br>')}</p>
</body>
</html>
`)});
};