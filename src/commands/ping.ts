import Command from '../lib/structures/Command';

export default new Command('ping', async (caller, cmd) => {
	return caller.utils.discord.createMessage(cmd.channel.id, `My ping is: \`${cmd.channel.guild.shard.latency}ms\``);
},
{
	level: 'REGULAR',
	aliases: []
});