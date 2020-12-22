import { SnippetDB, UserDB } from '../lib/types/Database';

export interface IDatabase {
	getUser(id: string, channel: boolean): Promise<UserDB | null>;
	addUser(id: string): void;
	boundChannel(userID: string, channelID: string): Promise<void>;
	getSnippet(name: string): Promise<SnippetDB | null>;
	closeChannel(id: string): void;
	updateBlacklist(userID: string, action: 'add' | 'remove'): void;
	createSnippet(name: string, creatorID: string, content: string): void;
	deleteSnippet(name: string): void;
	getSnippets(): Promise<SnippetDB[]>;
}