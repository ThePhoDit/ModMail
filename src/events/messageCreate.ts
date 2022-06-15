import Mail from '../lib/structures/Mail';
import MessageEmbed from '../lib/structures/MessageEmbed';
import Axios from 'axios';
import {CategoryChannel, Message, FileContent, TextChannel} from 'eris';
import { COLORS } from '../Constants';
import { LogDocument } from '../lib/types/Database';

export default async (caller: Mail, msg: Message): Promise<unknown> => {

	if (msg.author.bot) return;

	let config = (await caller.db.getConfig());
	// Setup command.
	if (!config && msg.member?.permission.has('administrator') && msg.channel.type === 0 && msg.content === '+setup') {
		const category: CategoryChannel | false = await caller.bot.createChannel(process.env.MAIN_GUILD_ID!, 'MODMAIL', 4, {
			permissionOverwrites: [
				{
					id: process.env.MAIN_GUILD_ID!,
					type: 0,
					allow: 0,
					deny: 1024 // Read messages & View channel. This means only admins can see the category the first time.
				}
			]
		})
			.catch(() => false);
		if (!category)
			return caller.utils.discord.createMessage(msg.channel.id, 'A category could not be created. Setup cancelled.');

		config = await caller.db.createConfig({
			mainCategoryID: category.id,
			levelPermissions: {
				ADMIN: msg.author.id === msg.channel.guild.ownerID ? [msg.author.id] : [msg.channel.guild.ownerID, msg.author.id],
				SUPPORT: [],
				REGULAR: [msg.channel.guild.id]
			}
		});
		if (!config)
			return caller.utils.discord.createMessage(msg.channel.id, 'The config could not be added to the database. Setup cancelled.');

		return caller.utils.discord.createMessage(msg.channel.id, 'Server completely setup. A ModMail category has been created for you.');
	}
	else if (!config) return;

	const category = caller.bot.getChannel(config.mainCategoryID);
	// Check if the category exists.
	if (!category || category.type !== 4) return;

	let log: LogDocument | null | false;

	// If message is in DMs and is not by a bot.
	if (!msg.guildID) {
		// Check if the user is blacklisted.
		if (config.blacklist.includes(msg.author.id)) return;

		log = await caller.db.getLog(msg.author.id, 'USER');

		// Checks for any images sent.
		const files: FileContent[] = [];
		if (msg.attachments.length > 0) for (const file of msg.attachments) await Axios.get<Buffer>(file.url, { responseType: 'arraybuffer' })
			.then((response) => files.push({ file: response.data, name: file.filename }))
			.catch(() => false);

		// If there is no current open log for this user.
		let channelMessage: Message | false;
		if (!log) {
			// Check for account and guild ages.
			if (config.accountAge && config.accountAge > (Date.now() - msg.author.createdAt))
				return caller.utils.discord.createMessage(msg.author.id, 'Your account is not old enough to contact the staff.', true);

			if (config.guildAge) {
				const guild = config.guildAgeID ?
					caller.bot.guilds.get(config.guildAgeID) :
					category.guild;
				if (guild) {
					const guildMember = guild.members.get(msg.author.id);
					if (!guildMember)
						return caller.utils.discord.createMessage(msg.author.id, 'Your account has not been in the server long enough to contact the staff.', true);
					if (config.guildAge > (Date.now() - guildMember.joinedAt!))
						return caller.utils.discord.createMessage(msg.author.id, 'Your account has not been in the server long enough to contact the staff.', true);
				}
			}

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
				.setColor(config.embeds.creation.color)
				.setDescription(config.embeds.creation.description)
				.setFooter(config.embeds.creation.footer, config.embeds.creation.footerImageURL)
				.setTimestamp();
			if (config.embeds.creation.thumbnail)
				userOpenEmbed.setThumbnail(config.embeds.creation.thumbnail);
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
			channelMessage = await (channel as TextChannel).createMessage({ content: content, embed: guildOpenEmbed.code }, files);
		}
		// If there is a current thread.
		else {
			const channel = category.guild.channels.get(log.channelID);
			if (!channel)
				return caller.utils.discord.createMessage(msg.author.id, 'An error has occurred, I cannot find your current channel. Please, contact an administrator.', true);

			const guildEmbed = new MessageEmbed()
				.setAuthor(`${msg.author.username}#${msg.author.discriminator}`, msg.author.dynamicAvatarURL())
				.setColor(COLORS.RED)
				.setDescription(msg.content || 'No content provided.')
				.setTimestamp();
			if (files.length > 0) guildEmbed.addField('Files', `This message contains ${files.length} file${files.length > 1 ? 's' : ''}`);

			// Look for subscribers
			const content = log.subscriptions.map((userID) => `<@${userID}>`).join(' ');

			channelMessage = await caller.utils.discord.createMessage(channel.id, { content: content, embed: guildEmbed.code }, false, files);
			if (!channelMessage)
				return caller.utils.discord.createMessage(msg.author.id, 'Could not send your message to the staff.', true);
			msg.addReaction('✅').catch(() => false);

			// Remove schedules if any.
			if (log.closureMessage) caller.db.updateLog(log._id, 'closureMessage', '', 'UNSET');
			if (log.scheduledClosure) {
				caller.db.updateLog(log._id, 'scheduledClosure', '', 'UNSET');
				caller.db.updateLog(log._id, 'closer', '', 'UNSET');
				const closureCancellationEmbed = new MessageEmbed()
					.setTitle('Closure Cancelled')
					.setDescription('This ticket will no longer be closed due to ticket activity.')
					.setColor(COLORS.YELLOW);
				caller.utils.discord.createMessage(channel.id, { embed: closureCancellationEmbed.code });
			}
		}
		// Add message to the log.
		return caller.db.appendMessage((log as LogDocument)._id, msg, 'RECIPIENT_REPLY', undefined, channelMessage.id);
	}

	// -------------------------
	// Messages sent out of DMs.
	const prefix = config.prefix;

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
	if (!cmd && log && config.snippets && config.snippets[command] && category.channels.has(msg.channel.id)) {
		if (!caller.utils.misc.checkPermissions(msg.member!, 'snippet', config))
			return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');

		const snippet = config.snippets[command];
		const userEmbed = new MessageEmbed()
			.setAuthor(snippet.anonymous ? 'Staff Reply' : `${msg.author.username}#${msg.author.discriminator}`, snippet.anonymous ? (msg.channel as TextChannel).guild.dynamicIconURL() || undefined : msg.author.dynamicAvatarURL())
			.setColor(COLORS.RED)
			.setDescription(snippet.content)
			.setTimestamp();
		const channelEmbed = new MessageEmbed()
			.setAuthor(snippet.anonymous ? 'Staff Reply' : `${msg.author.username}#${msg.author.discriminator}`, snippet.anonymous ? (msg.channel as TextChannel).guild.dynamicIconURL() || undefined : msg.author.dynamicAvatarURL())
			.setColor(COLORS.LIGHT_BLUE)
			.setDescription(snippet.content)
			.setTimestamp();

		const guildMsg = await caller.utils.discord.createMessage(msg.channel.id, { embed: channelEmbed.code });
		const userMsg = await caller.utils.discord.createMessage(log.recipient.id, { embed: userEmbed.code }, true);
		if (!(guildMsg || userMsg))
			return caller.utils.discord.createMessage(msg.channel.id, 'There has been an error sending this snippet.');

		// Add log to the DB.
		caller.db.appendMessage(log._id, msg, 'STAFF_REPLY', `[SNIPPET] ${snippet.content}`, (userMsg as Message).id, (guildMsg as Message).id);
		return;
	}
	else if (!cmd) return;

	if (!caller.utils.misc.checkPermissions(msg.member!, cmd.name, config))
		return caller.utils.discord.createMessage(msg.channel.id, 'Invalid permissions.');
	if (cmd.options.threadOnly && (!log)) return;
	const channel = msg.channel as TextChannel;

	try {
		await cmd.run(caller, { msg, args, channel, category }, log, config);
	}
	catch (e) {
		console.error(e);
	}
};
