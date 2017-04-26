import sinon from 'sinon';
import assert from 'assert';

import * as squares from '../squares';
import * as chess from '../../chess/move-engine';
import {ROUTE_PIECE} from '../pieces';

import subject from './piece-movement';

describe('pieceMovement', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});

	describe('Route action', () => {
		it('should dispatch actions based on move engine.', () => {
			let action = { type: ROUTE_PIECE, pieceId: 'p', squareId: 't1' };

			let next = sinon.spy();
			sinon.stub(chess.default, 'p').returns(['a1', 'b1', 'c4']); 
			sinon.spy(squares, 'highlightSquare');
			sinon.spy(squares, 'selectSquare');
			sinon.spy(squares, 'clearHighlights');

			subject()(next)(action);

			assert(chess.default.p.calledWith('t1'));
			assert(squares.clearHighlights.called);
			assert(squares.highlightSquare.calledWith('a1'));
			assert(squares.highlightSquare.calledWith('b1'));
			assert(squares.highlightSquare.calledWith('c4'));
			assert(squares.selectSquare.calledWith('t1'));


			assert.equal(next.callCount, 5);
		});
	});
});
