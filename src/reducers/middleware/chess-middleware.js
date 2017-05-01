import { ROUTE_PIECE, MOVE_PIECE, TAKE_PIECE, addTakenPiece } from '../pieces';
import { highlightSquare, selectSquare, clearHighlights, addPiece, removePiece } from '../squares';
import { analyzeBoard } from '../game';
import engine from '~/chess/engine';

export default store => next => action => {
	switch(action.type) {
		case ROUTE_PIECE:
			next(clearHighlights());
			let squares = engine(store.getState().squares)[action.pieceId](action.squareId);
			squares.forEach(s => next(highlightSquare(s)));
			next(selectSquare(action.squareId));
			break;
		case MOVE_PIECE:
    case TAKE_PIECE:
			let state = store.getState().squares;
			let selectedSquare = state.find(s => s.selected);
			let moveSquare = state.find(s => s.id === action.toSquareId);

      if(!selectedSquare || !moveSquare.highlighted) { 
        next(clearHighlights());
        return;
      }

      next(clearHighlights());
      if(action.type === MOVE_PIECE) {
        next(addPiece(action.toSquareId, selectedSquare.pieceId));
        next(removePiece(selectedSquare.id));
      } else if(action.type === TAKE_PIECE) {
        next(removePiece(action.toSquareId));
        next(addPiece(action.toSquareId, selectedSquare.pieceId));
        next(removePiece(selectedSquare.id));
        next(addTakenPiece(moveSquare.pieceId, moveSquare.color));
      }

      next(analyzeBoard(selectedSquare.id, action.toSquareId, selectedSquare.pieceId));
      break;
		default:
			next(action);
	} 
};
