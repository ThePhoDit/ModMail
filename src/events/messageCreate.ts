import Caller from '../lib/structures/Caller';
import { Message, TextChannel } from 'eris';
import { Thread } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
import config from '../config';
import { COLORS } from '../Constants';

export default async (caller: Caller, msg: Message): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	let userDB: Thread;

	// If message is in DMs and is not by a bot.
	if (msg.channel.type === 1 && !msg.author.bot) {
		const blacklist: string[] | null = await caller.db.get('mail.blacklist');
		if (blacklist?.includes(msg.author.id)) return;

		// If thread is opened.
		if (caller.db.has(`mail.threads.${msg.author.id}`) && (await caller.db.get(`mail.threads.${msg.author.id}`) as Thread).opened) {
			userDB = await caller.db.get(`mail.threads.${msg.author.id}`);
			const channel = category.channels.get(userDB.current!);
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred - 1.', true);

			const guildEmbed = new MessageEmbed()
				.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
				.setColor(COLORS.RED)
				.setDescription(msg.content)
				.setTimestamp();

			caller.utils.discord.createMessage(channel.id, {embed: guildEmbed.code});
		}
		// Not opened
		else {
			const channel = await caller.utils.discord.createChannel(category.guild.id, `${msg.author.username}-${msg.author.discriminator}`, 'GUILD_TEXT', {
				parentID: category.id,
				topic: msg.author.id
			});
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred - 2.', true);

			caller.db.set(`mail.threads.${msg.author.id}`, {
				userID: msg.author.id,
				opened: true,
				current: channel.id,
				total: caller.db.has(`mail.threads.${msg.author.id}`) ? (await caller.db.get(`mail.threads.${msg.author.id}`) as Thread).total++ : 1
			});
			userDB = await caller.db.get(`mail.threads.${msg.author.id}`);
			// Send message to the new chanel, then to the user.
			const userOpenEmbed = new MessageEmbed()
				.setTitle(config.messages.thread_open_title || 'Thread Opened')
				.setThumbnail(category.guild.dynamicIconURL())
				.setColor(COLORS.LIGHT_BLUE)
				.setDescription(config.messages.thread_open_main || 'Thank you for contacting the support team, we will reply to you as soon as possible.')
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

			caller.utils.discord.createMessage(msg.author.id, { embed: userOpenEmbed.code }, true);
			(channel as TextChannel).createMessage({ content: config.role_ping ? `<@&${config.role_ping}>` : '', embed: guildOpenEmbed.code });
		}
	}

	// Out of DMs section.
	userDB = await caller.db.get(`mail.threads.${(msg.channel as TextChannel).topic}`);
	const prefix = config.bot_prefix || '/';
	const prefixMatch = new RegExp(`${'\' + prefix}[a-z]|[A-Z]`);
	if (!msg.content.match(prefixMatch)) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift();
	if (!command) return;
	const cmd = caller.commands.get(command.toLowerCase()) || caller.commands.get(caller.aliases.get(command.toLowerCase()) as string);
	if (!cmd) return;

	if (!((config[`bot_${cmd.options.level.toLowerCase()}s` as keyof typeof config] as string[]).some(r => msg.member!.roles.includes(r)))) return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
	if (cmd.options.threadOnly && (!userDB || !category.channels.has(msg.channel.id))) return;
	const channel = msg.channel as TextChannel;

	try {
		await cmd.run(caller, { msg, args, channel, category }, userDB);
	}
	catch (e) {
		console.error(e);
	}
};
