import Command from '../lib/structures/Command';
import Axios from 'axios';
import MessageEmbed from '../lib/structures/MessageEmbed';
import { COLORS, STATUSES } from '../Constants';
import { AnyChannel, TextChannel } from 'eris';
import ms from 'ms';
import {IConfig} from '../lib/types/Database';

export default new Command('set', async (caller, cmd, _log, config) => {
	const invalidArgsEmbed = new MessageEmbed()
		.setTitle(caller.lang.commands.set.title)
		.setColor(COLORS.GREEN)
		.setDescription(caller.lang.commands.set.description)
		.addField(caller.lang.commands.set.usage.title, caller.lang.commands.set.usage.description.replace('%p', config.prefix));

	if (cmd.channel.guild.dynamicIconURL())
		invalidArgsEmbed.setThumbnail(cmd.channel.guild.dynamicIconURL() as string);

	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, { embed: invalidArgsEmbed.code });
	if (!cmd.args[1] && cmd.msg.attachments.length === 0) return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.noValue);

	let updated: boolean;
	switch (cmd.args[0]) {
		case 'avatar':
			if (!cmd.msg.attachments[0])
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.noImage);
			Axios.get<Buffer>(cmd.msg.attachments[0].url, { responseType: 'arraybuffer' }).then(response => {
				caller.bot.editSelf({ avatar: `data:image/${cmd.msg.attachments[0].filename.endsWith('png') ? 'png' : 'jpeg'};base64,${response.data.toString('base64')}` })
					.catch((err) => {
						caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.avatar.error);
						console.log(err);
					});
			})
				.catch((err) => {
					caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.avatar.error);
					console.log(err);
				});
			await caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.avatar.success);
			break;

		case 'username': case 'name':
			caller.bot.editSelf({ username: cmd.args.slice(1).join(' ') }).catch(() => {
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.unknownError);
			} );
			await caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.usernameSuccess);
			break;

		case 'prefix':
			if (cmd.args[1].length > 4)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.prefix.error);
			updated = await caller.db.updateConfig('prefix', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.prefix.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.unknownError);
			break;

		case 'category':
			// eslint-disable-next-line no-case-declarations
			const categoryChannel = caller.bot.getChannel(cmd.args[1]);
			if (!categoryChannel || categoryChannel.type !== 4 || categoryChannel.guild.id !== process.env.MAIN_GUILD_ID)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.category.error);


			updated = await caller.db.updateConfig('mainCategoryID', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.category.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.unknownError);
			break;

		case 'logs':
			// eslint-disable-next-line no-case-declarations
			let logsChannel: AnyChannel;
			if (cmd.args[1] !== 'none') {
				logsChannel = cmd.msg.channelMentions[0] ? caller.bot.getChannel(cmd.msg.channelMentions[0]) || caller.bot.getChannel(cmd.args[1]) : caller.bot.getChannel(cmd.args[1]);
				if (!logsChannel || logsChannel.type !== 0)
					return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.logs.error);
			}

			updated = await caller.db.updateConfig('logsChannelID', cmd.args[1] === 'none' ? '' : (logsChannel! as TextChannel).id, cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.logs.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.unknownError);
			break;

		case 'status':
			updated = await caller.db.updateConfig('status', cmd.args.slice(1).join(' '));
			if (updated) {
				caller.bot.editStatus('online', {
					name: cmd.args.slice(1).join(' '),
					type: 0
				});
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.status.success);
			}
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.unknownError);
			break;

		case 'status_type':
			// eslint-disable-next-line no-case-declarations
			const type = STATUSES[cmd.args[1].toUpperCase() as keyof typeof STATUSES];
			if (!type || typeof type !== 'number')
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.statusType.help);

			if (type === 1 && (!cmd.args[2] || !cmd.args[2].match(/https:\/\/(www\.)?twitch\.tv\/.+|https:\/\/(www\.)?youtube\.com\/.+/g)))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.statusType.invalidTwitch);

			updated = await caller.db.updateConfig('statusType', type);
			if (updated) {
				const config = await caller.db.getConfig() as IConfig;
				if (config.status)
					caller.bot.editStatus('online', [{
						name: config.status,
						// @ts-ignore
						type: type,
						url: type === 1 ? cmd.args[2] : undefined
					}]);

				if (type === 1)
					caller.db.updateConfig('statusURL', cmd.args[2]);

				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.statusType.success);
			}
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.statusType.unknownError);
			break;

		case 'account_age':
			if (cmd.args[1] !== '0' && !cmd.args[1].match(/^[0-9]+(\.\d{1,2})?[m|h|d|w|y]$/))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.invalidFormat);
			// eslint-disable-next-line no-case-declarations
			const accountAge = ms(cmd.args[1]);
			if ((!accountAge && cmd.args[1] !== '0') || accountAge > 315569520000)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.invalidFormat);
			updated = await caller.db.updateConfig('accountAge', cmd.args[1] === '0' ? 0 : accountAge, cmd.args[1] === '0' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.unknownError);
			break;

		case 'guild_age':
			if (cmd.args[1] !== '0' && !cmd.args[1].match(/^[0-9]+(\.\d{1,2})?[m|h|d|w|y]$/))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.invalidFormat);
			// eslint-disable-next-line no-case-declarations
			const guildAge = ms(cmd.args[1]);
			if ((!guildAge && cmd.args[1] !== '0') || guildAge > 315569520000)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.invalidFormat);
			updated = await caller.db.updateConfig('guildAge', cmd.args[1] === '0' ? 0 : guildAge, cmd.args[1] === '0' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.accountAge.unknownError);
			break;

		case 'guild_age_id':
			// eslint-disable-next-line no-case-declarations
			const guild = caller.bot.guilds.get(cmd.args[1]);
			if (!guild)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.guildAge.invalidGuild);
			updated = await caller.db.updateConfig('guildAgeID', guild.id);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.guildAge.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.guildAge.unknownError);
			break;

		case 'notification':
			updated = await caller.db.updateConfig('notificationRole', cmd.args[1] === 'none' ? '' : cmd.msg.roleMentions[0] || cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.notification.success);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.notification.unknownError);
			break;

		case 'exclude_internal_logs':
			updated = await caller.db.updateConfig('excludeInternalLogs', cmd.args[1].toLowerCase() === 'true');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, cmd.args[1].toLowerCase() === 'true' ? caller.lang.commands.set.excludeInternalLogs.isExcluded : caller.lang.commands.set.excludeInternalLogs.isIncluded);
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.excludeInternalLogs.unknownError);
			break;

		case 'embed_creation_title':
			updated = await caller.db.updateConfig('embeds.creation.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('title'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('title'));
			break;

		case 'embed_creation_thumbnail':
			updated = await caller.db.updateConfig('embeds.creation.thumbnail', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('thumbnail'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('thumbnail'));
			break;

		case 'embed_creation_description':
			updated = await caller.db.updateConfig('embeds.creation.description', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('description'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('description'));
			break;

		case 'embed_creation_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.creation.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('color'));
			break;

		case 'embed_creation_footer_text':
			updated = await caller.db.updateConfig('embeds.creation.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('footer'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('footer'));
			break;

		case 'embed_creation_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:\w*))?)/gm.test(cmd.args[1])) && cmd.args[1] !== 'none')
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidLink);

			updated = await caller.db.updateConfig('embeds.creation.footerImageURL', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.success('footer image'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedCreation.unknownError('footer image'));
			break;

		case 'embed_contact_title':
			updated = await caller.db.updateConfig('embeds.contact.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('title'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('title'));
			break;

		case 'embed_contact_thumbnail':
			updated = await caller.db.updateConfig('embeds.contact.thumbnail', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('thumbnail'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('thumbnail'));
			break;

		case 'embed_contact_description':
			updated = await caller.db.updateConfig('embeds.contact.description', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('description'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('description'));
			break;

		case 'embed_contact_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.contact.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('color'));
			break;

		case 'embed_contact_footer_text':
			updated = await caller.db.updateConfig('embeds.contact.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('footer'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('footer'));
			break;

		case 'embed_contact_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:\w*))?)/gm.test(cmd.args[1])) && cmd.args[1] !== 'none')
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidLink);

			updated = await caller.db.updateConfig('embeds.contact.footerImageURL', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.success('footer image'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedContact.unknownError('footer image'));
			break;

		case 'embed_reply_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.reply.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedReply.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedReply.unknownError('color'));
			break;

		case 'embed_userReply_footer_text':
			updated = await caller.db.updateConfig('embeds.userReply.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.success('footer'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.unknownError('footer'));
			break;

		case 'embed_userReply_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??[-+=&;%@.\w_]*#?(?:\w*))?)/gm.test(cmd.args[1])) && cmd.args[1] !== 'none')
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidLink);

			updated = await caller.db.updateConfig('embeds.userReply.footerImageURL', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.success('footer image'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.unknownError('footer image'));
			break;

		case 'embed_userReply_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.userReply.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedUserReply.unknownError('color'));
			break;

		case 'embed_closure_title':
			updated = await caller.db.updateConfig('embeds.closure.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('title'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('title'));
			break;

		case 'embed_closure_thumbnail':
			updated = await caller.db.updateConfig('embeds.closure.thumbnail', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('thumbnail'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('thumbnail'));
			break;

		case 'embed_closure_description':
			updated = await caller.db.updateConfig('embeds.closure.description', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('description'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('description'));
			break;

		case 'embed_closure_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.closure.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('color'));
			break;

		case 'embed_closure_footer_text':
			updated = await caller.db.updateConfig('embeds.closure.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('footer'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('footer'));
			break;

		case 'embed_closure_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)/gm.test(cmd.args[1])) && cmd.args[1] !== 'none')
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidLink);

			updated = await caller.db.updateConfig('embeds.closure.footerImageURL', cmd.args[1] === 'none' ? '' : cmd.args[1], cmd.args[1] === 'none' ? 'UNSET' : 'SET');
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.success('footer image'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedClosure.unknownError('footer image'));
			break;

		case 'embed_staff_title':
			updated = await caller.db.updateConfig('embeds.staff.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedStaff.success('title'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedStaff.unknownError('title'));
			break;

		case 'embed_staff_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.errors.invalidHexColor);

			updated = await caller.db.updateConfig('embeds.staff.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedStaff.success('color'));
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.set.embedStaff.unknownError('color'));
			break;
		default:
			await caller.utils.discord.createMessage(cmd.channel.id, { embed: invalidArgsEmbed.code });
			break;
	}
},
{
	aliases: ['s']
});