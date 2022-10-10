import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';

export default new Command('help', async (caller, cmd) => {
	const helpEmbed = new MessageEmbed()
		.setTitle(caller.lang.commands.help.title)
		.setDescription(caller.lang.commands.help.description);
	return caller.utils.discord.createMessage(cmd.channel.id, { embed: helpEmbed.code });
},
{
	level: 'REGULAR',
	aliases: []
});