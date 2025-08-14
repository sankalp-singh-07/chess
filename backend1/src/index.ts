import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 5000 });

const gameManager = new GameManager();

wss.on('connection', function (socket) {
	gameManager.addUser(socket);

	socket.on('close', () => gameManager.removeUser(socket));
});
