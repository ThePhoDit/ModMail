import Command from '../lib/structures/Command';

export default new Command('snippet', async (caller, cmd) => {
	if (!cmd.args[0]) return caller.utils.discord.createMessage(cmd.channel.id, 'Select `create` or `delete`.');
	if (!cmd.args[1]) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a name.');

	switch (cmd.args[0]) {
		// Create a snippet.
		case 'create': case 'add': case 'new':
			if (!cmd.args[2]) return caller.utils.discord.createMessage(cmd.channel.id, 'Provide a valid text.');
			if (caller.db.has(`mail.snippets.${cmd.args[1]}`)) return caller.utils.discord.createMessage(cmd.channel.id, 'An snippet with this name already exists.');
			caller.db.set(`mail.snippets.${cmd.args[1]}`, cmd.args.slice(2).join(' '));
			caller.utils.discord.createMessage(cmd.channel.id, 'Snippet created.');
			break;
		// Delete a snippet.
		case 'delete': case 'remove': case 'rmv':
			if (!caller.db.has(`mail.snippets.${cmd.args[1]}`)) return caller.utils.discord.createMessage(cmd.channel.id, 'An snippet with this name does not exist.');
			caller.db.delete(`mail.snippets.${cmd.args[1]}`);
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