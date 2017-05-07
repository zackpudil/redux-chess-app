import assert from 'assert';
import sinon from 'sinon';

import { REMOVE_PIECE, ADD_PIECE } from '~/modules/squares';
import { WHITE, BLACK } from '~/modules/pieces';
import * as game from '~/modules/game';
import * as analyze from '~/chess/analysis';
import * as board from '~/chess/board';
import * as squares from '~/modules/squares';

import subject from '~/modules/middleware/analysis-middleware';

describe('Analysis middleware', () => {
  it('should exist.', () => assert.notEqual(subject, undefined));

  it('should just dispatch unsupported action.', () => {
		let next = sinon.spy();
		subject()(next)({ type: 'test' });

		assert(next.calledWith({ type: 'test' }));
	});


  describe('analyze board', () => {
    var store, action;

    beforeEach(() => {
      store = {
        dispatch: sinon.spy(),
        getState: () => ({
          squares: ['a', 'b']
        })
      };
      action = { 
        type: game.ANALYZE_BOARD, 
        fromSquare: 'a1', 
        toSquare: 'a2', 
        piece: 'k' 
      };
      sinon.stub(analyze, 'wasKingCastle');
      sinon.stub(analyze, 'wasQueenCastle');
      sinon.stub(analyze, 'isKingInCheck');
      sinon.stub(analyze, 'getSquaresOfPiece');
      sinon.stub(board, 'fromState');
    });

    afterEach(() => {
      analyze.wasKingCastle.restore();
      analyze.wasQueenCastle.restore();
      analyze.isKingInCheck.restore();
      analyze.getSquaresOfPiece.restore();
      board.fromState.restore();
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

    it('should check if king is in check.', () => {
      analyze.isKingInCheck.returns(false);
      board.fromState.returns(['test']);
      subject(store)(() => {})(action);

      assert(board.fromState.calledWith(['a', 'b']));
      assert(analyze.isKingInCheck.calledWith(['test'], true));
    });

    it('should dispatch check square action if king is in check.', () => {
      analyze.isKingInCheck.returns(true);
      board.fromState.returns(['test']);
      analyze.getSquaresOfPiece.returns(['a1']);
      let next = sinon.spy();

      subject(store)(next)(action);

      assert(next.calledWith({ type: squares.CHECK_SQUARE, squareId: 'a1' }));
      assert(next.calledWith({ type: squares.CHECK_SQUARE, squareId: action.toSquare }));
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
