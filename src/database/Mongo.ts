import { IConfig, ISnippet, ILog, IMessage, IUser, ConfigDocument, LogDocument } from '../lib/types/Database';
import { IDatabase } from './IDatabase';
import { connect, Document, set, _FilterQuery, _AllowStringsForIds } from 'mongoose';
import { Config, Log } from './Schemas';
import { Message } from 'eris';
import Mail from '../lib/structures/Mail';
import {log} from "util";

if (!process.env.MONGO_URI) throw new Error('[MONGO DB] No URI provided.');
set('useFindAndModify', false);

export default class Mongo implements IDatabase {
	// @ts-ignore
	private DB;
	static db: Mongo;
	caller: Mail;

	private constructor(caller: Mail) {
		this.caller = caller;
		this.DB = connect(process.env.MONGO_URI!, {
			useUnifiedTopology: true
		})
			.then(() => this.caller.logger.info('[DATABASE] Connection established.'))
			.catch((err) => this.caller.logger.error(`[DATABASE] Connection error:\n ${err}`));
	}

	static getDatabase(caller: Mail): Mongo {
		if (!this.db)
			this.db = new Mongo(caller);
		return this.db;
	}

	// Config
	async createConfig(data: Partial<IConfig>, guildID: string): Promise<IConfig | null> {
		if (await this.getConfig()) return null;

		return Config.create({
			// @ts-ignore
			botID: this.caller.bot.user.id,
			mainCategoryID: data.mainCategoryID,
			levelPermissions: {
				REGULAR: [guildID]
			}
		})
			.then((data) => data as ConfigDocument)
			.catch(() => null);
	}

	async getConfig(): Promise<IConfig | null> {
		return await Config.findOne({
			botID: this.caller.bot.user.id
		})
			.lean() as IConfig | null;
	}

	updateConfig(key: string, value: string | number | boolean, operation: 'SET' | 'PUSH' | 'PULL' = 'SET'): Promise<boolean> | false {
		const update: Record<string, unknown> = {};

		if (operation === 'SET')
			update[key] = value;
		else if (operation === 'PUSH')
			update['$push'] = {
				[key]: value
			};
		else if (operation === 'PULL')
			update['$pull'] = {
				[key]: value
			};
		else
			return false;

		return Config.findOneAndUpdate(
			{
				botID: this.caller.bot.user.id
			},
			update
		)
			.then(() => true)
			.catch(() => false);
	}

	deleteConfig(): Promise<boolean> {
		return Config.deleteOne({
			botID: this.caller.bot.user.id
		})
			.then(() => true)
			.catch(() => false);
	}

	// Snippets
	createSnippet(name: string, data: ISnippet): Promise<boolean> {
		return Config.updateOne({
			botID: this.caller.bot.user.id
		},
		{
			[`snippets.${name}`]: data
		})
			.then(() => true)
			.catch(() => false);
	}

	editSnippet(name: string, value: string): Promise<boolean> | false {
		return this.updateConfig(`snippets.${name}.content`, value);
	}

	deleteSnippet(name: string): Promise<boolean> {
		return Config.updateOne(
			{
				botID: this.caller.bot.user.id
			},
			{
				$unset: {
					[`snippets.${name}`]: ''
				}
			}
		)
			.then(() => true)
			.catch(() => false);
	}

	// Logs
	createLog(data: Partial<ILog>): Promise<LogDocument | false> {
		data.botID = this.caller.bot.user.id;
		data.guildID = process.env.MAIN_GUILD_ID!;
		return Log.create({
			// @ts-ignore
			data
		})
			.then((data) => data as LogDocument)
			.catch(() => false);
	}

	async getLog(id: string, type: 'ID' | 'USER' | 'CHANNEL' = 'CHANNEL', open = true): Promise<LogDocument | null> {
		const filter: _FilterQuery<_AllowStringsForIds<Pick<Pick<Document<unknown>, '_id'>, '_id'>>> = {};

		if (type === 'ID')
			filter._id = id;
		else if (type === 'USER')
			filter.recipient.id = id;
		else
			filter.channelID = id;

		filter.open = open;

		return await Log.findOne({
			filter
		})
			.then((data) => data as LogDocument)
			.catch(() => null);
	}

	async getUserLogs(userID: string): Promise<ILog[] | null> {
		return await Log.find({
			'recipient.id': userID
		})
			.then((data) => {
				if (data.length === 0) return null;
				return data as (ILog & Document)[];
			} )
			.catch(() => null);
	}

	async numberOfPreviousLogs(userID: string): Promise<number> {
		const logs = await this.getUserLogs(userID);
		if (!logs || logs.length === 0)
			return 0;
		return logs.length;
	}

	updateLog(logID: string, key: string, value: string | number | boolean | Date | IMessage | IUser, operation: 'SET' | 'PUSH' | 'PULL' = 'SET'): Promise<boolean> | false {
		const update: Record<string, unknown> = {};

		if (operation === 'SET')
			update[key] = value;
		else if (operation === 'PUSH')
			update['$push'] = {
				[key]: value
			};
		else if (operation === 'PULL')
			update['$pull'] = {
				[key]: value
			};
		else
			return false;

		return Log.findOneAndUpdate(
			{
				_id: logID,
				botID: this.caller.bot.user.id
			},
			update
		)
			.then(() => true)
			.catch(() => false);
	}

	closeLog(log: LogDocument, msg: Message): Promise<boolean> {
		return Log.findByIdAndUpdate(log._id, {
			open: false,
			closedAt: new Date(),
			closer: {
				id: msg.author.id,
				username: msg.author.username,
				discriminator: msg.author.discriminator,
				avatarURL: msg.author.dynamicAvatarURL()
			}
		})
			.then (() => true)
			.catch(() => false);
	}

	appendMessage(logID: string, msg: Message, type: 'INTERNAL' | 'STAFF_REPLY' | 'RECIPIENT_REPLY', content: string | null = null): Promise<boolean> | false {
		const message: IMessage = {
			timestamp: new Date(),
			id: msg.id,
			type: type,
			author: {
				id: msg.author.id,
				username: msg.author.username,
				discriminator: msg.author.discriminator,
				avatarURL: msg.author.dynamicAvatarURL()
			},
			content: content ? content : msg.content,
			attachments: msg.attachments.length > 0 ? msg.attachments.map((a) => a.url) : []
		};

		return this.updateLog(logID, 'messages', message, 'PUSH');
	}

	deleteLog(logID: string): Promise<boolean> {
		return Log.deleteOne({
			__id: logID
		})
			.then(() => true)
			.catch(() => false);
	}
}