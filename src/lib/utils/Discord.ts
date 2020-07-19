import Caller from '../structures/Caller';
import {
	Message,
	MessageContent,
	MessageFile,
	TextChannel,
	User,
	Constants,
	CategoryChannel,
	VoiceChannel,
	CreateChannelOptions
} from 'eris';

class DiscordUtils {
	private caller: Caller;
	constructor(caller: Caller) {
		this.caller = caller;
	}

	/**
	 * Send a message to a Discord channel or user.
	 * @param {string} channel - The Channel/User ID.
	 * @param {string} content - The content of the message.
	 * @param {boolean} [user=false] - Whether the message is sent to an user or not (optional)
	 * @param {MessageFile|MessageFile[]} [file] - Discord Message File to send (optional)
	 * @returns {Promise<Message|boolean>} - A Discord Message or false.
	 */
	async createMessage(channel: string, content: MessageContent, user = false, file?: MessageFile | MessageFile[]): Promise<Message | false> {
		if (user) {
			const usr = this.caller.bot.users.get(channel) || await this.fetchUser(channel);
			if (!usr) return false;

			const DM = await usr.getDMChannel();
			try {
				return await DM.createMessage(content, file ? file : undefined);
			} catch (e) {
				console.error(`[Messages Manager] Could not send a message to user ${channel} (${usr.username}).`);
				return false;
			}
		}
		else {
			const chnl = this.caller.bot.getChannel(channel);
			if (!chnl) return false;

			if (!(chnl instanceof TextChannel)) return false;
			try {
				return await chnl.createMessage(content, file ? file : undefined);
			} catch (e) {
				console.error(`[Messages Manager] Could not send a message to channel ${channel} (${chnl.name} -> ${chnl.guild.name})`);
				console.log('3 S');
				return false;
			}
		}
	}

	/**
	 * Fetch a Discord user.
	 * @param {string} userID - A Discord User ID.
	 * @returns {Promise<User|boolean>} - A Discord User or false.
	 */
	async fetchUser(userID: string): Promise<User | false> {
		try {
			const usr = await this.caller.bot.getRESTUser(userID);
			if (!usr) return false;
			return usr;
		} catch (e) {
			return false;
		}
	}

	/**
	 * Create a Discord Channel.
	 * @param {string} guildID - A Discord Guild ID.
	 * @param {string} name - The channel name.
	 * @param {'GUILD_TEXT'|'DM'|'GUILD_VOICE'|'GUILD_CATEGORY'} type - The Channel type.
	 * @param {string} [parentID] - The Channel Parent ID.
	 * @returns {Promise<Channel|boolean>} - A Discord Channel or false.
	 */
	async createChannel(guildID: string, name: string, type: 'GUILD_TEXT' | 'DM' | 'GUILD_VOICE' | 'GUILD_CATEGORY', options: CreateChannelOptions): Promise<CategoryChannel | TextChannel | VoiceChannel | false> {
		try {
			const channel = await this.caller.bot.createChannel(guildID, name, Constants.ChannelTypes[type],
				{
					parentID: ['DM', 'GUILD_CATEGORY'].indexOf(type) === -1 && options.parentID ? options.parentID : undefined,
					topic: options.topic ? options.topic : undefined
				}) as CategoryChannel | TextChannel | VoiceChannel | undefined;
			if (!channel) return false;
			return channel;
		}
		catch (e) {
			return false;
		}
	}
}

export default DiscordUtils;