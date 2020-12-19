import { UserDB, SnippetDB } from '../../lib/types/Database';
import { IDatabase } from '../IDatabase';
import { connect } from 'mongoose';
import { User, Snippet } from './Schemas';

if (!process.env.MONGO_URI) throw new Error('[MONGO DB] No URI provided.');

export default class Mongo implements IDatabase {
	private DB;
	static db: Mongo;

	private constructor() {
		this.DB = connect(process.env.MONGO_URI!);
	}

	static getDatabase(): Mongo {
		if (this.db === null)
			new this();
		return this.db;
	}

	async getUser(id: string, channel = false): Promise<UserDB | null> {
		const filter: { channel?: string; user?: string} = {};

		if (channel) filter['channel'] = id;
		else filter['user'] = id;

		const data = await User.findOne(filter).lean();
		return data ? data as UserDB : null;
	}

	addUser(id: string): void {
		User.create({ user: id });
	}

	boundChannel(userID: string, channelID: string): void {
		User.findOneAndUpdate({ user: userID }, { channel: channelID }).exec();
	}

	async getSnippet(name: string): Promise<SnippetDB | null> {
		const data = await Snippet.findOne({ name }).lean();
		return data ? data as SnippetDB : null;
	}
}