import Caller from '../lib/structures/Caller';
import { Message, MessageFile, TextChannel } from 'eris';
import { UserDB } from '../lib/types/Database';
import MessageEmbed from '../lib/structures/MessageEmbed';
import config from '../config';
import { COLORS } from '../Constants';
import Axios from 'axios';

export default async (caller: Caller, msg: Message): Promise<unknown> => {
	const category = caller.bot.getChannel(caller.category);
	if (!category || category.type !== 4) return;

	let userDB: UserDB | null;

	// If message is in DMs and is not by a bot.
	if (msg.channel.type === 1 && !msg.author.bot) {
		userDB = await caller.db.getUser(msg.author.id);
		if (!userDB) {
			await caller.db.addUser(msg.author.id);
			userDB = await caller.db.getUser(msg.author.id) as UserDB;
		}

		// Check if user is in the blacklist.
		if (userDB.blacklisted) return;

		const files: MessageFile[] = [];
		if (msg.attachments.length > 0) for (const file of msg.attachments) await Axios.get<Buffer>(file.url, { responseType: 'arraybuffer' })
			.then((response) => files.push({ file: response.data, name: file.filename }))
			.catch(() => false);

		// If thread is opened.
		if (userDB.channel !== '0') {
			const channel = category.channels.get(userDB.channel);
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred - 1.', true);

			const guildEmbed = new MessageEmbed()
				.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
				.setColor(COLORS.RED)
				.setDescription(msg.content || 'No content provided.')
				.setTimestamp();
			if (files.length > 0) guildEmbed.addField('Files', `This message contains ${files.length} file${files.length > 1 ? 's' : ''}`);

			caller.utils.discord.createMessage(channel.id, {embed: guildEmbed.code}, false, files);
			msg.addReaction('✅');
		}
		// Not opened
		else {
			const channel = await caller.utils.discord.createChannel(category.guild.id, `${msg.author.username}-${msg.author.discriminator}`, 'GUILD_TEXT', {
				parentID: category.id,
				topic: msg.author.id
			});
			if (!channel) return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred - 2.', true);

			caller.db.boundChannel(msg.author.id, channel.id);
			userDB = await caller.db.getUser(msg.author.id) as UserDB;

			// Send message to the new channel, then to the user.
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
				.setDescription(msg.content  || 'No content provided.')
				.addField('User', `${msg.author.username}#${msg.author.discriminator} \`[${msg.author.id}]\``)
				.addField('Past Threads', userDB.threads.toString())
				.setTimestamp();
			if (files.length > 0) guildOpenEmbed.addField('Files', `This message contains ${files.length} file${files.length > 1 ? 's' : ''}`);

			caller.utils.discord.createMessage(msg.author.id, { embed: userOpenEmbed.code }, true);
			(channel as TextChannel).createMessage({ content: config.role_ping ? `<@&${config.role_ping}>` : '', embed: guildOpenEmbed.code }, files);
		}
	}

	// Out of DMs section.
	const prefix = config.bot_prefix || '/';

	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.trim().split(/ +/g);
	if (args[0] === prefix) return;

	let command = args.shift();
	if (!command) return;
	command = command.slice(prefix.length);
	const cmd = caller.commands.get(command.toLowerCase()) || caller.commands.get(caller.aliases.get(command.toLowerCase()) as string);

	userDB = await caller.db.getUser(msg.channel.id, true);

	// If no command is found, try to look for a snippet.
	const snippet = await caller.db.getSnippet(command);
	if (!cmd && userDB && snippet && category.channels.has(msg.channel.id)) {
		if (!((config.bot_helpers as string[]).some(r => msg.member!.roles.includes(r)))) return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
		const userEmbed = new MessageEmbed()
			.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
			.setColor(COLORS.RED)
			.setDescription(snippet.content)
			.setTimestamp();
		const channelEmbed = new MessageEmbed()
			.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
			.setColor(COLORS.GREEN)
			.setDescription(snippet.content)
			.setTimestamp();

		caller.utils.discord.createMessage(msg.channel.id, { embed: channelEmbed.code });
		caller.utils.discord.createMessage(userDB.user, { embed: userEmbed.code }, true);
		return;
	}
	else if (!cmd) return;

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
