import express from 'express';
import routes from './routes/index';
import dotenv from 'dotenv';
dotenv.config();

const server = express();
server.use('/', routes);

export function start (): void {
	server.listen(process.env.PORT || 3000, () => {
		console.log('Server ready!');
	});
}

if (process.env.HOST === 'HEROKU')
	start();
