import Mail from '../lib/structures/Mail';
import { Message } from 'eris';

export default async (caller: Mail, msg: Message): Promise<void> => {
	// Only in DMs
	if (!msg.author || !msg.channel.type || msg.channel.type !== 1) return;
	const log = await caller.db.getLog(msg.author.id, 'USER', true);
	if (!log) return;
	const message = log.messages.find((m) => m.id === msg.id);
	if (!message || message.type === 'INTERNAL') return;

	caller.db.editMessage(log, msg.id, '[DELETED] ' + msg.content);

	const guildMsg = await caller.utils.discord.fetchMessage(log.channelID, message.complementaryID!);
	if (!guildMsg || !guildMsg.embeds[0]) return;

	guildMsg.embeds[0].description = '[DELETED] ' + guildMsg.embeds[0].description;
	guildMsg.embeds[0].footer ? guildMsg.embeds[0].footer.text = 'DELETED' : guildMsg.embeds[0].footer = { text: 'DELETED' };
	guildMsg.edit({ embed: guildMsg.embeds[0] })
		.catch();
};