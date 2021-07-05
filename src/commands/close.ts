import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';

export default new Command('close', async (caller, cmd, log, config) => {
	const channel = await cmd.channel.delete('Thread Closed').catch(() => false);
	if (channel === false) return caller.utils.discord.createMessage(cmd.channel.id, 'There has been an error closing the channel.');

	const endingEmbed = new MessageEmbed()
		.setTitle(config.embeds.closure.title)
		.setColor(config.embeds.closure.color)
		.setDescription(config.embeds.closure.description)
		.setFooter(config.embeds.closure.footer, config.embeds.closure.footerImageURL)
		.setTimestamp();
	caller.utils.discord.createMessage(log!.recipient.id, { embed: endingEmbed.code }, true);

	if (config.logsChannelID) {
		const logEmbed = new MessageEmbed()
			.setTitle('Thread Closed')
			.setColor('#FF0000')
			.setDescription(`The thread \`${cmd.channel.name}\` has been closed by ${cmd.msg.author.username}.\n${process.env.LOGS_URL}/logs/${log!._id}`);
		caller.utils.discord.createMessage(config.logsChannelID, {embed: logEmbed.code});
	}

	caller.db.closeLog(log!, cmd.msg)
		.catch((error) => {
			caller.utils.discord.createMessage(cmd.channel.id, `There has been an error closing ${cmd.channel.name} in the DB.`);
			caller.logger.error(error);
		});
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: ['c']
});