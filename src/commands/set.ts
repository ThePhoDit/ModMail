import Command from '../lib/structures/Command';
import Axios from 'axios';
import MessageEmbed from '../lib/structures/MessageEmbed';
import { COLORS } from '../Constants';

export default new Command('set', async (caller, cmd, _log, config) => {
	const invalidArgsEmbed = new MessageEmbed()
		.setTitle('Settings you can change of the bot.')
		.setColor(COLORS.GREEN)
		.setThumbnail(cmd.channel.guild.dynamicIconURL())
		.setDescription(`
\`avatar\`: send an image link to change the bot avatar.
\`username\`: change the bot username, not the nickname.
\`prefix\`: change the bot prefix (max length: 4).
\`category\`: send the ID of the category where you want new threads to open.
\`logs\`: send the ID of the channel where you want your logs to go to.
\`status\`: change the displayed status of your bot.
\`notification\`: send the role ID you want to be mentioned on thread creation.
\`embed_creation_title\`: the title of the embed sent to the user when the thread is opened.
\`embed_creation_description\`: the description of the embed sent to the user when the thread is opened.
\`embed_creation_color\`: the color (hex code) of the embed sent to the user when the thread is opened.
\`embed_creation_footer_text\`: the footer of the embed sent to the user when the thread is opened.
\`embed_creation_footer_image\`: the footer image of the embed sent to the user when the thread is opened.
\`embed_closure_title\`: the title of the embed sent to the user when the thread is closed.
\`embed_closure_description\`: the description of the embed sent to the user when the thread is closed.
\`embed_closure_color\`: the color (hex code) of the embed sent to the user when the thread is closed.
\`embed_closure_footer_text\`: the footer of the embed sent to the user when the thread is closed.
\`embed_closure_footer_image\`: the footer image of the embed sent to the user when the thread is closed.
\`embed_staff_title\`: the title of the embed sent to the staff when the thread is opened.
\`embed_staff_color\`: the color (hex code) of the embed sent to the staff when the thread is opened.`)
		.addField('Usage', `${config.prefix}set {parameter} {value}`);

	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, { embed: invalidArgsEmbed.code });
	if (!cmd.args[1] && cmd.msg.attachments.length === 0) return caller.utils.discord.createMessage(cmd.channel.id, 'Please, provide a value.');

	let updated: boolean;
	switch (cmd.args[0]) {
		case 'avatar':
			Axios.get<Buffer>(cmd.msg.attachments[0].url, { responseType: 'arraybuffer' }).then(response => {
				caller.bot.editSelf({ avatar: `data:image/${cmd.msg.attachments[0].filename.endsWith('png') ? 'png' : 'jpeg'};base64,${response.data.toString('base64')}` });
			});
			caller.utils.discord.createMessage(cmd.channel.id, 'Avatar edited.');
			break;

		case 'username': case 'name':
			caller.bot.editSelf({ username: cmd.args.slice(1).join(' ') }).catch(() => {
				return caller.utils.discord.createMessage(cmd.channel.id, 'Something went wrong.');
			} );
			caller.utils.discord.createMessage(cmd.channel.id, 'Username edited.');
			break;

		case 'prefix':
			if (cmd.args[1].length > 4)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The prefix cannot be over 4 characters.');
			updated = await caller.db.updateConfig('prefix', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The prefix has been changed.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The prefix could not be updated.');
			break;

		case 'category':
			// eslint-disable-next-line no-case-declarations
			const categoryChannel = caller.bot.getChannel(cmd.args[1]);
			if (!categoryChannel || categoryChannel.type !== 4)
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to select a valid channel.');

			updated = await caller.db.updateConfig('mainCategoryID', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The category where tickets are created has been changed.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The category could not be updated.');
			break;

		case 'logs':
			// eslint-disable-next-line no-case-declarations
			const logsChannel = caller.bot.getChannel(cmd.msg.channelMentions[0]) || caller.bot.getChannel(cmd.args[1]);
			if (!logsChannel || logsChannel.type !== 4)
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to select a valid channel.');

			updated = await caller.db.updateConfig('logsChannelID', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The channel where logs are sent has been changed.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The logging channel could not be updated.');
			break;

		case 'status':
			updated = await caller.db.updateConfig('status', cmd.args.slice(1).join(' '));
			if (updated) {
				caller.bot.editStatus('online', {
					name: cmd.args.slice(1).join(' '),
					type: 0
				});
				return caller.utils.discord.createMessage(cmd.channel.id, 'The status has been changed.');
			}
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The status could not be updated.');
			break;

		case 'notification':
			updated = await caller.db.updateConfig('notificationRole', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The notification role has been updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The notification role could not be updated.');
			break;

		case 'embed_creation_title':
			updated = await caller.db.updateConfig('embeds.creation.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Creation embed title updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The creation embed title could not be updated.');
			break;

		case 'embed_creation_description':
			updated = await caller.db.updateConfig('embeds.creation.description', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Creation embed description updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The creation embed description could not be updated.');
			break;

		case 'embed_creation_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid hex color.');

			updated = await caller.db.updateConfig('embeds.creation.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Creation embed color updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The creation embed color could not be updated.');
			break;

		case 'embed_creation_footer_text':
			updated = await caller.db.updateConfig('embeds.creation.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Creation embed footer updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The creation embed footer could not be updated.');
			break;

		case 'embed_creation_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/gm.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid link.');

			updated = await caller.db.updateConfig('embeds.creation.footerImageURL', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Creation embed description updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The creation embed description could not be updated.');
			break;

		case 'embed_closure_title':
			updated = await caller.db.updateConfig('embeds.closure.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Closure embed title updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The closure embed title could not be updated.');
			break;

		case 'embed_closure_description':
			updated = await caller.db.updateConfig('embeds.closure.description', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Closure embed description updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The closure embed description could not be updated.');
			break;

		case 'embed_closure_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid hex color.');

			updated = await caller.db.updateConfig('embeds.closure.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Closure embed color updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The closure embed color could not be updated.');
			break;

		case 'embed_closure_footer_text':
			updated = await caller.db.updateConfig('embeds.closure.footer', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Closure embed footer updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The closure embed footer could not be updated.');
			break;

		case 'embed_closure_footer_image':
			if (!(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/gm.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid link.');

			updated = await caller.db.updateConfig('embeds.closure.footerImageURL', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Closure embed description updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The closure embed description could not be updated.');
			break;

		case 'embed_staff_title':
			updated = await caller.db.updateConfig('embeds.staff.title', cmd.args.slice(1).join(' '));
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Staff embed title updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The staff embed title could not be updated.');
			break;

		case 'embed_staff_color':
			if (!(/^#[0-9A-F]{6}$/i.test(cmd.args[1])))
				return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid hex color.');

			updated = await caller.db.updateConfig('embeds.staff.color', cmd.args[1]);
			if (updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'Staff embed color updated.');
			if (!updated)
				return caller.utils.discord.createMessage(cmd.channel.id, 'The staff embed color could not be updated.');
			break;
		default:
			caller.utils.discord.createMessage(cmd.channel.id, { embed: invalidArgsEmbed.code });
			break;
	}
},
{
	aliases: ['s']
});