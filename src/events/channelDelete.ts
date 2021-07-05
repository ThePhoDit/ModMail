import Mail from '../lib/structures/Mail';
import { TextChannel } from 'eris';
import { UserDB } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
export default async (caller: Mail, channel: TextChannel): Promise<unknown> => {
	// If not text or not in ModMail category.
	if (channel.type !== 0) return;

	const config = await caller.db.getConfig();
	if (!config) return;
	if (channel.parentID !== config.mainCategoryID) return;

	const log = await caller.db.getLog(channel.id);
	if (!log) return;

	caller.db.updateLog(log._id, 'open', false);

	if (!caller.logsChannel) return;
	const embed = new MessageEmbed()
		.setTitle('Thread Closed')
		.setColor('#FF0000')
		.setDescription(`The thread \`${channel.name}\` has been closed.\n${process.env.LOGS_URL}/logs/${userDB.logs}`);
	caller.utils.discord.createMessage(caller.logsChannel, { embed: embed.code });
};