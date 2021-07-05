import {Document} from "mongoose";

interface IUser {
	id: string;
	username: string;
	discriminator: string;
	avatarURL: string;
}

interface IMessage {
	timestamp: Date;
	id: string;
	type: 'INTERNAL' | 'STAFF_REPLY' | 'RECIPIENT_REPLY',
	author: IUser;
	content: string;
	attachments: string[];
}

interface ISnippet {
	content: string;
	creatorID: string;
	createdAt: Date;
}

interface ILog {
	open: boolean;
	botID: string;
	guildID: string;
	channelID: string;
	createdAt: Date;
	closedAt?: Date;
	recipient: IUser;
	creator: IUser;
	closer?: IUser;
	messages: IMessage[];
	nsfw: boolean;
	title?: string;
	note?: string;
	subscriptions: string[];
}

interface IEmbed {
	title: string;
	description: string;
	footer: string;
	footerImageURL?: string;
	color: string;
}

interface IStaffEmbed {
	title: string;
	color: string;
}

interface IConfig {
	botID: string;
	prefix: string;
	mainCategoryID: string;
	logsChannelID?: string;
	status?: string;
	blacklist: string[];
	levelPermissions?: {
		REGULAR?: string[];
		SUPPORT?: string[];
		ADMIN?: string[];
	};
	commandsPermissions?: Record<string, string[]>;
	aliases?: Record<string, string>;
	notificationRole?: string;
	embeds: {
		creation: IEmbed;
		closure: IEmbed;
		staff: IStaffEmbed;
	};
	snippets: Record<string, ISnippet>;
	expirationDate?: number;
}

type ConfigDocument = IConfig & Document;
type LogDocument = ILog & Document;

export {
	ILog,
	IConfig,
	ISnippet,
	IMessage,
	IUser,
	ConfigDocument,
	LogDocument
};