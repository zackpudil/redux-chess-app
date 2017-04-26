export const ROUTE_PIECE = 'chess/piece/route';
export const WHITE = 'piece_white';
export const BLACK = 'piece_black';

export const routePiece = (squareId, pieceId) => ({
	type: ROUTE_PIECE,
	squareId,
	pieceId
});
