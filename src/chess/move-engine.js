import { WHITE, BLACK } from '../modules/pieces';
import { letterToNumber, numberToLetter } from './board';

const filterBadSquares = (squares) => squares.filter(s => !(s.x > 8 || s.x < 1 || s.y > 8 || s.y < 1));

export const pawn = (x, y, white) => {
	if(white) {
		if(y == 2) return [{ x, y: y + 1 }, { x, y: y + 2 }];
		else if(y == 8) return [];
		return [{ x, y: y + 1 }];
	} else {
		if(y == 7) return [{ x, y: y - 1 }, { x, y: y - 2}];
		else if(y == 1) return [];
		return [{ x, y: y - 1 }];
	}
};

export const knight = (x, y) => {
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

	return filterBadSquares(squares);
};

export const bishop = (x, y) => {
	let squares = [];
	for(let i = 1; i <= 8; i++) {
		squares.push({ x: x - i, y: y - i });
		squares.push({ x: x + i, y: y - i });
		squares.push({ x: x + i, y: y + i });
		squares.push({ x: x - i, y: y + i });
	}
	return filterBadSquares(squares);
};

export const rook = (x, y) => {
	let squares = [];
	for(let i = 1; i <= 8; i++) {
		squares.push({x, y: y - i});
		squares.push({x, y: y + i});
		squares.push({x: x + i, y});
		squares.push({x: x - i, y});
	}

	return filterBadSquares(squares);
}

export const queen = (x, y) => {
	return rook(x, y).concat(bishop(x, y));
};

export const king = (x, y) => {
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

	return filterBadSquares(squares);
};

const squareToCoords = (calc, color) => (square) => {
	let [x, y] = square.split('');
	x = letterToNumber[x];

	let coords = calc(Number(x), Number(y), color === WHITE);

	return coords.map(c => numberToLetter[c.x] +  c.y);
};

export default {
	'P': squareToCoords(pawn, WHITE),
	'p': squareToCoords(pawn, BLACK),
	'N': squareToCoords(knight, WHITE),
	'n': squareToCoords(knight, BLACK),
	'B': squareToCoords(bishop, WHITE),
	'b': squareToCoords(bishop, BLACK),
	'R': squareToCoords(rook, WHITE),
	'r': squareToCoords(rook, BLACK),
	'Q': squareToCoords(queen, WHITE),
	'q': squareToCoords(queen, BLACK),
	'K': squareToCoords(king, WHITE),
	'k': squareToCoords(king, BLACK)
};
