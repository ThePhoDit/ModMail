import { SnippetDB, UserDB } from '../lib/types/Database';

export interface IDatabase {
	getUser(id: string, channel: boolean): Promise<UserDB | null>;
	addUser(id: string): void;
	boundChannel(userID: string, channelID: string): void;
	getSnippet(name: string): Promise<SnippetDB | null>;
}