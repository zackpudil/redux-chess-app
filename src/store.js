import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import chess from './modules/middleware/chess-middleware';
import gamem from './modules/middleware/game-middleware';

import squares from './modules/squares';
import pieces from './modules/pieces';

const rootReducer = combineReducers({
  squares: squares,
  takenPieces: pieces
});

let composedMiddleware = compose(
	applyMiddleware(chess),
  applyMiddleware(gamem)
);

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedMiddleware = compose(composedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, composedMiddleware);
