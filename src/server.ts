import express from 'express';
const server = express();

server.all('/', (_req, res) => {
	res.send('The Bot is still alive.');
});

export function keepAlive(): boolean {
	server.listen(3000, () => {
		console.log('Server is ready.');
	});
	return true;
}

