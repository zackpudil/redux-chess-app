import { initBoard, toState } from '../chess/board';

export const HIGHLIGHT_SQUARE = 'chess/squares/hightlight_square';
export const SELECT_SQUARE = 'chess/squares/select_square';
export const CLEAR_HIGHLIGHTS = 'chess/squares/clear_highlighs';
export const INIT_SQUARES = 'chess/squares/init';

export const highlightSquare = (squareId) => ({ type: HIGHLIGHT_SQUARE, squareId });
export const selectSquare = (squareId) => ({ type: SELECT_SQUARE, squareId });
export const clearHighlights = () => ({ type: CLEAR_HIGHLIGHTS });
export const initSquares = () => ({ type: INIT_SQUARES });

export const square = (state, action) => {
	switch(action.type) {
		case HIGHLIGHT_SQUARE:
			return Object.assign({}, state, { highlighted: true });
		case SELECT_SQUARE:
			return Object.assign({}, state, { selected: true });
		default:
			return state;
	}
};

export default (state, action) => {
	switch(action.type) {
		case INIT_SQUARES:
			return toState(initBoard());
		case HIGHLIGHT_SQUARE:
		case SELECT_SQUARE:
			return state.map(s => s.id === action.squareId 
				? square(s, action) : Object.assign({}, s));
		case CLEAR_HIGHLIGHTS:
			return state.map(s => Object.assign({}, s, { highlighted: false, selected: false }));
		default:
			return state;
	}
};
