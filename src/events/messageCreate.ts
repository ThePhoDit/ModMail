import Mail from '../lib/structures/Mail';
import MessageEmbed from '../lib/structures/MessageEmbed';
import Axios from 'axios';
import { Message, MessageFile, TextChannel } from 'eris';
import { COLORS } from '../Constants';
import { LogDocument } from '../lib/types/Database';

export default async (caller: Mail, msg: Message): Promise<unknown> => {

	const config = (await caller.db.getConfig())!;
	const category = caller.bot.getChannel(config.mainCategoryID);
	// Check if the category exists.
	if (!category || category.type !== 4) return;

	let log: LogDocument | null | false;

	// If message is in DMs and is not by a bot.
	if (msg.channel.type === 1 && !msg.author.bot) {
		// Check if the user is blacklisted.
		if (config.blacklist.includes(msg.author.id)) return;

		log = await caller.db.getLog(msg.author.id, 'USER');

		// Checks for any images sent.
		const files: MessageFile[] = [];
		if (msg.attachments.length > 0) for (const file of msg.attachments) await Axios.get<Buffer>(file.url, { responseType: 'arraybuffer' })
			.then((response) => files.push({ file: response.data, name: file.filename }))
			.catch(() => false);

		// If there is no current open log for this user.
		if (!log) {
			// Creates the channel on the main server.
			const channel = await caller.utils.discord.createChannel(process.env.MAIN_GUILD_ID!, `${msg.author.username}-${msg.author.discriminator}`, 'GUILD_TEXT', {
				parentID: category.id,
				topic: msg.author.id
			});
			if (!channel)
				return caller.utils.discord.createMessage(msg.author.id, 'Sorry, an error has occurred when opening your thread. Please, contact an administrator.', true);

			// Creates the log.
			log = await caller.db.createLog({
				open: true,
				channelID: channel.id,
				recipient: {
					id: msg.author.id,
					username: msg.author.username,
					discriminator: msg.author.discriminator,
					avatarURL: msg.author.dynamicAvatarURL()
				},
				creator: {
					id: msg.author.id,
					username: msg.author.username,
					discriminator: msg.author.discriminator,
					avatarURL: msg.author.dynamicAvatarURL()
				}
			});

			// Sends messages both to the user and the staff.
			const userOpenEmbed = new MessageEmbed()
				.setTitle(config.embeds.creation.title)
				.setThumbnail(category.guild.dynamicIconURL())
				.setColor(config.embeds.creation.color)
				.setDescription(config.embeds.creation.description)
				.setFooter(config.embeds.creation.footer, config.embeds.creation.footerImageURL)
				.setTimestamp();
			const guildOpenEmbed = new MessageEmbed()
				.setTitle(config.embeds.staff.title)
				.setThumbnail(msg.author.dynamicAvatarURL())
				.setColor(config.embeds.staff.color)
				.setDescription(msg.content  || 'No content provided.')
				.addField('User', `${msg.author.username}#${msg.author.discriminator} \`[${msg.author.id}]\``)
				.addField('Past Threads', (await caller.db.numberOfPreviousLogs(msg.author.id)).toString())
				.setTimestamp();

			caller.utils.discord.createMessage(msg.author.id, { embed: userOpenEmbed.code }, true);

			// Who to mention?
			let content: string;
			switch (config.notificationRole) {
				case undefined:
					content = '';
					break;
				case 'everyone': case 'here':
					content = '@' + config.notificationRole;
					break;
				default:
					content = `<@&${config.notificationRole}>`;
					break;
			}
			(channel as TextChannel).createMessage({ content: content, embed: guildOpenEmbed.code }, files);
		}
		// If there is a current thread.
		else {
			const channel = category.channels.get(log.channelID);
			if (!channel)
				return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred, I cannot find your current channel. PLease, contact an administrator.', true);

			const guildEmbed = new MessageEmbed()
				.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
				.setColor(COLORS.RED)
				.setDescription(msg.content || 'No content provided.')
				.setTimestamp();
			if (files.length > 0) guildEmbed.addField('Files', `This message contains ${files.length} file${files.length > 1 ? 's' : ''}`);

			caller.utils.discord.createMessage(channel.id, { embed: guildEmbed.code }, false, files);
			msg.addReaction('✅').catch(() => false);
		}
		// Add message to the log.
		caller.db.appendMessage((log as LogDocument)._id, msg, 'RECIPIENT_REPLY');
	}

	// -------------------------
	// Messages sent out of DMs.
	const prefix = config.prefix;
	if (msg.author.bot) return;

	// Gets a log (if any)
	log = await caller.db.getLog(msg.channel.id);
	if (log && !(msg.content.startsWith(`${prefix}reply`) || msg.content.startsWith(`${prefix}r`)))
		caller.db.appendMessage(log._id, msg, 'INTERNAL');

	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.trim().split(/ +/g);
	if (args[0] === prefix) return;

	let command = args.shift();
	if (!command) return;
	command = command.slice(prefix.length);
	let cmd = caller.commands.get(command.toLowerCase()) || caller.commands.get(caller.aliases.get(command.toLowerCase()) as string);
	if (!cmd && config.aliases && config.aliases[command])
		cmd = caller.commands.get(config.aliases[command]);

	// If no command is found, try to look for a snippet.
	const snippet = config.snippets[command];
	if (!cmd && log && snippet && category.channels.has(msg.channel.id)) {
		if (!caller.utils.discord.checkPermissions(msg.member!, 'snippets', config))
			return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
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
		caller.utils.discord.createMessage(log.recipient.id, { embed: userEmbed.code }, true);

		// Add log to the DB.
		caller.db.appendMessage(log._id, msg, 'STAFF_REPLY', `[SNIPPET] ${snippet.content}`);
		return;
	}
	else if (!cmd) return;

	if (!caller.utils.discord.checkPermissions(msg.member!, cmd.name, config))
		return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
	if (cmd.options.threadOnly && (!log || !category.channels.has(msg.channel.id))) return;
	const channel = msg.channel as TextChannel;

	try {
		await cmd.run(caller, { msg, args, channel, category }, log, config);
	}
	catch (e) {
		caller.logger.error(e);
	}
};
