import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';
import config from '../config';
import { COLORS } from '../Constants';

export default new Command('close', async (caller, cmd, userDB) => {
	const channel = await cmd.channel.delete('Thread Closed').catch(() => false);
	if (channel === false) return caller.utils.discord.createMessage(cmd.channel.id, 'There has been an error closing the channel.');
	const embed = new MessageEmbed()
		.setTitle(config.messages.thread_close_title || 'Thread Closed')
		.setColor(COLORS.RED)
		.setDescription(config.messages.thread_close_main || 'Send a message to open a new thread.')
		.setFooter(config.messages.thread_close_footer || 'Please do not abuse of this system.')
		.setTimestamp();
	caller.utils.discord.createMessage(userDB!.userID, { embed: embed.code }, true);
},
{
	level: 'HELPER',
	threadOnly: true,
	aliases: ['c']
});