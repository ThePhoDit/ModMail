import Mail from './Mail';
import { CommandData, CommandOptions } from '../types/Commands';
import { IConfig, LogDocument } from '../types/Database';
import { CategoryChannel, Message, TextChannel } from 'eris';

class Command {
	name: string;
	run: (caller: Mail, command: { msg: Message; args: string[]; channel: TextChannel; category: CategoryChannel }, log: LogDocument | null, config: IConfig) => Promise<unknown>;
	options: CommandOptions;
	constructor(name: string, run: (caller: Mail, command: CommandData, log: LogDocument | null, config: IConfig) => Promise<unknown>, options?: Partial<CommandOptions>) {
		this.name = name;
		this.run = run;
		this.options = Object.assign({
			aliases: [],
			level: 'ADMIN',
			threadOnly: false
		}, options);
	}
}

export default Command;