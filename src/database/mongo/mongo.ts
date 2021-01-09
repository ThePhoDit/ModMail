import { UserDB, SnippetDB, LogDB } from '../../lib/types/Database';
import { IDatabase } from '../IDatabase';
import {connect, Document, set, Types} from 'mongoose';
import { User, Snippet, Log } from './Schemas';

if (process.env.DB === 'MONGO' && !process.env.MONGO_URI) throw new Error('[MONGO DB] No URI provided.');
set('useFindAndModify', false);

export default class Mongo implements IDatabase {
	// @ts-ignore
	private DB;
	static db: Mongo;

	private constructor() {
		this.DB = connect(process.env.MONGO_URI!, {
			useUnifiedTopology: true
		});
	}

	static getDatabase(): Mongo {
		if (!this.db)
			this.db = new Mongo();
		return this.db;
	}

	async getUser(id: string, channel = false): Promise<UserDB | null> {
		const filter: { channel?: string; user?: string} = {};

		if (channel) filter['channel'] = id;
		else filter['user'] = id;

		const data = await User.findOne(filter).lean();
		return data ? data as UserDB : null;
	}

	async addUser(id: string): Promise<void> {
		// @ts-ignore
		await User.create({ user: id });
	}

	async boundChannel(userID: string, channelID: string): Promise<void> {
		const data = await this.getUser(userID);

		if (!data)
			await this.addUser(userID);

		const log = await Log.create({
			// @ts-ignore
			user: userID,
			channel: channelID,
			messages: []
		});

		await User.findOneAndUpdate({ user: userID }, { channel: channelID, logs: log.id}).exec();
	}

	async getSnippet(name: string): Promise<SnippetDB | null> {
		const data = await Snippet.findOne({ name }).lean();
		return data ? data as SnippetDB : null;
	}

	closeChannel(id: string): void {
		User.findOneAndUpdate(
			{
				channel: id
			},
			{
				channel: '0',
				$inc: {
					threads: 1
				},
				logs: '0'
			}).exec();
	}

	updateBlacklist(userID: string, action: 'add' | 'remove'): void {
		User.update(
			{
				user: userID
			},
			{
				blacklisted: action === 'add' ? 1 : 0
			}
		).exec();
	}

	createSnippet(name: string, creatorID: string, content: string): void {
		Snippet.create({
			// @ts-ignore
			name,
			creator: creatorID,
			content
		});
	}

	deleteSnippet(name: string): void {
		Snippet.deleteOne({ name });
	}

	async getSnippets(): Promise<SnippetDB[]> {
		return await Snippet.find({}).lean() as SnippetDB[];
	}

	async addMessage(userID: string, location: 'USER' | 'ADMIN' | 'OOT', content: string, logID: string, images: string[] | undefined = undefined): Promise<void> {
		Log.findByIdAndUpdate(
			logID,
			{
				$push: {
					messages: { userID, location, content, date: new Date(), images }
				}
			}
		).exec();
	}

	async getLogs(logID: string): Promise<LogDB | null> {
		if (!Types.ObjectId.isValid(logID)) return null;
		return await Log.findById(logID).lean() as LogDB;
	}

	async getUserLogs(userID:string): Promise<string[] | null> {
		const data = await Log.find({ user: userID }).exec() as (Document<unknown> & LogDB)[];
		if (!data || data.length === 0) return null;
		return data
			.sort((a, b) => a.timestamp - b.timestamp)
			.map((r) => `${process.env.LOGS_URL}/logs/${r.id}`);
	}
}