import express from 'express';
import routes from './routes/index';

const server = express();
server.use('/', routes);

export default (): void => {
	server.listen(process.env.LOGS_PORT, () => {
		console.log('Server ready!');
	});
};

