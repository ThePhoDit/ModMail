import {IConfig, ILog, ISnippet, IUser, IMessage, LogDocument} from '../lib/types/Database';
import { Message } from 'eris';

export interface IDatabase {
	// Configs collection
	createConfig(data: Partial<IConfig>): Promise<IConfig | null>;
	getConfig(): Promise<IConfig | null>;
	updateConfig(key: string, value: string | number | boolean , operation: 'SET' | 'PUSH' | 'PULL' | 'UNSET'): Promise<boolean> | false;
	updateCompatibility(update: Partial<IConfig>): Promise<boolean>;
	deleteConfig(): Promise<boolean>;
	// Snippets
	createSnippet(name: string, data: ISnippet): Promise<boolean>;
	editSnippet(name: string, value: string): Promise<boolean> | false;
	deleteSnippet(name: string): Promise<boolean> | false;
	// Logs part
	createLog(data: Partial<ILog>): Promise<LogDocument | false>;
	getLog(id: string, type: 'ID' | 'USER' | 'CHANNEL', open: boolean): Promise<LogDocument | null>;
	appendMessage(logID: string, msg: Message, type: 'INTERNAL' | 'STAFF_REPLY' | 'RECIPIENT_REPLY', content: string | null, complementaryID?: string, overrideID?: string): Promise<boolean> | false;
	closeLog(log: LogDocument, msg?: Message, closer?: LogDocument['closer']): Promise<boolean>;
	updateLog(logID: string, key: string, value: string | number | boolean | Date | IMessage | IUser, operation: 'SET' | 'PUSH' | 'PULL' | 'UNSET'): Promise<boolean> | false;
	deleteLog(logID: string): Promise<boolean>;
	getUserLogs(userID: string): Promise<LogDocument[] | null>;
	getClosingScheduledLogs(userID: string): Promise<LogDocument[] | null>;
	numberOfPreviousLogs(userID: string): Promise<number>;
}