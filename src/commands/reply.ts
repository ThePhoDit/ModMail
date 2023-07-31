import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';
import { COLORS } from '../Constants';
import Axios from 'axios';
import { Message, FileContent } from 'eris';

export default new Command('reply', async (caller, cmd, log, config) => {
	if (!cmd.args[0] && cmd.msg.attachments.length === 0)
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.reply.noReply);
	const files: FileContent[] = [];
	if (cmd.msg.attachments.length > 0) for (const file of cmd.msg.attachments) await Axios.get<Buffer>(file.url, { responseType: 'arraybuffer' })
		.then((response) => files.push({ file: response.data, name: file.filename }))
		.catch(() => false);

	let footer = config.embeds.userReply.footer;
	// to avoid doing unnecessary requests, just do them if the footer contains $role$
	if (config.embeds.userReply.footer.includes('$role$')) {
		const sortedRoles = cmd.msg.member!.roles.map(r => cmd.channel.guild.roles.get(r)).sort((a, b) => {
			return b!.position - a!.position;
		});
		footer = footer.replace('$role$', sortedRoles[0]!.name);
	}

	const userEmbed = new MessageEmbed()
		.setAuthor(`${cmd.msg.author.username}${cmd.msg.author.discriminator === '0' ? '' : `#${cmd.msg.author.discriminator}`}`, cmd.msg.author.dynamicAvatarURL())
		.setColor(config.embeds.userReply.color)
		.setDescription(cmd.args.join(' ') || caller.lang.embeds.noContent)
		.setFooter(footer, config.embeds.userReply.footerImageURL)
		.setTimestamp();
	if (files.length > 0) userEmbed.addField(caller.lang.embeds.files, caller.lang.embeds.containsFiles.replace('%n', files.length.toString()).replace('%s', files.length > 1 ? 's' : ''));
	const channelEmbed = new MessageEmbed()
		.setAuthor(`${cmd.msg.author.username}${cmd.msg.author.discriminator === '0' ? '' : `#${cmd.msg.author.discriminator}`}`, cmd.msg.author.dynamicAvatarURL())
		.setColor(config.embeds.reply.color)
		.setDescription(cmd.args.join(' ') || caller.lang.embeds.noContent)
		.setTimestamp();

	const guildMsg = await caller.utils.discord.createMessage(cmd.channel.id, { embed: channelEmbed.code }, false, files);
	const userMsg = await caller.utils.discord.createMessage(log!.recipient.id, { embed: userEmbed.code }, true, files);
	if (!(guildMsg || userMsg))
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.unknown);

	// Remove schedules if any.
	if (log!.closureMessage) caller.db.updateLog(log!._id, 'closureMessage', '', 'UNSET');
	if (log!.scheduledClosure) {
		caller.db.updateLog(log!._id, 'scheduledClosure', '', 'UNSET');
		caller.db.updateLog(log!._id, 'closer', '', 'UNSET');
		const closureCancellationEmbed = new MessageEmbed()
			.setTitle(caller.lang.embeds.closureCancelled.title)
			.setDescription(caller.lang.embeds.closureCancelled.description)
			.setColor(COLORS.YELLOW);
		await caller.utils.discord.createMessage(cmd.channel.id, { embed: closureCancellationEmbed.code });
	}

	// Add log to the DB.
	caller.db.appendMessage(log!._id, cmd.msg, 'STAFF_REPLY', cmd.args.join(' '), (userMsg as Message).id, (guildMsg as Message).id);
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: ['r']
});
