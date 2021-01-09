interface UserDB {
	user: string;
	channel: string;
	threads: number;
	blacklisted: 0 | 1;
	logs: string;
}

interface SnippetDB {
	name: string;
	creator: string;
	content: string;
}

interface LogDB {
	id: string;
	user: string;
	channel: string;
	timestamp: number;
	messages: MessageLog[];
}

interface MessageLog {
	userID: string;
	location: 'USER' | 'ADMIN' | 'OOT';
	content: string;
	date: Date;
	images?: string[];
}

export {
	UserDB,
	SnippetDB,
	LogDB,
	MessageLog
};