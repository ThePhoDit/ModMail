import { UserDB, SnippetDB } from '../../lib/types/Database';
import { IDatabase } from '../IDatabase';

export default class SQL implements IDatabase {
	private DB;
	static db: SQL;

	private constructor() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		this.DB = require('better-sqlite3')('modmail.db');
	}

	static getDatabase(): SQL {
		if (this.db === null)
			new this();
		return this.db;
	}

	async getUser(id: string, channel = false): Promise<UserDB | null> {
		const data = await this.DB.prepare(`SELECT * FROM users WHERE ${channel ? 'channel' : 'user'} = ?`).get(id);
		return data ? data : null;
	}

	addUser(id: string): void {
		this.DB.prepare(`INSERT INTO users (id) VALUES (?)`).run(id);
	}

	boundChannel(userID: string, channelID: string): void {
		this.DB.prepare('UPDATE users SET channel = ? WHERE user = ?').run(channelID, userID);
	}

	async getSnippet(name: string): Promise<SnippetDB | null> {
		const data = await this.DB.prepare('SELECT content FROM snippets WHERE name = ?').get(name);
		return data ? data : null;
	}
}