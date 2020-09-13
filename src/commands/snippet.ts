import Command from '../lib/structures/Command';
import { SnippetDB } from '../lib/types/Database';

export default new Command('snippet', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `create` or `delete`.');
	if (!cmd.args[1]) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a name.');

	const snippet: SnippetDB = caller.db.prepare('SELECT content FROM snippets WHERE name = ?').get(cmd.args[1]);

	switch (cmd.args[0]) {
		// Create a snippet.
		case 'create': case 'add': case 'new':
			if (!cmd.args[2]) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a valid text.');

			// Check if the snippet exists
			if (snippet) return caller.utils.discord.createMessage(cmd.channel.id, 'A snippet with this name already exists.');
			caller.db.prepare('INSERT INTO snippets (name, creator, content) VALUES (?, ?, ?)').run(cmd.args[1], cmd.msg.author.id, cmd.args.slice(2).join(' '));
			caller.utils.discord.createMessage(cmd.channel.id, 'Snippet created.');
			break;
		// Delete a snippet.
		case 'delete': case 'remove': case 'rmv':
			if (!snippet) return caller.utils.discord.createMessage(cmd.channel.id, 'A snippet with this name does not exist.');
			caller.db.prepare('DELETE FROM snippets WHERE name = ?').run(cmd.args[1]);
			caller.utils.discord.createMessage(cmd.channel.id, 'Snippet deleted.');
			break;
		default:
			caller.utils.discord.createMessage(cmd.channel.id, 'Select `create` or `delete`.');
			break;
	}
},
{
	level: 'MANAGER',
	aliases: ['qr', 'quickreply']
});