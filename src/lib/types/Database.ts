interface UserDB {
	user: string;
	channel: string;
	threads: number;
	blacklisted: 0 | 1;
	logs: MessageLog[];
}

interface SnippetDB {
	name: string;
	creator: string;
	content: string;
}

interface MessageLog {
	userID: string;
	location: 'USER' | ' ADMIN' | 'OOT';
	content: string;
	images?: string[];
}

export {
	UserDB,
	SnippetDB,
	MessageLog
};