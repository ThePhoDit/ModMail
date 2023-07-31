import Mail from '../structures/Mail';
import { Member, TextChannel } from 'eris';
import { IConfig, LogDocument } from '../types/Database';
import Command from '../structures/Command';
import { CommandData } from '../types/Commands';
import MessageEmbed from '../structures/MessageEmbed';
import {currentLang} from '../../langs/manager';

class MiscUtils {
	private caller: Mail;

	constructor(caller: Mail) {
		this.caller = caller;
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
			if (member.permissions.has('administrator')) return true;

			if (config.levelPermissions && config.levelPermissions[perm]) {
				if (config.levelPermissions[perm].includes(member.guild.id))
					hasPerms = true;
				if (config.levelPermissions[perm].includes(member.user.id))
					hasPerms = true;
				for (const id of config.levelPermissions[perm]!) {
					if (member.roles.includes(id))
						hasPerms = true;
					if (hasPerms) break;
				}
			}

			// Individual Command level
			if (config.commandsPermissions && config.commandsPermissions[command]) {
				if (config.commandsPermissions[command].includes(member.guild.id))
					hasPerms = true;
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

	async closeThread(log: LogDocument, config: IConfig | null, cmd?: CommandData, closureReason?: string): Promise<void> {

		const lang = currentLang();
		if (!config) return;
		if (cmd) {
			const closed = await cmd.channel.delete(lang.embeds.threadClosed.title).catch(() => false);
			if (closed === false) return;
		}
		else {
			const channel = await this.caller.bot.getChannel(log.channelID) as TextChannel;
			if (!channel) return;
			const closed = await channel.delete(lang.embeds.threadClosed.title).catch(() => false);
			if (closed === false) return;
		}

		const endingEmbed = new MessageEmbed()
			.setTitle(config.embeds.closure.title)
			.setColor(config.embeds.closure.color)
			.setDescription(closureReason ?
				closureReason : log.closureMessage ?
					log.closureMessage : config.embeds.closure.description
						.replace('$logID', log.id)
						.replace('$member', log.recipient.username)
			)
			.setFooter(config.embeds.closure.footer, config.embeds.closure.footerImageURL)
			.setTimestamp();
		if (config.embeds.closure.thumbnail)
			endingEmbed.setThumbnail(config.embeds.closure.thumbnail);
		this.caller.utils.discord.createMessage(log!.recipient.id, { embed: endingEmbed.code }, true);

		if (config.logsChannelID) {
			const logEmbed = new MessageEmbed()
				.setTitle(lang.embeds.threadClosed.title)
				.setColor('#FF0000')
				.setDescription(lang.embeds.threadClosed.description.replace('%u', `${log.recipient.username}${log.recipient.discriminator === '0' ? '' : `#${log.recipient.discriminator}`}`).replace('%s', `${cmd ? cmd.msg.author.username : log.closer?.username || 'USER NOT FOUND'}.${process.env.LOGS_URL ? `\n${process.env.LOGS_URL}log?id=${log!._id}` : ''}`));
			this.caller.utils.discord.createMessage(config.logsChannelID, { embed: logEmbed.code });
		}

		// If it is scheduled, there is no cmd.
		this.caller.db.closeLog(log!, cmd ? cmd.msg : undefined, cmd ? undefined : log.closer)
			.catch((error) => {
				console.error(error);
			});
	}
}

export default MiscUtils;