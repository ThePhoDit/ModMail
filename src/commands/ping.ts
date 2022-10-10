import Command from '../lib/structures/Command';

export default new Command('ping', async (caller, cmd) => {
	return caller.utils.discord.createMessage(cmd.channel.id, caller.lang.commands.ping.replace('%s', cmd.channel.guild.shard.latency.toString()));
},
{
	level: 'REGULAR',
	aliases: []
});