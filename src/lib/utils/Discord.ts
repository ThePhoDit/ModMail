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
	CreateChannelOptions, Member
} from 'eris';
import { IConfig } from '../types/Database';
import Command from '../structures/Command';

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
				caller.logger.error(`[Messages Manager] Could not send a message to user ${channel} (${usr.username}).`);
				return false;
			}
		} else {
			const chnl = this.caller.bot.getChannel(channel);
			if (!chnl) return false;

			if (!(chnl instanceof TextChannel)) return false;
			try {
				return await chnl.createMessage(content, file ? file : undefined);
			} catch (e) {
				caller.logger.error(`[Messages Manager] Could not send a message to channel ${channel} (${chnl.name} -> ${chnl.guild.name})`);
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
		} catch (e) {
			return false;
		}
	}

	/**
	 * Check if someone has permissions to run a command.
	 * @param {Member} member - A guild member.
	 * @param {string} command - A command name.
	 * @param {IConfig} config - The guild's config.
	 * @return {boolean}
	 */
	checkPermissions(member: Member, command: string, config: IConfig): boolean {
		let hasPerms = false;

		let toCheck: ('ADMIN' | 'SUPPORT' | 'REGULAR')[];

		if (command === 'snippet') toCheck = ['ADMIN', 'SUPPORT'];
		else {
			const cmd = this.caller.commands.get(command) as Command;
			switch (cmd.options.level) {
				case 'ADMIN':
					toCheck = ['ADMIN'];
					break;
				case 'SUPPORT':
					toCheck = ['ADMIN', 'SUPPORT'];
					break;
				case 'REGULAR':
					toCheck = ['ADMIN', 'SUPPORT', 'REGULAR'];
					break;
			}
		}

		// Check through all permissions and roles.
		for (const perm of toCheck) {
			if (member.permission.has('administrator')) return true;

			if (config.levelPermissions && config.levelPermissions[perm]) {
				if (config.levelPermissions[perm]!.includes(member.user.id))
					hasPerms = true;
				for (const id of config.levelPermissions[perm]!) {
					if (member.roles.includes(id))
						hasPerms = true;
					if (hasPerms) break;
				}
			}

			// Individual Command level
			if (config.commandsPermissions && config.commandsPermissions[command]) {
				if (config.commandsPermissions[command].includes(member.user.id))
					hasPerms = true;
				for (const id of config.commandsPermissions[command]) {
					if (member.roles.includes(id))
						hasPerms = true;
					if (hasPerms) break;
				}
			}
		}
		return hasPerms;
	}
}

export default DiscordUtils;