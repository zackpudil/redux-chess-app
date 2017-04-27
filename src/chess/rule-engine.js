import {NO_PIECE_ID} from '../modules/pieces';

const toIndex = (ms) => ms.map((m) => ({ x: m.x - 1, y: m.y - 1 }));
const fromIndex = (mi) => mi.map((m) => ({x: m.x + 1, y: m.y + 1 }));

const meetsLatteralCuttoff = (moveIndex, startIndex, pieces, coord) => {
		if(moveIndex[coord] < startIndex[coord]) {
			return pieces
				.filter(mwp => mwp[coord] < startIndex[coord])
				.filter(mwp => mwp[coord] > moveIndex[coord]).length === 0;
		} else if(moveIndex[coord] > startIndex[coord]) {
			return pieces
				.filter(mwp => mwp[coord] > startIndex[coord])
				.filter(mwp => mwp[coord] < moveIndex[coord]).length === 0;
		}
};

export const enforceLatteralJump = (startSquare, moveSquares, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);
	let movesWithPiecesOnThem = moveIndexes.filter(mi => { 
		return board[mi.y][mi.x] !== NO_PIECE_ID;
	});

	let movesWithNoJumps = moveIndexes.filter(mi => {
		return meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'x')
		 || meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'y');
	});

	return fromIndex(movesWithNoJumps);
};

export const enforceDiagnalJump = (startSquare, moveSquares, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);

	let movesWithPiecesOnThem = moveIndexes.filter(mi => {
		return board[mi.y][mi.x] !== NO_PIECE_ID;
	});

	let movesWithNoJumps = moveIndexes.filter(mi => {
		return meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'x');
	});

	return fromIndex(movesWithNoJumps);
};

export const enforceTakenSquare = (startSquare, moveSquares, isWhite, board) => {
	let startIndex = toIndex([startSquare])[0];
	let moveIndexes = toIndex(moveSquares);

	return fromIndex(moveIndexes.filter(mi => {
		let piece = board[mi.y][mi.x];
		return isWhite ? piece.toLowerCase() === piece : piece.toUpperCase() === piece;
	}));
}

export const enforceBoundary = (squares) => squares.filter(s => !(s.x > 8 || s.x < 1 || s.y > 8 || s.y < 1));
