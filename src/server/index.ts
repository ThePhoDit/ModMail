import express from 'express';
import routes from './routes/index';

const server = express();
server.use('/', routes);

export default function start (): void {
	server.listen(process.env.PORT || 3000, () => {
		console.log('Server ready!');
	});
}

if (process.env.HOST === 'HEROKU')
	start();
