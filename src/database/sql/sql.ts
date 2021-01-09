import {UserDB, SnippetDB, LogDB, MessageLog} from '../../lib/types/Database';
import { IDatabase } from '../IDatabase';

export default class SQL implements IDatabase {
	// @ts-ignore
	private DB;
	static db: SQL;

	private constructor() {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		this.DB = require('better-sqlite3')('modmail.db');
		this.DB.prepare('CREATE TABLE IF NOT EXISTS users (user TEXT NOT NULL PRIMARY KEY, channel TEXT NOT NULL DEFAULT \'0\', threads INTEGER NOT NULL DEFAULT 0, blacklisted INTEGER NOT NULL DEFAULT 0, logs TEXT DEFAULT \'0\')').run();
		this.DB.prepare('CREATE INDEX IF NOT EXISTS channel_index ON users (channel)').run();
		this.DB.prepare('CREATE TABLE IF NOT EXISTS snippets (name TEXT NOT NULL PRIMARY KEY, creator TEXT NOT NULL, content TEXT NOT NULL)').run();
		this.DB.prepare('CREATE TABLE IF NOT EXISTS logs (id TEXT NOT NULL PRIMARY KEY, user TEXT NOT NULL, channel TEXT NOT NULL, timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, messages TEXT NOT NULL)').run();
		this.DB.prepare('CREATE INDEX IF NOT EXISTS log_user_index ON logs (user)').run();
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

	async addUser(id: string): Promise<void> {
		await this.DB.prepare('INSERT INTO users (user) VALUES (?)').run(id);
	}

	async boundChannel(userID: string, channelID: string): Promise<void> {
		const data = await this.getUser(userID);

		if (!data)
			await this.addUser(userID);

		const logID = `t${Date.now()}c${channelID}`;
		this.DB.prepare('UPDATE users SET channel = ?, logs = ? WHERE user = ?').run(channelID, logID, userID);
		this.DB.prepare('INSERT INTO logs (id, user, channel, messages) VALUES (?, ?, ?, ?)').run(logID, userID, channelID, '[]');
	}

	async getSnippet(name: string): Promise<SnippetDB | null> {
		const data = await this.DB.prepare('SELECT content FROM snippets WHERE name = ?').get(name);
		return data ? data : null;
	}

	closeChannel(id: string): void {
		this.DB.prepare('UPDATE users SET channel = \'0\', threads = threads + 1, logs = null WHERE channel = ?').run(id);
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
		return await this.DB.prepare('SELECT * FROM snippets').all() as SnippetDB[];
	}

	async addMessage(userID: string, location: 'USER' | 'OOT' | 'ADMIN', content: string, logID: string, images: string[] | undefined = undefined): Promise<void> {
		const result = await this.DB.prepare('SELECT messages FROM logs WHERE id = ?').get(logID);
		const array = JSON.parse(result.messages) as MessageLog[];
		array.push({userID, location, content, date: new Date(), images });
		this.DB.prepare('UPDATE logs SET messages = ? WHERE id = ?').run(JSON.stringify(array), logID);
	}

	async getLogs(logID: string): Promise<LogDB | null> {
		const data = await this.DB.prepare('SELECT channel, messages FROM logs WHERE id = ?').get(logID);
		if (!data) return null;
		data.messages = JSON.parse(data.messages);
		return data;
	}
	async getUserLogs(userID: string): Promise<string[] | null> {
		const data = await this.DB.prepare('SELECT id, timestamp FROM logs WHERE user = ?').all(userID);
		if (!data || data.length === 0) return null;
		return data
			.sort((a: { timestamp: string }, b: { timestamp: string }) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
			.map((r: { id: string }) => `${process.env.LOGS_URL}/logs/${r.id}`);
	}
}