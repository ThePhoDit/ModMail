import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';
import {COLORS} from '../Constants';

export default new Command('reply', async (caller, cmd, userDB) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'You must provide a reply.');

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

	caller.utils.discord.createMessage(cmd.channel.id, { embed: channelEmbed.code });
	caller.utils.discord.createMessage(userDB!.userID, { embed: userEmbed.code }, true);
},
{
	level: 'HELPER',
	threadOnly: true,
	aliases: ['r']
});