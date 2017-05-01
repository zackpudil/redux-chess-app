export const WHITE = 'piece_white';
export const BLACK = 'piece_black';
export const NO_PIECE_ID = '_';

export const ROUTE_PIECE = 'chess/piece/route';
export const MOVE_PIECE = 'chess/piece/move';
export const TAKE_PIECE = 'chess/piece/take';
export const ADD_TAKEN_PIECE = 'chess/pieces/taken';

export const routePiece = (squareId, pieceId) => ({
	type: ROUTE_PIECE,
	squareId,
	pieceId
});

export const movePiece = (toSquareId) => ({
	type: MOVE_PIECE,
	toSquareId
});

export const takePiece = (toSquareId) => ({
  type: TAKE_PIECE,
  toSquareId
});

export const addTakenPiece = (pieceId, color) => ({
  type: ADD_TAKEN_PIECE,
  pieceId,
  color
});

export default (state = [], action) => {
  switch(action.type) {
    case ADD_TAKEN_PIECE:
      return [...state, { pieceId: action.pieceId, color: action.color }];
    default:
      return state;
  }
};
