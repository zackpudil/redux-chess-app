import { WHITE, BLACK } from '../modules/pieces';
import { letterToNumber, numberToLetter } from './board';

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

	return squares.filter(s => !(s.x > 8 || s.x < 1 || s.y > 8 || s.y < 1));
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
	'n': squareToCoords(knight, BLACK)
};
