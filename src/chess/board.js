/* Handles translations between ui state and logic state. Also stores initial state of board 
*  Logic Notation is  a mult-dimensional array, used for easy move calculating.
*  UI-State notation is an array of objects that have the standard notation for squares and pieces in them. 
  * Board.js does not store the state of the board, it merly provides a manner of mapping from logical to state, the only state is stored in redux-state. */
import { WHITE, BLACK } from '../reducers/pieces';

export const letterToNumber = { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 
																'e': 5, 'f': 6, 'g': 7, 'h': 8 };

export const numberToLetter = { '1': 'a', '2': 'b', '3': 'c', '4': 'd', 
																'5': 'e', '6': 'f', '7': 'g', '8': 'h' };

// Stores the inital state of the board in logic notation.
export const initBoard = () => {
	return [
		['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R'],
		['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['_', '_', '_', '_', '_', '_', '_', '_'],
		['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
		['r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']
	];
};

// from coordinate (logic) to squareId (ui-state)
export const toSquare = (coord) => {
  return numberToLetter[coord.x] +  coord.y;
};

// from squareId (ui-state) to coordinate (logic);
export const toCoord = (square) => {
  let [x, y] = square.split('');
	x = letterToNumber[x];

  // ensure that these are numbers by wrapping them in the Number js object.
  return { x: Number(x), y: Number(y) };
}

// Takes in logical board and maps it to ui-state board.
export const toState = (board) => {
  // logical board is multi-dimensional, map [y][x] to (x as letter)y
	return board.map((r,i)  => r.map((c, j) => {
		return {
      // board runs backwards, we want the 0 index to be 'h'. This is because we want the black king to be on e8, standard chess.
			id: numberToLetter['' + (9 - (j + 1))] + (i + 1),
			pieceId: c,
			color: c.toLowerCase() === c ? BLACK : WHITE
		};
	})).reduce( (a, b) => a.concat(b));
};

// takes in UI-state and produces logical board.
export const fromState = (state) => {
	let board = [];
	state.forEach(sq => {
		var [x, y] = sq.id.split('');
    // subtracting by one, coords are counting index.
		x = Number(letterToNumber[x]) - 1;
		y = Number(y) - 1;

    // if row does not exist, add it.
		if(!board[y]) board[y] = [];

		board[y][x] = sq.pieceId;
	});

	return board;
};
