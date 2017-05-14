import assert from 'assert';
import { ADD_TAKEN_PIECE } from '~/modules/actions/pieces';
import subject from '~/modules/reducers/pieces';

describe('Pieces', () => {
  it('should not modify state on unsupported action', () => {
		let state = [{ test: 1 }, { test: 2 }];
		let test = subject(state, { type: 'unsupported' });

		assert.equal(test, state);
	});

  describe('Add taken piece', () => {
    it('should add piece to state', () => {
      let action = { 
        type: ADD_TAKEN_PIECE, 
        pieceId: 'a',
        color: 'test'
      };

      let state = subject([], action);

      assert.deepEqual(state, [{ pieceId: 'a', color: 'test' }]);
    });
  });
});
