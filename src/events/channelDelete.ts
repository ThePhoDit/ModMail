import Caller from '../lib/structures/Caller';
import { TextChannel } from 'eris';
import { UserDB } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
export default async (caller: Caller, channel: TextChannel): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	// If not text or not in ModMail category.
	if (channel.type !== 0) return;

	const userDB = await caller.db.getUser(channel.id, true) as UserDB;
	if (!userDB) return;
	if (userDB.channel === '0') return;

	caller.db.closeChannel(channel.id);

	if (!caller.logsChannel) return;
	const embed = new MessageEmbed()
		.setTitle('Thread Closed')
		.setColor('#FF0000')
		.setDescription(`The thread \`${channel.name}\` has been closed.\n${process.env.LOGS_URL}/logs/${userDB.logs}`);
	caller.utils.discord.createMessage(caller.logsChannel, { embed: embed.code });
};