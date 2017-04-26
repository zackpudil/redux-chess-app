import { ROUTE_PIECE, MOVE_PIECE } from '../pieces';
import { highlightSquare, selectSquare, clearHighlights, addPiece, removePiece } from '../squares';
import moveEngine from '../../chess/move-engine';

export default store => next => action => {
	switch(action.type) {
		case ROUTE_PIECE:
			next(clearHighlights());
			let squares = moveEngine[action.pieceId](action.squareId);
			squares.forEach(s => next(highlightSquare(s)));
			next(selectSquare(action.squareId));
			break;
		case MOVE_PIECE:
			let state = store.getState();

			let selectedSquare = state.find(s => s.selected);
			let moveSquare = state.find(s => s.id === action.toSquareId);

			if(!selectedSquare || !moveSquare.highlighted) return;

			next(clearHighlights());
			next(addPiece(action.toSquareId, selectedSquare.pieceId));
			next(removePiece(selectedSquare.id));
		default:
			next(action);
	} 
};
