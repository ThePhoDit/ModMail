import Caller from './Caller';
import { CommandData, CommandOptions } from '../types/Commands';
import { Thread } from '../types/Database';

class Command {
	name: string;
	run: (caller: Caller, command: CommandData, userDB: Thread) => Promise<unknown>;
	options: CommandOptions;
	constructor(name: string, run: (caller: Caller, command: CommandData, userDB: Thread) => Promise<unknown>, options?: Partial<CommandOptions>) {
		this.name = name;
		this.run = run;
		this.options = Object.assign({
			aliases: [],
			level: 'MANAGER'
		}, options);
	}
}

export default Command;