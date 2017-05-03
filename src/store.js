import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import chess from './reducers/middleware/chess-middleware';
import analysis from './reducers/middleware/analysis-middleware';

import squares from './reducers/squares';
import pieces from './reducers/pieces';
import game from './reducers/game';

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
