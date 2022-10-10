import Command from '../lib/structures/Command';

export default new Command('nsfw', async (caller, cmd, log) => {
	// If it's NSFW, disable it.
	caller.db.updateLog(log!._id, 'nsfw', !log!.nsfw);
	cmd.channel.edit({ nsfw: !log!.nsfw })
		.then(() => !log!.nsfw ?
			caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.nsfw.enabled) :
			caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.nsfw.disabled)
		)
		.catch((error) => {
			!log!.nsfw ?
				caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.nsfw.enableError) :
				caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.nsfw.disableError);
			console.error(error);
		});

},
{
	level: 'SUPPORT',
	threadOnly: true,
	aliases: []
});