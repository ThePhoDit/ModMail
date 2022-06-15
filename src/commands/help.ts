import Command from '../lib/structures/Command';
import MessageEmbed from '../lib/structures/MessageEmbed';

export default new Command('help', async (caller, cmd) => {
	const helpEmbed = new MessageEmbed()
		.setTitle('ModMail by ThePhoDit')
		.setDescription('If you want to check out the commands of the bot, read our docs at https://modmail.phodit.xyz');
	return caller.utils.discord.createMessage(cmd.channel.id, { embed: helpEmbed.code });
},
{
	level: 'REGULAR',
	aliases: []
});