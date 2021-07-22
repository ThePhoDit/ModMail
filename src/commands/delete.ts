import Command from '../lib/structures/Command';

export default new Command('delete', async (caller, cmd, log) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'Please, provide a message ID.');

	const guildMsg = await caller.utils.discord.fetchMessage(cmd.channel.id, cmd.args[0]);
	if (!guildMsg || !guildMsg.embeds[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'The message could not be found.');

	const message = log!.messages.find((m) => m.id === guildMsg.id);
	if (!message || message.type !== 'STAFF_REPLY')
		return caller.utils.discord.createMessage(cmd.channel.id, 'The message could not be found.');

	caller.db.editMessage(log!, message.id, '[DELETED] ' + message.content);

	const userMsg = await caller.utils.discord.fetchMessage(log!.recipient.id, message.complementaryID!, true);
	if (!userMsg || !userMsg.embeds[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'The message could not be found.');

	// Delete the user message.
	userMsg.delete()
		.catch(() => {
			return caller.utils.discord.createMessage(cmd.channel.id, 'The message could not be deleted.');
		});

	guildMsg.embeds[0].description = '[DELETED] ' + guildMsg.embeds[0].description;
	guildMsg.embeds[0].footer ? guildMsg.embeds[0].footer.text = 'Deleted' : guildMsg.embeds[0].footer = { text: 'Deleted' };
	guildMsg.edit({ embed: guildMsg.embeds[0] })
		.catch(() => {
			return caller.utils.discord.createMessage(cmd.channel.id, 'The message could not be deleted.');
		});
	caller.utils.discord.createMessage(cmd.channel.id, 'The message has been deleted.');
},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});