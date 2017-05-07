import assert from 'assert';
import { WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE, WHITE_K_AFTER_QUEEN_CASTLE,
         BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE, BLACK_K_AFTER_QUEEN_CASTLE } from '~/modules/game';

import { initBoard, fromState, toState } from '~/chess/board';
import * as subject from '~/chess/analysis';

describe('Analysis', () => {
  describe('wasKingCastle', () => {
    it('should exist.', () => assert.notEqual(subject.wasKingCastle, undefined));

    it('should return false if move was not king side castle.', () => {
      assert(!subject.wasKingCastle(WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE, 'Q'));
      assert(!subject.wasKingCastle(BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE, 'q'));
      assert(!subject.wasKingCastle('c7', WHITE_K_AFTER_KING_CASTLE, 'K'));
      assert(!subject.wasKingCastle('c3', BLACK_K_AFTER_KING_CASTLE, 'k'));
      assert(!subject.wasKingCastle(WHITE_KING_SQUARE, 'd1', 'K'));
      assert(!subject.wasKingCastle(BLACK_KING_SQUARE, 'd8', 'k'));
    });

    it('should return true if move was king side castle.', () => {
      assert(subject.wasKingCastle(WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE, 'K'));
      assert(subject.wasKingCastle(BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE, 'k'));
    });
  });

   describe('wasQueenCastle', () => {
    it('should exist.', () => assert.notEqual(subject.wasKingCastle, undefined));

    it('should return false if move was not king side castle.', () => {
      assert(!subject.wasQueenCastle(WHITE_KING_SQUARE, WHITE_K_AFTER_QUEEN_CASTLE, 'Q'));
      assert(!subject.wasQueenCastle(BLACK_KING_SQUARE, BLACK_K_AFTER_QUEEN_CASTLE, 'q'));
      assert(!subject.wasQueenCastle('c7', WHITE_K_AFTER_QUEEN_CASTLE, 'K'));
      assert(!subject.wasQueenCastle('c3', BLACK_K_AFTER_QUEEN_CASTLE, 'k'));
      assert(!subject.wasQueenCastle(WHITE_KING_SQUARE, 'd1', 'K'));
      assert(!subject.wasQueenCastle(BLACK_KING_SQUARE, 'd8', 'k'));
    });

    it('should return true if move was king side castle.', () => {
      assert(subject.wasQueenCastle(WHITE_KING_SQUARE, WHITE_K_AFTER_QUEEN_CASTLE, 'K'));
      assert(subject.wasQueenCastle(BLACK_KING_SQUARE, BLACK_K_AFTER_QUEEN_CASTLE, 'k'));
    });
  });

  describe('doesMovePutKingInCheck', () => {
    var board;

    beforeEach(() => {
      board = [
        ['_', 'N', 'K', '_', '_'],
        ['R', '_', '_', '_', 'k'],
        ['_', 'n', 'r', 'q', '_']
      ];

    });
    it('should return true if moveSquares include king', () => {
      let moveSquaresWhite = [{ x: 5, y: 2 }, { x: 4, y: 2 }, { x: 3, y: 2 }];
      let moveSquaresBlack = [{ x: 3, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }];

      assert(subject.doesMovePutKingInCheck(moveSquaresWhite, 'k', board));
      assert(subject.doesMovePutKingInCheck(moveSquaresBlack, 'K', board));
    });

    it('should return false if moveSquares does not include king.', () => {
      let moveSquaresWhite = [{ x:4, y: 1 }, { x: 3, y: 1 }];
      let moveSquaresBlack = [{ x: 2, y: 2 }, { x: 2, y: 3 }];

      assert(!subject.doesMovePutKingInCheck(moveSquaresWhite, 'k', board));
      assert(!subject.doesMovePutKingInCheck(moveSquaresBlack, 'K', board));
    });
  });

  describe('isKingInCheck', () => {
    var board;

    beforeEach(() =>  {
      board = [
        ['R', '_', '_', 'K', 'Q', 'B', '_', 'R'],
        ['P', 'P', 'P', '_', 'P', 'P', 'P', 'P'],
        ['_', '_', 'N', '_', '_', 'N', '_', '_'],
        ['_', '_', '_', 'P', 'n', '_', '_', '_'],
        ['_', '_', '_', 'p', 'p', '_', 'B', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_'],
        ['p', 'p', 'p', '_', '_', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'k', 'q', 'b', '_', 'r']
      ];
    });

    it('should return true if king is in check.', () => {
      assert(subject.isKingInCheck(board, false));
    });

    it('should return false if king is not in check.', () => {
      assert(!subject.isKingInCheck(board, true));
    });
  });

  describe('getSquaresOfPiece', () => {
    var board;

    beforeEach(() => {
      board = fromState(toState(initBoard()));
    });

    it('should return all squares that contain piece', () => {
      let blackKnightSquareIds = subject.getSquaresOfPiece('n', board);
      let whiteKingSquareId = subject.getSquaresOfPiece('K', board);
      assert.deepEqual(blackKnightSquareIds, ['b8', 'g8']);
      assert.deepEqual(whiteKingSquareId, ['e1']);
    });
  });

  describe('toMoveNotation', () => {
    it('should exist.', () => assert.notEqual(subject.toMoveNotation, undefined));

    it('should return proper chess notation.', () => {
      let pieceId = 't';
      let toSquareId = 't4';
      let fromSquareId = 'a3';

      let move = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);

      assert.deepEqual(move, 'tt4');
    });

    it('should return proper chess notaction for piece take.', () => {
      let pieceId = 't';
      let toSquareId = 't4';
      let fromSquareId = 'a3';

      let move = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, true);

      assert.deepEqual(move, 'txt4');
    });

    it('should return proper chess notation for pawn.', () => {
      let pieceId = 'p';
      let toSquareId = 't1';
      let fromSquareId = 'a3';

      let moveBlack = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);
      assert.deepEqual(moveBlack, 't1');

      pieceId = 'P';
      toSquareId = 't7';
      fromSquareId = 'a4';

      let moveWhite = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);
      assert.deepEqual(moveWhite, 't7');
    });
  });

  it('should return proper chesss notation for pawn take.', () => {
    let pieceId = 'p';
    let toSquareId = 'd4';
    let fromSquareId = 'e3';

    let move = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, true);
    assert.deepEqual(move, 'exd');
  });

  it('should return proper chess notation for king side castle.', () => {
    let pieceId = 'k';
    let toSquareId = BLACK_K_AFTER_KING_CASTLE;
    let fromSquareId = BLACK_KING_SQUARE;

    let moveBlack = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);

    assert.deepEqual(moveBlack, '0-0');

    pieceId = 'K';
    toSquareId = WHITE_K_AFTER_KING_CASTLE;
    fromSquareId = WHITE_KING_SQUARE;

    let moveWhite = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);

    assert.deepEqual(moveWhite, '0-0');

  });

   it('should return proper chess notation for queen side castle.', () => {
    let pieceId = 'k';
    let toSquareId = BLACK_K_AFTER_QUEEN_CASTLE;
    let fromSquareId = BLACK_KING_SQUARE;

    let moveBlack = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);

    assert.deepEqual(moveBlack, '0-0-0');

    pieceId = 'K';
    toSquareId = WHITE_K_AFTER_QUEEN_CASTLE;
    fromSquareId = WHITE_KING_SQUARE;

    let moveWhite = subject.toMoveNotation(pieceId, toSquareId, fromSquareId, false);

    assert.deepEqual(moveWhite, '0-0-0');
  });

});
