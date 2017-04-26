import assert from 'assert';
import sinon from 'sinon';

import {WHITE, BLACK} from '../modules/pieces';
import * as subject from './board';

describe('board', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	describe('toState', () => {
		it('should exist.', () => assert.notEqual(subject.toState, undefined));

		it('should map to correct state.', () => {
			let testBoard = [
				['r', 'k'],
				['_', 'K'],
				['q', 'Q']
			];
			let board = subject.toState(testBoard);

			assert.deepEqual(board.sort(), [
				{
					id: 'a1',
					pieceId: 'r',
					color: BLACK
				},
				{
					id: 'b1',
					pieceId: 'k',
					color: BLACK
				},
				{
					id: 'a2',
					pieceId: '_',
					color: BLACK
				},
				{
					id: 'b2',
					pieceId: 'K',
					color: WHITE
				},
				{
					id: 'a3',
					pieceId: 'q',
					color: BLACK
				},
				{
					id: 'b3',
					pieceId: 'Q',
					color: WHITE
				}
			].sort());
		});
	});
});
