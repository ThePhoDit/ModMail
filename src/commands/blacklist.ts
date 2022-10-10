import Command from '../lib/structures/Command';

export default new Command('blacklist', async (caller, cmd, log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.noOption);

	let userID: string;
	// If used in a thread, it operates with the recipient, if not, an ID is required.
	if (log) userID = log.recipient.id;
	else {
		if (!cmd.args[1])
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.noUser);

		const user = cmd.msg.mentions[0] || caller.bot.users.get(cmd.args[1]) || await caller.utils.discord.fetchUser(cmd.args[1]);
		if (!user)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.notFound);
		userID = user.id;
	}

	if (cmd.args[0] === 'add') {
		if (config.blacklist.includes(userID))
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.alreadyBlacklisted);

		const updated = await caller.db.updateConfig('blacklist', userID, 'PUSH');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.blacklisted);
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.error);

	}
	else if (cmd.args[0] === 'remove' || cmd.args[0] === 'rmv') {
		if (!config.blacklist.includes(userID))
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.notBlacklisted);

		const updated = await caller.db.updateConfig('blacklist', userID, 'PULL');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.unblacklisted);
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.blacklist.error);

	}

},
{
	level: 'ADMIN',
	aliases: ['bl']
});