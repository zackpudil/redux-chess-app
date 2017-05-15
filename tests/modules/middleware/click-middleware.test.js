import assert from 'assert';
import sinon from 'sinon';

import { BLACK, WHITE } from '~/chess/board';
import {SQUARE_CLICK} from '~/modules/squares/actions';
import * as pieces from '~/modules/pieces/actions';

import subject from '~/modules/middleware/click-middleware';

describe('Squares Middleware', () => {
  it('should exist.', () => assert.notEqual(subject, undefined));

  it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});

  describe('square click', () => {
    var store, next, action;
    var state;

    beforeEach(() => {
      state = {
        game: { whiteTurn: false },
        squares: [{ id: 'a1', selected: false }]
      };
      store = {
        getState: () => state
      };

      next = sinon.spy();
      action = { 
        type: SQUARE_CLICK, 
        squareId: 'a1', 
        pieceId: 'p', 
        color: WHITE
      };

      sinon.stub(pieces, 'routePiece');
      sinon.stub(pieces, 'movePiece');
      sinon.stub(pieces, 'takePiece');
    });

    afterEach(() => {
      pieces.routePiece.restore();
      pieces.movePiece.restore();
      pieces.takePiece.restore();
    });

    it('should not dispatch route action if not colors turn', () => {
      subject(store)(next)(action);
      assert(!next.called);
    });

    it('should dispatch route action if colors turn', () => {
      action.color = BLACK;
      subject(store)(next)(action);
      assert(pieces.routePiece.calledWith(action.squareId));
      assert(next.called);
    });

    it('should dispatch move piece if a square is selected.', () => {
      action.color = BLACK;
      action.pieceId = '_';
      state.squares.push({ id: 'h1', pieceId: 'p', selected: true });

      subject(store)(next)(action);
      assert(pieces.movePiece.calledWith(action.squareId));
      assert(next.called);
    });

    it('should dispatch take piece if a square is selected and square with piece clicked.', () => {
      action.color = BLACK;
      action.pieceId = 'p';
      state.squares.push({ id: 'h1', pieceId: 'p', selected: true, color: WHITE });

      subject(store)(next)(action);
      assert(pieces.takePiece.calledWith(action.squareId));
      assert(next.called);
    });

    it('should call route piece if selected piece and clicked square are the same color.', () => {
      action.color = BLACK;
      action.pieceId = 'p';
      state.squares.push({ id: 'h1', pieceId: 'p', selected: true, color: BLACK });

      subject(store)(next)(action);
      assert(pieces.routePiece.calledWith(action.squareId, action.pieceId));
      assert(next.called);
    });
  });
});
