import Command from '../lib/structures/Command';
import Axios from 'axios';

export default new Command('set', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `avatar` or `username`.');
	if (!cmd.args[1] && cmd.msg.attachments.length === 0) return caller.utils.discord.createMessage(cmd.channel.id, 'Please, provide a value.');
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
		default:
			caller.utils.discord.createMessage(cmd.channel.id, 'Select `avatar` or `username`.');
			break;
	}
},
{
	aliases: ['s']
});