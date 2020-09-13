interface UserDB {
	user: string;
	channel: string;
	threads: number;
	blacklisted: 0 | 1;
}

interface SnippetDB {
	name: string;
	creator: string;
	content: string;
}

export {
	UserDB,
	SnippetDB
};