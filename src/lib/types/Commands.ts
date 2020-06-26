import { Message, Member, TextChannel } from 'eris';

interface CommandData {
	msg: Message;
	member: Member;
	args: string[];
	channel: TextChannel;
}

interface CommandOptions {
	aliases: string[];
	level: 'MANAGER' | 'HELPER'
}

export {
	CommandData,
	CommandOptions
};