import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import chess from './reducers/middleware/chess-middleware';
import analysis from './reducers/middleware/analysis-middleware';

import squares from './reducers/squares';
import pieces from './reducers/pieces';
import game from './reducers/game';

const rootReducer = combineReducers({
  squares: squares,
  takenPieces: pieces,
  game: game
});

let composedMiddleware = compose(
	applyMiddleware(chess),
  applyMiddleware(analysis)
);

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedMiddleware = compose(composedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, composedMiddleware);
