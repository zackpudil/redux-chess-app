import { ROUTE_PIECE, MOVE_PIECE } from '../pieces';
import { highlightSquare, selectSquare, clearHighlights, addPiece, removePiece } from '../squares';
import { analyzeBoard } from '../game';
import engine from '~/chess/engine';

export default store => next => action => {
	switch(action.type) {
		case ROUTE_PIECE:
			next(clearHighlights());
			let squares = engine(store.getState())[action.pieceId](action.squareId);
			squares.forEach(s => next(highlightSquare(s)));
			next(selectSquare(action.squareId));
			break;
		case MOVE_PIECE:
			let state = store.getState();
			let selectedSquare = state.find(s => s.selected);
			let moveSquare = state.find(s => s.id === action.toSquareId);

      if(!selectedSquare || !moveSquare.highlighted) { 
        next(clearHighlights());
        return;
      }

      next(clearHighlights());
      next(addPiece(action.toSquareId, selectedSquare.pieceId));
      next(removePiece(selectedSquare.id));
      next(analyzeBoard(selectedSquare.id, action.toSquareId, selectedSquare.pieceId));
      break;
		default:
			next(action);
	} 
};
