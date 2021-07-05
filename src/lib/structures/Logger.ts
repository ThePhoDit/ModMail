import * as chalk from 'chalk';

export default class Logger {
	info(message: string): void {
		console.log(chalk.magentaBright(message));
	}

	debug(message: string): void {
		console.log(chalk.cyanBright(message));
	}

	warn(message: string): void {
		console.log(chalk.yellow(message));
	}

	error(message: string): void {
		console.log(chalk.white.bgRed(message));
	}
}