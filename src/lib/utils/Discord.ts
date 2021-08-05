import Mail from '../structures/Mail';
import {
	Message,
	MessageContent,
	MessageFile,
	TextChannel,
	User,
	Constants,
	CategoryChannel,
	VoiceChannel,
	CreateChannelOptions,
	PrivateChannel
} from 'eris';

class DiscordUtils {
	private caller: Mail;

	constructor(caller: Mail) {
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
		} else {
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
	 * @param {CreateChannelOptions} options - The Channel Parent ID.
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
		} catch (e) {
			return false;
		}
	}

	/**
	 * Get a message.
	 * @param {string} channelID - The channel ID.
	 * @param {string} messageID - The message ID.
	 * @param {boolean} user - Whether is a DM or not
	 * @returns {Promise<Message|boolean>} - A Discord Message or false.
	 */
	async fetchMessage(channelID: string, messageID: string, dm = false): Promise<Message | false> {
		let channel;
		if (dm) {
			const usr = this.caller.bot.users.get(channelID) || await this.fetchUser(channelID);
			if (!usr) return false;

			try {
				channel = await usr.getDMChannel();
				if (!channel || [0, 1].indexOf(channel.type) < 0) return false;
			}
			catch (e) {
				return false;
			}
		} else
			try {
				channel = this.caller.bot.getChannel(channelID);
				if (!channel || [0, 1].indexOf(channel.type) < 0) return false;
			} catch (e) {
				return false;
			}

		try {
			const guildMsg = await (channel as TextChannel | PrivateChannel).getMessage(messageID);
			if (!guildMsg) return false;
			return guildMsg;
		}
		catch (e) {
			return false;
		}

	}

	/**
	 * Convert ID mentions to something readable in the logs.
	 * @param {string} content
	 * @returns {string}
	 */
	formatMentions(content: string): string {
		return content
			.replace(/<@!?([0-9]+)>/g, ((match, p1): string => {
				const user = this.caller.bot.users.get(p1);
				if (!user)
					return match;
				return `@${user.username}#${user.discriminator}`;
			}))
			.replace(/<#([0-9]+)>/g, ((match, p1): string => {
				const channel = this.caller.bot.getChannel(p1);
				if (!channel || channel.type === 1)
					return match;
				return `#${(channel as TextChannel).name}`;
			}));
	}
}

export default DiscordUtils;