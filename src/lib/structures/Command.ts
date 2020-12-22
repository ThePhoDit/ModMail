import Caller from './Caller';
import { CommandData, CommandOptions } from '../types/Commands';
import { UserDB } from '../types/Database';
import { CategoryChannel, Message, TextChannel } from 'eris';

class Command {
	name: string;
	run: (caller: Caller, command: { msg: Message; args: string[]; channel: TextChannel; category: CategoryChannel }, userDB: UserDB | null) => Promise<unknown>;
	options: CommandOptions;
	constructor(name: string, run: (caller: Caller, command: CommandData, userDB: UserDB | null) => Promise<unknown>, options?: Partial<CommandOptions>) {
		this.name = name;
		this.run = run;
		this.options = Object.assign({
			aliases: [],
			level: 'MANAGER',
			threadOnly: false
		}, options);
	}
}

export default Command;