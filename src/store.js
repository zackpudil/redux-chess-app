import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import chess from './modules/middleware/chess-middleware';
import squares from './modules/squares';

const rootReducer = squares;

let composedMiddleware = compose(
	applyMiddleware(chess)
);

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedMiddleware = compose(composedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, composedMiddleware);
