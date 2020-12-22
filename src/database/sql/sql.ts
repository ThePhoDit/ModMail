import { UserDB, SnippetDB } from '../../lib/types/Database';
import { IDatabase } from '../IDatabase';

export default class SQL implements IDatabase {
	private DB;
	static db: SQL;

	private constructor() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		this.DB = require('better-sqlite3')('modmail.db');
		this.DB.prepare('CREATE TABLE IF NOT EXISTS users (user TEXT NOT NULL PRIMARY KEY, channel TEXT NOT NULL DEFAULT \'0\', threads INTEGER NOT NULL DEFAULT 0, blacklisted INTEGER NOT NULL DEFAULT 0);');
		this.DB.prepare('CREATE INDEX IF NOT EXISTS channel_index ON users (channel)');
		this.DB.prepare('CREATE TABLE IF NOT EXISTS snippets (name TEXT NOT NULL PRIMARY KEY, creator TEXT NOT NULL, content TEXT NOT NULL);');
	}

	static getDatabase(): SQL {
		if (!this.db)
			this.db = new SQL();
		return this.db;
	}

	async getUser(id: string, channel = false): Promise<UserDB | null> {
		const data = await this.DB.prepare(`SELECT * FROM users WHERE ${channel ? 'channel' : 'user'} = ?`).get(id);
		return data ? data : null;
	}

	addUser(id: string): void {
		this.DB.prepare(`INSERT INTO users (id) VALUES (?)`).run(id);
	}

	async boundChannel(userID: string, channelID: string): Promise<void> {
		const data = await this.getUser(userID);

		if (!data)
			await this.addUser(userID);

		this.DB.prepare('UPDATE users SET channel = ? WHERE user = ?').run(channelID, userID);
	}

	async getSnippet(name: string): Promise<SnippetDB | null> {
		const data = await this.DB.prepare('SELECT content FROM snippets WHERE name = ?').get(name);
		return data ? data : null;
	}

	closeChannel(id: string): void {
		this.DB.prepare('UPDATE users SET channel = \'0\', threads = threads + 1 WHERE channel = ?').run(id);
	}

	updateBlacklist(userID: string, action: 'add' | 'remove'): void {
		this.DB.prepare('UPDATE users SET blacklisted = ? WHERE user = ?').run(action === 'add' ? 1 : 0, userID);
	}

	createSnippet(name: string, creatorID: string, content: string): void {
		this.DB.prepare('INSERT INTO snippets (name, creator, content) VALUES (?, ?, ?)').run(name, creatorID, content);
	}

	deleteSnippet(name: string): void {
		this.DB.prepare('DELETE FROM snippets WHERE name = ?').run(name);
	}

	async getSnippets(): Promise<SnippetDB[]> {
		return await this.DB.prepare('SELECT * FROM snippets') as SnippetDB[];
	}
}