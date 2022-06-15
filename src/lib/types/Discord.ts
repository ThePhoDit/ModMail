import { Attachment, Embed } from 'eris';

interface MessageObject {
	attachment: Attachment[];
	embeds: Embed[];
	content: string;
	editedTimestamp?: number;
	pinned: boolean;
	tts: boolean;
	mentions: string[];
	roleMentions: string[];
	channelMentions: string;
}

export {
	MessageObject
};