import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import pieceMovement from './modules/middleware/piece-movement';
import squares from './modules/squares';

const rootReducer = squares;

let composedMiddleware = compose(
	applyMiddleware(pieceMovement)
);

if(window.__REDUX_DEVTOOLS_EXTENSION__) {
	composedMiddleware = compose(composedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default createStore(rootReducer, composedMiddleware);
