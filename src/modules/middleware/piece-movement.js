import { ROUTE_PIECE } from '../pieces';
import { highlightSquare, selectSquare, clearHighlights } from '../squares';
import moveEngine from '../../chess/move-engine';

export default store => next => action => {
	switch(action.type) {
		case ROUTE_PIECE:
			next(clearHighlights());
			let squares = moveEngine[action.pieceId](action.squareId);
			squares.forEach(s => next(highlightSquare(s)));
			next(selectSquare(action.squareId));
			break;
		default:
			next(action);
	} 
};
