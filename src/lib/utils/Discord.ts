import Caller from '../structures/Caller';
import {Message, MessageContent, MessageFile, TextChannel, User} from 'eris';

class DiscordUtils {
	private caller: Caller;
	constructor(caller: Caller) {
		this.caller = caller;
	}

	async createMessage(channel: string, content: MessageContent, user = false, file?: MessageFile): Promise<Message | false> {
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
				return false;
			}
		}
	}

	async fetchUser(userID: string): Promise<User | false> {
		try {
			const usr = await this.caller.bot.getRESTUser(userID);
			if (!usr) return false;
			return usr;
		} catch (e) {
			return false;
		}
	}
}

export default DiscordUtils;