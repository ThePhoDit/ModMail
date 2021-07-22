import { IConfig, ISnippet, ILog, IMessage, IUser, ConfigDocument, LogDocument } from '../lib/types/Database';
import { IDatabase } from './IDatabase';
import { connect, Document, set, _FilterQuery, _AllowStringsForIds } from 'mongoose';
import { Config, Log } from './Schemas';
import { Message } from 'eris';
import Mail from '../lib/structures/Mail';

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
			useUnifiedTopology: true,
			useNewUrlParser: true
		})
			.then(() => console.log('[DATABASE] Connection established.'))
			.catch((err) => console.error(`[DATABASE] Connection error:\n ${err}`));
	}

	static getDatabase(caller: Mail): Mongo {
		if (!this.db)
			this.db = new Mongo(caller);
		return this.db;
	}

	// Config
	async createConfig(data: Partial<IConfig>): Promise<IConfig | null> {
		if (await this.getConfig()) return null;

		data.botID = this.caller.bot.user.id;

		return Config.create(data)
			.then((data) => data as ConfigDocument)
			.catch(() => null);
	}

	async getConfig(): Promise<IConfig | null> {
		return await Config.findOne({
			botID: this.caller.bot.user.id
		})
			.lean() as IConfig | null;
	}

	updateConfig(key: string, value: string | number | boolean, operation: 'SET' | 'PUSH' | 'PULL' | 'UNSET' = 'SET'): Promise<boolean> | false {
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
		else if (operation === 'UNSET')
			update['$unset'] = {
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

	deleteSnippet(name: string): Promise<boolean> | false {
		return this.updateConfig(`snippets.${name}`, '', 'UNSET');
	}

	// Logs
	async createLog(data: Partial<ILog>): Promise<LogDocument | false> {
		data.botID = this.caller.bot.user.id;
		data.guildID = process.env.MAIN_GUILD_ID!;
		return await Log.create(data)
			.then((data) => data as LogDocument)
			.catch(() => false);
	}

	async getLog(id: string, type: 'ID' | 'USER' | 'CHANNEL' = 'CHANNEL', open = true): Promise<LogDocument | null> {
		const filter: _FilterQuery<_AllowStringsForIds<Pick<Pick<Document<unknown>, '_id'>, '_id'>>> = {};

		if (type === 'ID')
			filter._id = id;
		else if (type === 'USER')
			filter['recipient.id'] = id;
		else
			filter.channelID = id;

		filter.open = open;
		filter.botID = this.caller.bot.user.id;

		return await Log.findOne(filter)
			.then((data: LogDocument) => data as LogDocument)
			.catch(() => null);
	}

	async getUserLogs(userID: string): Promise<LogDocument[] | null> {
		return await Log.find({
			'recipient.id': userID,
			botID: this.caller.bot.user.id
		})
			.then((data: LogDocument[]) => {
				if (data.length === 0) return null;
				return data as LogDocument[];
			} )
			.catch(() => null);
	}

	async getClosingScheduledLogs(): Promise<LogDocument[] | null> {
		return await Log.find({
			botID: this.caller.bot.user.id,
			open: true,
			scheduledClosure: { $lte: new Date() }
		})
			.then((data: LogDocument[]) => {
				if (data.length === 0) return null;
				return data as LogDocument[];
			} )
			.catch(() => null);
	}

	async numberOfPreviousLogs(userID: string): Promise<number> {
		const logs = await this.getUserLogs(userID);
		if (!logs || logs.length === 0)
			return 0;
		return logs.length;
	}

	updateLog(logID: string, key: string, value: string | number | boolean | Date | IMessage | IUser, operation: 'SET' | 'PUSH' | 'PULL' | 'UNSET' = 'SET'): Promise<boolean> | false {
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
		else if (operation === 'UNSET')
			update['$unset'] = {
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

	closeLog(log: LogDocument, msg?: Message, closer?: LogDocument['closer']): Promise<boolean> {
		// If there is a closer, it was scheduled.
		const update = closer ? {
			open: false,
			closedAt: new Date()
		} :
			{
				open: false,
				closedAt: new Date(),
				closer: {
					id: msg!.author.id,
					username: msg!.author.username,
					discriminator: msg!.author.discriminator,
					avatarURL: msg!.author.dynamicAvatarURL()
				}
			};
		return Log.findByIdAndUpdate(log._id, update)
			.then (() => true)
			.catch(() => false);
	}

	appendMessage(logID: string, msg: Message, type: 'INTERNAL' | 'STAFF_REPLY' | 'RECIPIENT_REPLY', content: string | null = null, complementaryID?: string, overrideID?: string): Promise<boolean> | false {
		const message: IMessage = {
			timestamp: new Date(),
			id: overrideID ? overrideID : msg.id,
			complementaryID: complementaryID,
			type: type,
			author: {
				id: msg.author.id,
				username: msg.author.username,
				discriminator: msg.author.discriminator,
				avatarURL: msg.author.dynamicAvatarURL()
			},
			content: content ? this.caller.utils.discord.formatMentions(content) : this.caller.utils.discord.formatMentions(msg.content),
			attachments: msg.attachments.length > 0 ? msg.attachments.map((a) => a.url) : []
		};

		return this.updateLog(logID, 'messages', message, 'PUSH');
	}

	editMessage(log: LogDocument, messageID: string, content: string): boolean {
		const message = log.messages.find((m) => m.id === messageID);
		if (!message)
			return false;

		let update;
		if (message.originalContent || content.startsWith('[DELETED]'))
			update = { 'messages.$.content': content };
		else
			update = {
				'messages.$.originalContent': message.content,
				'messages.$.content': content
			};

		/// here
		return Log.updateOne(
			{ _id: log._id, 'messages.id': messageID },
			{ '$set': update}
		)
			.then(() => true)
			.catch(() => false);
	}

	deleteLog(logID: string): Promise<boolean> {
		return Log.deleteOne({
			__id: logID
		})
			.then(() => true)
			.catch(() => false);
	}
}