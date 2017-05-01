import { WHITE, BLACK } from '../reducers/pieces';
import { toSquare, toCoord, fromState } from './board';
import { enforceBoundary, enforceLatteralJump, 
         enforceDiagnalJump, enforceTakenSquare,
         pawnCanTakeDiagnally, kingCastle } from './rules';
import * as mover from  './moves';


export const pawn = (x, y, white, board) => {
	let moves = mover.pawn(x, y, white);

	moves = enforceBoundary(moves);
	moves = enforceLatteralJump({x, y}, moves, board);
	moves = enforceTakenSquare({x, y}, moves, white, board);
	moves = enforceTakenSquare({x, y}, moves, !white, board);

  moves = moves.concat(pawnCanTakeDiagnally({x, y}, white, board));

	return moves;
};

export const knight = (x, y, white, board) => {
	let moves = mover.knight(x, y);
	moves = enforceBoundary(moves);
	moves = enforceTakenSquare({x, y}, moves, white, board);
	return moves;
};

export const bishop = (x, y, white, board) => {
	let moves = mover.bishop(x, y);
	moves = enforceBoundary(moves);
	moves = enforceDiagnalJump({x, y}, moves, board);
	moves = enforceTakenSquare({x, y}, moves, white, board);

	return moves;
};

export const rook = (x, y, white, board) => {
  let moves = mover.rook(x, y);
	moves = enforceBoundary(moves);
	moves = enforceLatteralJump({x, y}, moves, board);
	moves = enforceTakenSquare({x, y}, moves, white, board);
	return moves;
}

export const queen = (x, y, color, board) => {
	return rook(x, y, color, board).concat(bishop(x, y, color, board));
};

export const king = (x, y, white, board) => {
	let moves = mover.king(x, y);
	moves = enforceBoundary(moves);
	moves = enforceTakenSquare({x, y}, moves, white, board);
  moves = moves.concat(kingCastle(white, board));
	return moves;
};

const stateToLogicMap = (calc, color, board) => (square) => {
	let {x, y} = toCoord(square);
	let coords = calc(Number(x), Number(y), color === WHITE, board);
	return coords.map(toSquare);
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
