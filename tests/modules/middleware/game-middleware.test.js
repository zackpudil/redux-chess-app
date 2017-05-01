import assert from 'assert';
import sinon from 'sinon';

import { REMOVE_PIECE, ADD_PIECE } from '~/reducers/squares';
import { WHITE, BLACK } from '~/reducers/pieces';
import * as game from '~/reducers/game';
import * as analyze from '~/chess/analysis';

import subject from '~/reducers/middleware/game-middleware';

describe('Game middleware', () => {
  it('should exist.', () => assert.notEqual(subject, undefined));

  it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});


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
      sinon.stub(analyze, 'wasQueenCastle');
    });

    afterEach(() => {
      analyze.wasKingCastle.restore();
      analyze.wasQueenCastle.restore();
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

    it('should check if move was queen castle.', () => {
      analyze.wasQueenCastle.returns(false);
      subject(store)(() => {})(action);
      assert(analyze.wasQueenCastle.calledWith(action.fromSquare, action.toSquare, action.piece));
    });

    it('should dispatch queen castle if check was true.', () => {
      analyze.wasQueenCastle.returns(true);
      subject(store)(() => {})(action);
      assert(analyze.wasQueenCastle.calledWith(action.fromSquare, action.toSquare, action.piece));
      assert(store.dispatch.calledWith({ type: game.CASTLE_QUEEN_SIDE, isWhite: false}));
    });

  });

  describe('castle king side', () => {
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

  describe('castle queen side', () => {
    it('should move queen rook for queen castle.', () => {
      let actionWhite = { type: game.CASTLE_QUEEN_SIDE, isWhite: true };
      let actionBlack = { type: game.CASTLE_QUEEN_SIDE, isWhite: false };

      let next = sinon.spy();

      subject()(next)(actionWhite);
      assert(next.calledWith({ type: REMOVE_PIECE, squareId: game.WHITE_Q_ROOK_SQUARE }));
      assert(next.calledWith({ type: ADD_PIECE, squareId: game.WHITE_R_AFTER_QUEEN_CASTLE, pieceId: 'R', color: WHITE }));
      
      subject()(next)(actionBlack);
      assert(next.calledWith({ type: REMOVE_PIECE, squareId: game.BLACK_Q_ROOK_SQUARE }));
      assert(next.calledWith({ type: ADD_PIECE, squareId: game.BLACK_R_AFTER_QUEEN_CASTLE, pieceId: 'r', color: BLACK }));
    });
  });

});
