import Caller from '../lib/structures/Caller';
import {Message, TextChannel} from 'eris';
import { Thread } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
import config from '../../config.json';
import { COLORS } from '../Constants';

export default async (caller: Caller, msg: Message): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	let userDB = await caller.db.get(msg.channel.type === 1 && !msg.author.bot ? `threads.${msg.author.id}` : `threads.${(msg.channel as TextChannel).topic}`) as Thread | undefined;

	// If message is in DMs and is not by a bot.
	if (msg.channel.type === 1 && !msg.author.bot) {
		if ((await caller.db.get('blacklist') as string[]).includes(msg.author.id)) return;

		// Check whether a thread is opened or not.
		// If not in BD or not opened, thread is closed. Set status to open and start thread.
		if (!userDB || !userDB.opened || !userDB.current) {
			const channel = await caller.utils.discord.createChannel(category.guild.id, `${msg.author.username}#${msg.author.discriminator}`, 'GUILD_TEXT', {
				parentID: category.id,
				topic: msg.author.id
			});
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred.', true);
			// If not in DB, add it.
			if (!userDB) {
				userDB = {
					userID: msg.author.id,
					opened: true,
					current: channel.id,
					total: 1
				};
				caller.db.set(`threads.${msg.author.id}`, userDB);
			}

			// Send message to the new chanel, then to the user.
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
				.addField('Past Threads', userDB.total.toString())
				.setTimestamp();

			caller.utils.discord.createMessage(channel.id, { embed: guildOpenEmbed.code });
			caller.utils.discord.createMessage(msg.author.id, { embed: userOpenEmbed.code }, true);
		}
		// If opened, just sends a message to the current channel.
		else {
			const channel = category.channels.get(userDB.current);
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred.', true);

			const guildEmbed = new MessageEmbed()
				.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
				.setColor(COLORS.GREEN)
				.setDescription(msg.content)
				.setTimestamp();

			caller.utils.discord.createMessage(channel.id, { embed: guildEmbed.code });
		}
	}

	// Out of DMs section.
	const prefix = config.bot_prefix || '/';
	const prefixMatch = new RegExp(`${prefix}[a-z]|[A-Z]`);
	if (!msg.content.match(prefixMatch)) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift();
	if (!command) return;
	const cmd = caller.commands.get(command.toLowerCase()) || caller.commands.get(caller.aliases.get(command.toLowerCase()) as string);
	if (!cmd) return;

	if (!(config[`bot_${cmd.options.level.toLowerCase()}s` as keyof typeof config] as string[]).some(r => msg.member!.roles.includes(r))) return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
	if (cmd.options.threadOnly && (!userDB || !category.channels.has(msg.channel.id))) return;
	const channel = msg.channel as TextChannel;

	try {
		await cmd.run(caller, { msg, args, channel, category }, userDB);
	}
	catch (e) {
		console.error(e);
	}
};