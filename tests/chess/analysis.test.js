import assert from 'assert';
import { WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE,
         BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE } from '~/modules/game';

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
});
