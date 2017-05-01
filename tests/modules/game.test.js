import assert from 'assert';

import { ADD_MOVE } from '~/reducers/game';
import subject from '~/reducers/game';

describe('Game', () => {
  it('should exist.', () => assert.notEqual(subject, undefined));

  it('should not modify state on unsupported action', () => {
		let state = [{ test: 1 }, { test: 2 }];
		let test = subject(state, { type: 'unsupported' });

		assert.equal(test, state);
	});

  describe('add move', () => {
    var action, state;
    beforeEach(() => {
      state = {
        moves: [],
        whiteTurn: false
      };
      action = {
        type: ADD_MOVE,
        isTake: false
      };
    });

    it('should add proper chess notation.', () => {
      action.pieceId = 't';
      action.toSquareId = 't4';

      let testState = subject(state, action);

      assert.deepEqual(testState, {
        whiteTurn: false,
        moves: ['tt4']
      });
    });

    it('should add proper chess notaction for piece take.', () => {
      action.pieceId = 't';
      action.toSquareId = 't4';
      action.isTake = true;

      let testState = subject(state, action);

      assert.deepEqual(testState, {
        whiteTurn: false,
        moves: ['txt4']
      });
    });

    it('should add proper chess notation for pawn.', () => {
      action.pieceId = 'p';
      action.toSquareId = 't1';

      let testBlack = subject(state, action);
      assert.deepEqual(testBlack, {
        whiteTurn: false,
        moves: ['t1']
      });

      action.pieceId = 'P';
      action.toSquareId = 't7';

      let testWhite = subject(testBlack, action);
      assert.deepEqual(testWhite, {
        whiteTurn: false,
        moves: ['t1', 't7']
      });
    });
  });
});
