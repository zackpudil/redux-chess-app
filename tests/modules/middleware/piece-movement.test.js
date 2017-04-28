import sinon from 'sinon';
import assert from 'assert';

import * as squares from '~/modules/squares';
import * as chess from '~/chess/move-engine';
import {ROUTE_PIECE, MOVE_PIECE} from '~/modules/pieces';

import subject from '~/modules/middleware/piece-movement';

describe('pieceMovement', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});

	describe('Route action', () => {
		beforeEach(() => {
			sinon.stub(chess, 'default').returns({
				p: () => ['a1', 'b1', 'c4']
			}); 
			sinon.spy(squares, 'highlightSquare');
			sinon.spy(squares, 'selectSquare');
			sinon.spy(squares, 'clearHighlights');
		});

		afterEach(() => {
			chess.default.restore();
			squares.highlightSquare.restore();
			squares.selectSquare.restore();
			squares.clearHighlights.restore();
		});

		it('should dispatch actions based on move engine.', () => {
			let action = { type: ROUTE_PIECE, pieceId: 'p', squareId: 't1' };

			let next = sinon.spy();
			
			subject({ getState: () => [] })(next)(action);

			assert(squares.clearHighlights.called);
			assert(squares.highlightSquare.calledWith('a1'));
			assert(squares.highlightSquare.calledWith('b1'));
			assert(squares.highlightSquare.calledWith('c4'));
			assert(squares.selectSquare.calledWith('t1'));


			assert.equal(next.callCount, 5);
		});
	});

	describe('Move peice', () => {
		var action, next;

		beforeEach(() => {
			action = { type: MOVE_PIECE, toSquareId: '2' };
			next = sinon.spy();

			sinon.spy(squares, 'clearHighlights');
			sinon.spy(squares, 'addPiece');
			sinon.spy(squares, 'removePiece');
		});

		afterEach(() => {
			squares.clearHighlights.restore();
			squares.addPiece.restore();
			squares.removePiece.restore();
		});

		it('should dispatch add/remove piece actions with currently selected square.', () => {
			let state = { 
				getState: () => [
					{ id: '1', pieceId: 'b', selected: true }, 
					{ id: '2', highlighted: true }
				]
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(squares.addPiece.calledWith('2', 'b'));
			assert(squares.removePiece.calledWith('1'));
		});

		it('should not dispatch any actions if no piece is selected.', () => {
			let state = { 
				getState: () => [
					{ id: '1', pieceId: 'b', selected: false }, 
					{ id: '2', highlighted: true }
				]
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(!squares.addPiece.called);
			assert(!squares.removePiece.called);
		});

		it('should not dispatch any actions if square is not highlighted.', () => {
			let state = {
				getState: () => [
					{ id: '1', pieceId: 'b', selected: true },
					{ id: '2', highlighted: false }
				]
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(!squares.addPiece.called);
			assert(!squares.removePiece.called);
		});
	});
});
