import Command from '../lib/structures/Command';

export default new Command('blacklist', async (caller, cmd, log, config) => {
	if (!cmd.args[0])
		return caller.utils.discord.createMessage(cmd.channel.id, 'You have to select `add` or `remove`.');

	let userID: string;
	// If used in a thread, it operates with the recipient, if not, an ID is required.
	if (log) userID = log.recipient.id;
	else {
		if (!cmd.args[1])
			return caller.utils.discord.createMessage(cmd.channel.id, 'You have to provide a valid user.');

		const user = cmd.msg.mentions[0] || caller.bot.users.get(cmd.args[1]) || await caller.utils.discord.fetchUser(cmd.args[1]);
		if (!user)
			return caller.utils.discord.createMessage(cmd.channel.id, 'User not found.');
		userID = user.id;
	}

	if (cmd.args[0] === 'add') {
		if (config.blacklist.includes(userID))
			return caller.utils.discord.createMessage(cmd.channel.id, 'This user is already blacklisted.');

		const updated = await caller.db.updateConfig('blacklist', userID, 'PUSH');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'User has been blacklisted.');
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'User could not be blacklisted.');

	}
	else if (cmd.args[0] === 'remove' || cmd.args[0] === 'rmv') {
		if (!config.blacklist.includes(userID))
			return caller.utils.discord.createMessage(cmd.channel.id, 'This user is not blacklisted.');

		const updated = await caller.db.updateConfig('blacklist', userID, 'PULL');
		if (updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'User has been removed from the blacklist.');
		if (!updated)
			return caller.utils.discord.createMessage(cmd.channel.id, 'User could not be removed from the blacklist.');

	}

},
{
	level: 'ADMIN',
	aliases: ['bl']
});