import { WHITE, BLACK } from '../modules/pieces';
import { letterToNumber, numberToLetter, fromState } from './board';
import { enforceBoundary, enforceLatteralJump, enforceDiagnalJump, enforceTakenSquare } from './rule-engine';


export const pawn = (x, y, white, board) => {
	var move;
	if(white) {
		if(y == 2) move =[{ x, y: y + 1 }, { x, y: y + 2 }];
		else move = [{ x, y: y + 1 }];
	} else {
		if(y == 7) move =[{ x, y: y - 1 }, { x, y: y - 2}];
		else move = [{ x, y: y - 1 }];
	}

	move = enforceBoundary(move);
	move = enforceLatteralJump({x, y}, move, board);
	move = enforceTakenSquare({x, y}, move, white, board);
	move = enforceTakenSquare({x, y}, move, !white, board);

	return move;
};

export const knight = (x, y, white, board) => {
	let squares = [
		{ x: x + 1, y: y + 2 },
		{ x: x + 1, y: y - 2 },
		{ x: x - 1, y: y + 2 },
		{ x: x - 1, y: y - 2 },
		{ x: x - 2, y: y + 1 },
		{ x: x - 2, y: y - 1 },
		{ x: x + 2, y: y + 1 },
		{ x: x + 2, y: y - 1 }
	];

	squares = enforceBoundary(squares);
	squares = enforceTakenSquare({x, y}, squares, white, board);
	return squares;
};

export const bishop = (x, y, white, board) => {
	let squares = [];
	for(let i = 1; i <= 8; i++) {
		squares.push({ x: x - i, y: y - i });
		squares.push({ x: x + i, y: y - i });
		squares.push({ x: x + i, y: y + i });
		squares.push({ x: x - i, y: y + i });
	}

	squares = enforceBoundary(squares);
	squares = enforceDiagnalJump({x, y}, squares, board);
	squares = enforceTakenSquare({x, y}, squares, white, board);
	return squares;
};

export const rook = (x, y, white, board) => {
	let squares = [];
	for(let i = 1; i <= 8; i++) {
		squares.push({x, y: y - i});
		squares.push({x, y: y + i});
		squares.push({x: x + i, y});
		squares.push({x: x - i, y});
	}

	squares = enforceBoundary(squares);
	squares = enforceLatteralJump({x, y}, squares, board);
	squares = enforceTakenSquare({x, y}, squares, white, board);
	return squares;
}

export const queen = (x, y, color, board) => {
	return rook(x, y, color, board).concat(bishop(x, y, color, board));
};

export const king = (x, y, white, board) => {
	let squares = [
		{ x, y: y + 1 },
		{ x, y: y - 1 },
		{ x: x - 1, y },
		{ x: x + 1, y },
		{ x: x - 1, y: y - 1 },
		{ x: x - 1, y: y + 1 },
		{ x: x + 1, y: y - 1 },
		{ x: x + 1, y: y + 1 }
	];

	squares = enforceBoundary(squares);
	squares = enforceTakenSquare({x, y}, squares, white, board);
	return squares;
};

const stateToLogicMap = (calc, color, board) => (square) => {
	let [x, y] = square.split('');
	x = letterToNumber[x];

	let coords = calc(Number(x), Number(y), color === WHITE, board);

	return coords.map(c => numberToLetter[c.x] +  c.y);
};

export default (state) => {
	let board = fromState(state);
	return {
		'P': stateToLogicMap(pawn, WHITE, board),
		'p': stateToLogicMap(pawn, BLACK, board),
		'N': stateToLogicMap(knight, WHITE, board),
		'n': stateToLogicMap(knight, BLACK, board),
		'B': stateToLogicMap(bishop, WHITE, board),
		'b': stateToLogicMap(bishop, BLACK, board),
		'R': stateToLogicMap(rook, WHITE, board),
		'r': stateToLogicMap(rook, BLACK, board),
		'Q': stateToLogicMap(queen, WHITE, board),
		'q': stateToLogicMap(queen, BLACK, board),
		'K': stateToLogicMap(king, WHITE, board),
		'k': stateToLogicMap(king, BLACK, board)
	}
};
