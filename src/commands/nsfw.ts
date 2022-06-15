import Command from '../lib/structures/Command';

export default new Command('nsfw', async (caller, cmd, log) => {
	// If it's NSFW, disable it.
	caller.db.updateLog(log!._id, 'nsfw', !log!.nsfw);
	cmd.channel.edit({ nsfw: !log!.nsfw })
		.then(() => !log!.nsfw ?
			caller.utils.discord.createMessage(cmd.channel.id, 'This thread now is marked as NSFW.') :
			caller.utils.discord.createMessage(cmd.channel.id, 'This thread is no longer marked as NSFW.')
		)
		.catch((error) => {
			!log!.nsfw ?
				caller.utils.discord.createMessage(cmd.channel.id, 'This thread could not be marked as NSFW.') :
				caller.utils.discord.createMessage(cmd.channel.id, 'This thread could not be unmarked as NSFW.');
			console.error(error);
		});

},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});