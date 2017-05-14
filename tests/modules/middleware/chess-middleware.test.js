import sinon from 'sinon';
import assert from 'assert';

import * as squares from '~/modules/squares/actions';
import * as pieces from '~/modules/pieces/actions';
import * as game from '~/modules/game/actions';
import * as chess from '~/chess/engine';

import subject from '~/modules/middleware/chess-middleware';

describe('Chess middleware', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});

	describe('Route action', () => {
		beforeEach(() => {
			sinon.stub(chess, 'default').returns((p) => () => ['a1', 'b1', 'c4']); 
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
			let action = { type: pieces.ROUTE_PIECE, pieceId: 'p', squareId: 't1' };

			let next = sinon.spy();
			
			subject({ getState: () => ({ squares: [] }) })(next)(action);

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
			action = { type: pieces.MOVE_PIECE, toSquareId: '2' };
			next = sinon.spy();

			sinon.spy(squares, 'clearHighlights');
			sinon.spy(squares, 'addPiece');
			sinon.spy(squares, 'removePiece');
      sinon.spy(game, 'analyzeBoard');
		});

		afterEach(() => {
			squares.clearHighlights.restore();
			squares.addPiece.restore();
			squares.removePiece.restore();
      game.analyzeBoard.restore();
		});

		it('should dispatch add/remove piece actions with currently selected square.', () => {
			let state = { 
        getState: () => ({ 
          squares: [
            { id: '1', pieceId: 'b', selected: true }, 
            { id: '2', highlighted: true }
          ] 
        })
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(squares.addPiece.calledWith('2', 'b'));
			assert(squares.removePiece.calledWith('1'));
      assert(game.analyzeBoard.calledWith('1', '2', 'b'));
		});

		it('should not dispatch any actions if no piece is selected.', () => {
			let state = { 
				getState: () => ({
          squares: [
            { id: '1', pieceId: 'b', selected: false }, 
            { id: '2', highlighted: true }
          ]
        })
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(!squares.addPiece.called);
			assert(!squares.removePiece.called);
      assert(!game.analyzeBoard.called);
		});

		it('should not dispatch any actions if square is not highlighted.', () => {
			let state = {
				getState: () => ({
          squares: [
            { id: '1', pieceId: 'b', selected: true },
            { id: '2', highlighted: false }
          ]
        })
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
			assert(!squares.addPiece.called);
			assert(!squares.removePiece.called);
      assert(!game.analyzeBoard.called);
		});
	});

  describe('Take peice', () => {
		var action, next;

		beforeEach(() => {
			action = { type: pieces.TAKE_PIECE, toSquareId: '2' };
			next = sinon.spy();

			sinon.spy(squares, 'clearHighlights');
			sinon.spy(squares, 'addPiece');
			sinon.spy(squares, 'removePiece');
      sinon.spy(pieces, 'addTakenPiece');
      sinon.spy(game, 'analyzeBoard');
		});

		afterEach(() => {
			squares.clearHighlights.restore();
			squares.addPiece.restore();
			squares.removePiece.restore();
      pieces.addTakenPiece.restore();
      game.analyzeBoard.restore();
		});

		it('should dispatch add/remove piece actions with currently selected square.', () => {
			let state = { 
        getState: () => ({ 
          squares: [
            { id: '1', pieceId: 'b', selected: true }, 
            { id: '2', pieceId: 'a', highlighted: true, color: 'test' }
          ] 
        })
			};

			subject(state)(next)(action);

			assert(squares.clearHighlights.called);
      assert(squares.removePiece.calledWith('2'));
			assert(squares.addPiece.calledWith('2', 'b'));
			assert(squares.removePiece.calledWith('1'));
      assert(pieces.addTakenPiece.calledWith('a', 'test'));
      assert(game.analyzeBoard.calledWith('1', '2', 'b'));
		});
  });
});
