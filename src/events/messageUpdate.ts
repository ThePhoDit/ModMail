import Mail from '../lib/structures/Mail';
import { Message } from 'eris';
import { MessageObject } from '../lib/types/Discord';

export default async (caller: Mail, msg: Message, oldMsg: MessageObject | null): Promise<void> => {
	// Only in DMs
	if (!oldMsg || !msg.author || !msg.channel.type || msg.channel.type !== 1) return;
	const log = await caller.db.getLog(msg.author.id, 'USER', true);
	if (!log) return;
	const message = log.messages.find((m) => m.id === msg.id);
	if (!message || message.type !== 'RECIPIENT_REPLY') return;

	caller.db.editMessage(log, msg.id, msg.content);

	const guildMsg = await caller.utils.discord.fetchMessage(log.channelID, message.complementaryID!);
	if (!guildMsg || !guildMsg.embeds[0]) return;

	guildMsg.embeds[0].description = msg.content;
	guildMsg.embeds[0].footer ? guildMsg.embeds[0].footer.text = 'EDITED' : guildMsg.embeds[0].footer = { text: 'EDITED' };
	guildMsg.edit({ embed: guildMsg.embeds[0] })
		.catch();
};