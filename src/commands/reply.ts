import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';
import { COLORS } from '../Constants';
import Axios from 'axios';
import { MessageFile } from 'eris';

export default new Command('reply', async (caller, cmd, userDB) => {
	if (!cmd.args[0] && cmd.msg.attachments.length === 0) return caller.utils.discord.createMessage(cmd.channel.id, 'You must provide a reply.');
	const files: MessageFile[] = [];
	if (cmd.msg.attachments.length > 0) for (const file of cmd.msg.attachments) Axios.get<Buffer>(file.url, { responseType: 'arraybuffer' })
		.then((response) => files.push({ file: response.data, name: file.filename }))
		.catch(() => false);

	const userEmbed = new MessageEmbed()
		.setAuthor(`${cmd.msg.author.username}#${cmd.msg.author.discriminator}`, cmd.msg.author.dynamicAvatarURL())
		.setColor(COLORS.RED)
		.setDescription(cmd.args.join(' '))
		.setTimestamp();
	const channelEmbed = new MessageEmbed()
		.setAuthor(`${cmd.msg.author.username}#${cmd.msg.author.discriminator}`, cmd.msg.author.dynamicAvatarURL())
		.setColor(COLORS.GREEN)
		.setDescription(cmd.args.join(' '))
		.setTimestamp();

	caller.utils.discord.createMessage(cmd.channel.id, { embed: channelEmbed.code }, false, files);
	caller.utils.discord.createMessage(userDB!.userID, { embed: userEmbed.code }, true, files);
},
{
	level: 'HELPER',
	threadOnly: true,
	aliases: ['r']
});