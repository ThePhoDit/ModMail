import { LogDB, SnippetDB, UserDB } from '../lib/types/Database';

export interface IDatabase {
	getUser(id: string, channel: boolean): Promise<UserDB | null>;
	addUser(id: string): Promise<void>;
	boundChannel(userID: string, channelID: string): Promise<void>;
	getSnippet(name: string): Promise<SnippetDB | null>;
	closeChannel(id: string): void;
	updateBlacklist(userID: string, action: 'add' | 'remove'): void;
	createSnippet(name: string, creatorID: string, content: string): void;
	deleteSnippet(name: string): void;
	getSnippets(): Promise<SnippetDB[]>;
	addMessage(userID: string, location: 'USER' | 'ADMIN' | 'OOT', content: string, logID: string, images: string[] | undefined): Promise<void>;
	getLogs(logID: string): Promise<LogDB | null>;
	getUserLogs(userID: string): Promise<string[] | null>;
}