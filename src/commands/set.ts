import Command from '../lib/structures/Command';
import Axios from 'axios';
import {UserDB} from '../lib/types/Database';

export default new Command('set', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `avatar`, `username` or `blacklist`.');
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
		case 'blacklist':
			// eslint-disable-next-line no-case-declarations
			const user = cmd.msg.mentions[0] || caller.bot.users.get(cmd.args[2]) || await caller.utils.discord.fetchUser(cmd.args[2]);
			if (!user) return caller.utils.discord.createMessage(cmd.channel.id, 'Invalid user.');

			// Check if user is in the DB. If not, add it.

			// eslint-disable-next-line no-case-declarations
			let userDB: UserDB = caller.db.prepare('SELECT blacklisted FROM users WHERE user = ?').get(user.id);
			if (!userDB) {
				caller.db.prepare('INSERT INTO users (user) VALUES (?)').run(user.id);
				userDB = caller.db.prepare('SELECT blacklisted FROM users WHERE user = ?').get(user.id);
			}


			switch (cmd.args[1]) {
				case 'add':
					if (userDB.blacklisted) return caller.utils.discord.createMessage(cmd.channel.id, 'User is already blacklisted.');
					caller.db.prepare('UPDATE users SET blacklisted = 1 WHERE user = ?').run(user.id);
					caller.utils.discord.createMessage(cmd.channel.id, 'User added to the blacklist.');
					break;
				case 'remove': case 'rmv':
					if (!userDB.blacklisted) return caller.utils.discord.createMessage(cmd.channel.id, 'User not blacklisted.');
					caller.db.prepare('UPDATE users SET blacklisted = 0 WHERE user = ?').run(user.id);
					caller.utils.discord.createMessage(cmd.channel.id, 'User removed from the blacklist.');
					break;
				default:
					caller.utils.discord.createMessage(cmd.channel.id, 'Select `add` or `remove`.');
					break;
			}
			break;
		default:
			caller.utils.discord.createMessage(cmd.channel.id, 'Select `avatar`, `username` or `blacklist`.');
			break;
	}
},
{
	aliases: ['s']
});