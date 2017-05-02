import assert from 'assert';
import sinon from 'sinon';

import { ADD_MOVE } from '~/reducers/game';

import * as analyze from '~/chess/analysis';
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
      sinon.stub(analyze, 'toMoveNotation').returns('e1');
    });

    afterEach(() => {
      analyze.toMoveNotation.restore();
    });

    it('should add move and flip turn.', () => {
      let state = { moves: [], whiteTurn: false };
      let action = {
        type: ADD_MOVE,
        isTake: false,
        pieceId: 't',
        toSquareId: 't4'
      };

      let testState = subject(state, action);

      assert(analyze.toMoveNotation.calledWith('t', 't4', false));
      assert.deepEqual(testState, {
        whiteTurn: true,
        moves: ['e1']
      });
    });
  });
});
