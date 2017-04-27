import { WHITE, BLACK } from '../modules/pieces';

export const letterToNumber = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 
																'e': 5, 'f': 6, 'g': 7, 'h': 8 };

export const numberToLetter = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', 
																'5': 'e', '6': 'f', '7': 'g', '8': 'h' };

export const initBoard = () => {
	return [
		['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
		['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
	];
};

export const toState = (board) => {
	return board.map((r,i)  => r.map((c, j) => {
		return {
			id: numberToLetter['' + (j + 1)] + (i + 1),
			pieceId: c,
			color: c.toLowerCase() === c ? BLACK : WHITE
		};
	})).reduce( (a, b) => a.concat(b));
};

export const fromState = (state) => {
	let board = [];
	state.forEach(sq => {
		var [x, y] = sq.id.split('');
		x = Number(letterToNumber[x]) - 1;
		y = Number(y) - 1;

		if(!board[y]) board[y] = [];

		board[y][x] = sq.pieceId;
	});

	return board;
};
