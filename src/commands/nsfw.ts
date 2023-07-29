import Command from '../lib/structures/Command';

export default new Command('nsfw', async (caller, cmd, log) => {
  // If it's NSFW, disable it. If it's not NSFW, enable it.
  const toggleNsfw = !log?.nsfw;

  try {
    // Update the log and channel NSFW status
    await caller.db.updateLog(log?._id, 'nsfw', toggleNsfw);
    await cmd.channel.edit({ nsfw: toggleNsfw });

    // Send a response message based on the new NSFW status
    const responseMessage = toggleNsfw
      ? caller.lang.commands.nsfw.enabled
      : caller.lang.commands.nsfw.disabled;
    caller.utils.discord.createMessage(cmd.channel.id, responseMessage);
  } catch (error) {
    // Handle any errors that occur during the process
    const errorMessage = toggleNsfw
      ? caller.lang.commands.nsfw.enableError
      : caller.lang.commands.nsfw.disableError;
    caller.utils.discord.createMessage(cmd.channel.id, errorMessage);
    console.error(error);
  }
}, {
  level: 'SUPPORT',
  threadOnly: true,
  aliases: []
});
