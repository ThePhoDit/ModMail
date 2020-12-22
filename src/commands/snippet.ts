import Command from '../lib/structures/Command';
import { SnippetDB } from '../lib/types/Database';

export default new Command('snippet', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `create` or `delete`.');
	if (!cmd.args[1] && ['show', 'list'].indexOf(cmd.args[0]) < 0) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a name.');

	const snippet = await caller.db.getSnippet(cmd.args[1]);

	const list: string[] = [],
		snippets: string[][] = [],
		s = 10;
	let snippetsRAW: SnippetDB[] = [];

	switch (cmd.args[0]) {
		// Create a snippet.
		case 'create': case 'add': case 'new':
			if (!cmd.args[2]) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a valid text.');

			// Check if the snippet exists
			if (snippet) return caller.utils.discord.createMessage(cmd.channel.id, 'A snippet with this name already exists.');

			caller.db.createSnippet(cmd.args[1], cmd.msg.author.id, cmd.args.slice(2).join(' '));
			caller.utils.discord.createMessage(cmd.channel.id, 'Snippet created.');
			break;
		// Delete a snippet.
		case 'delete': case 'remove': case 'rmv':
			if (!snippet) return caller.utils.discord.createMessage(cmd.channel.id, 'A snippet with this name does not exist.');
			caller.db.deleteSnippet(cmd.args[1]);
			caller.utils.discord.createMessage(cmd.channel.id, 'Snippet deleted.');
			break;
		// Show all snippets
		case 'list': case 'show':
			snippetsRAW = await caller.db.getSnippets();
			if (snippetsRAW.length === 0)
				return caller.utils.discord.createMessage(cmd.channel.id, 'No snippets found.');

			for (const c of snippetsRAW)
				list.push(`${c.name} | ${caller.bot.users.get(c.creator)?.username || c.creator} | ${c.content.length > 50 ? c.content.substr(0, 50) + '...' : c.content}`);

			while (list.length > 0)
				snippets.push(list.splice(0, s));
			// Send the list
			caller.utils.discord.createMessage(cmd.channel.id, `\`\`\`\nNAME  |  CREATOR | CONTENT\n-----------\n${snippets.join('\n')}\`\`\``);
			break;
		default:
			caller.utils.discord.createMessage(cmd.channel.id, 'Select `create`, `delete` or `list`.');
			break;
	}
},
{
	level: 'MANAGER',
	aliases: ['qr', 'quickreply']
});