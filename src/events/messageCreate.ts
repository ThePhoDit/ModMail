import Caller from '../lib/structures/Caller';
import { Message } from 'eris';
import { Thread } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
import config from '../../config.json';
import { COLORS } from '../Constants';

export default async (caller: Caller, msg: Message): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	// If message is in DMs and is not by a bot.
	if (msg.channel.type === 1 && !msg.author.bot) {
		if ((await caller.db.get('blacklist') as string[]).includes(msg.author.id)) return;

		// Create Embed Messages.
		const userOpenEmbed = new MessageEmbed()
			.setTitle(config.messages.thread_open_title || 'Thread Opened')
			.setThumbnail(category.guild.dynamicIconURL())
			.setColor(COLORS.LIGHT_BLUE)
			.setDescription(config.messages.thread_open_main || 'Thank you for contacting the support team, we will reply to you as soo as possible.')
			.setFooter(config.messages.thread_open_footer || 'Please be patient.')
			.setTimestamp();
		const guildOpenEmbed = new MessageEmbed()
			.setTitle(config.messages.open_notification || 'New Thread')
			.setThumbnail(msg.author.dynamicAvatarURL())
			.setColor(COLORS.BLUE)
			.setDescription(msg.content)
			.addField('User', `${msg.author.username}#${msg.author.discriminator} \`[${msg.author.id}]\``)
			.setTimestamp();

		// Check whether a thread is opened or not.
		let userDB = await caller.db.get(`threads.${msg.author.id}`) as Thread;
		// If not in BD, thread is open. Set status to open and start thread.
		if (!userDB) {
			const channel = await caller.utils.discord.createChannel(category.guild.id, `${msg.author.username}#${msg.author.discriminator}`, 'GUILD_TEXT', {
				parentID: category.id,
				topic: msg.author.id
			});
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred.', true);
			userDB = {
				userID: msg.author.id,
				opened: true,
				current: channel.id,
				total: 1
			};
			caller.db.set(`threads.${msg.author.id}`, userDB);

			// Send message to the new chanel, then to the user.
			guildOpenEmbed.addField('Past Threads', userDB.total.toString());
			caller.utils.discord.createMessage(channel.id, { embed: guildOpenEmbed.code });
			caller.utils.discord.createMessage(msg.author.id, { embed: userOpenEmbed.code }, true);
		}
		// If not opened but in DB, opens a thread and changes DB status.
		else if (!userDB.opened) {}
		// If opened, just sends a message to the current channel.
		else {}
	}
};