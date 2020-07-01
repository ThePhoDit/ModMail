import { Message,  TextChannel, CategoryChannel } from 'eris';

interface CommandData {
	msg: Message;
	args: string[];
	channel: TextChannel;
	category: CategoryChannel;
}

interface CommandOptions {
	aliases: string[];
	level: 'MANAGER' | 'HELPER';
	threadOnly: boolean;
}

export {
	CommandData,
	CommandOptions
};