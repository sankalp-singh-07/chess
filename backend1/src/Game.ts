import { Chess } from 'chess.js';
import { WebSocket } from 'ws';
import { GAME_OVER } from './initGame';

export class Game {
	public player1: WebSocket;
	public player2: WebSocket;
	private startTime: Date;
	private board: Chess;

	constructor(player1: WebSocket, player2: WebSocket) {
		this.player1 = player1;
		this.player2 = player2;
		this.startTime = new Date();
		this.board = new Chess();
	}

	makeMove(socket: WebSocket, move: { from: string; to: string }) {
		if (this.board.moves.length % 2 === 0 && socket === this.player2) {
			return;
		}
		if (this.board.moves.length % 2 === 1 && socket === this.player1)
			return;

		try {
			this.board.move(move);
		} catch (error) {
			return;
		}

		if (this.board.isGameOver()) {
			this.player1.emit(
				JSON.stringify({
					type: GAME_OVER,
					payload: {
						winner: this.board.turn() === 'w' ? 'white' : 'black',
					},
				})
			);

			this.player2.emit(
				JSON.stringify({
					type: GAME_OVER,
					payload: {
						winner: this.board.turn() === 'w' ? 'white' : 'black',
					},
				})
			);
			return;
		}
	}
}
