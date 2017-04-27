import {NO_PIECE_ID} from '../modules/pieces';

const meetsLatteralCuttoff = (moveIndex, startIndex, pieces, coord) => {
		if(moveIndex[coord] < startIndex[coord]) {
			return pieces
				.filter(mwp => mwp[coord] < startIndex[coord])
				.filter(mwp => mwp[coord] >= moveIndex[coord]).length === 0;
		} else if(moveIndex[coord] > startIndex[coord]) {
			return pieces
				.filter(mwp => mwp[coord] > startIndex[coord])
				.filter(mwp => mwp[coord] <= moveIndex[coord]).length === 0;
		}
};

export const enforceLatteralJump = (startSquare, moveSquares, board) => {
	let startIndex = { x: startSquare.x - 1, y: startSquare.y - 1 };
	let moveIndexes = moveSquares.map(ps => ({ x: ps.x - 1, y: ps.y - 1 }));
	let movesWithPiecesOnThem = moveIndexes.filter(mi => { 
		return board[mi.y][mi.x] !== NO_PIECE_ID;
	});

	let movesWithNoJumps = moveIndexes.filter(mi => {
		return meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'x')
		 || meetsLatteralCuttoff(mi, startIndex, movesWithPiecesOnThem, 'y');
	});

	return movesWithNoJumps.map(mi => ({ x: mi.x + 1, y: mi.y + 1}));
};

export const enforceBoundary = (squares) => squares.filter(s => !(s.x > 8 || s.x < 1 || s.y > 8 || s.y < 1));
