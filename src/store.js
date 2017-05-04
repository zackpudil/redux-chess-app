import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import chess from './modules/middleware/chess-middleware';
import analysis from './modules/middleware/analysis-middleware';

import squares from './modules/squares';
import pieces from './modules/pieces';
import game from './modules/game';

const rootReducer = combineReducers({
  squares: squares, // main ui slice of the state.
  takenPieces: pieces, // taken pieces list.
  game: game // move recording.
});

let composedMiddleware = compose(
	applyMiddleware(chess), // handles the move, take and route actions.
  applyMiddleware(analysis) // handles specialty cases like castling, checking and pawn promotion.
);

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedMiddleware = compose(composedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, composedMiddleware);
