/* Main reducer of chess app.  Handles adding/removing/highlighting/selecting of pieces or squares.  */
import { initBoard, toState } from '../chess/board';
import { NO_PIECE_ID, WHITE, BLACK } from './pieces';

export const HIGHLIGHT_SQUARE = 'chess/squares/hightlight_square';
export const SELECT_SQUARE = 'chess/squares/select_square';
export const ADD_PIECE = 'chess/squares/add_piece';
export const REMOVE_PIECE = 'chess/squares/remove_piece';
export const CLEAR_HIGHLIGHTS = 'chess/squares/clear_highlighs';
export const INIT_SQUARES = 'chess/squares/init';

export const highlightSquare = (squareId) => ({ type: HIGHLIGHT_SQUARE, squareId }); // set highlighted property to true for square id.
export const selectSquare = (squareId) => ({ type: SELECT_SQUARE, squareId }); // set selected property  to true for squareId.
export const addPiece = (squareId, pieceId) => ({ type: ADD_PIECE, squareId, pieceId, color: pieceId.toLowerCase() === pieceId ?  BLACK : WHITE }); // sets pieceId property of square.
export const removePiece = (squareId) => ({ type: REMOVE_PIECE, squareId }); // sets pieceId to NO_PIECE_ID for squareId.
export const clearHighlights = () => ({ type: CLEAR_HIGHLIGHTS }); // sets highlighted and selected to false for all squares.
export const initSquares = () => ({ type: INIT_SQUARES }); // sets the initial board.  Called when board component is loaded.

export const square = (state, action) => {
	switch(action.type) {
		case HIGHLIGHT_SQUARE:
			return Object.assign({}, state, { highlighted: true });
		case SELECT_SQUARE:
			return Object.assign({}, state, { selected: true });
		case ADD_PIECE:
			return Object.assign({}, state, { pieceId: action.pieceId, color: action.color });
		case REMOVE_PIECE:
			return Object.assign({}, state, { pieceId: NO_PIECE_ID });
		default:
			return state;
	}
};

export default (state = [], action) => {
	switch(action.type) {
		case INIT_SQUARES:
			return toState(initBoard()); // use the board to get the initial board, and map it to ui-state.
		case HIGHLIGHT_SQUARE:
		case SELECT_SQUARE:
		case ADD_PIECE:
		case REMOVE_PIECE:
			return state.map(s => s.id === action.squareId 
				? square(s, action) : Object.assign({}, s));
		case CLEAR_HIGHLIGHTS:
			return state.map(s => Object.assign({}, s, { highlighted: false, selected: false }));
		default:
			return state;
	}
};
