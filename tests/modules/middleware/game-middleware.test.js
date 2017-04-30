import assert from 'assert';
import sinon from 'sinon';

import { REMOVE_PIECE, ADD_PIECE } from '~/modules/squares';
import { WHITE, BLACK } from '~/modules/pieces';
import * as game from '~/modules/game';
import * as analyze from '~/chess/analysis';

import subject from '~/modules/middleware/game-middleware';

describe('game middleware', () => {
  it('should exist.', () => assert.notEqual(subject, undefined));

  describe('analyze board', () => {
    var store = {}, action;

    beforeEach(() => {
      store.dispatch = sinon.spy();
      action = { 
        type: game.ANALYZE_BOARD, 
        fromSquare: 'a1', 
        toSquare: 'a2', 
        piece: 'k' 
      };
      sinon.stub(analyze, 'wasKingCastle');
    });

    afterEach(() => {
      analyze.wasKingCastle.restore();
    });

    it('should check if move was king castle.', () => {
      analyze.wasKingCastle.returns(false);
      subject(store)(() => {})(action);
      assert(analyze.wasKingCastle.calledWith(action.fromSquare, action.toSquare, action.piece));
    });

    it('should dispatch king castle if check was true.', () => {
      analyze.wasKingCastle.returns(true);
      subject(store)(() => {})(action);
      assert(analyze.wasKingCastle.calledWith(action.fromSquare, action.toSquare, action.piece));
      assert(store.dispatch.calledWith({ type: game.CASTLE_KING_SIDE, isWhite: false}));
    });
  });

  describe('castle king size', () => {
    it('should move king rook for king castle.', () => {
      let actionWhite = { type: game.CASTLE_KING_SIDE, isWhite: true };
      let actionBlack = { type: game.CASTLE_KING_SIDE, isWhite: false };

      let next = sinon.spy();

      subject()(next)(actionWhite);
      assert(next.calledWith({ type: REMOVE_PIECE, squareId: game.WHITE_K_ROOK_SQUARE }));
      assert(next.calledWith({ type: ADD_PIECE, squareId: game.WHITE_R_AFTER_KING_CASTLE, pieceId: 'R', color: WHITE }));
      
      subject()(next)(actionBlack);
      assert(next.calledWith({ type: REMOVE_PIECE, squareId: game.BLACK_K_ROOK_SQUARE }));
      assert(next.calledWith({ type: ADD_PIECE, squareId: game.BLACK_R_AFTER_KING_CASTLE, pieceId: 'r', color: BLACK }));
    });
  });
});
