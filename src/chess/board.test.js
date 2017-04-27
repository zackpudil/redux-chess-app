import assert from 'assert';
import sinon from 'sinon';

import {WHITE, BLACK} from '../modules/pieces';
import * as subject from './board';

describe('board', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	describe('toState', () => {
		it('should exist.', () => assert.notEqual(subject.toState, undefined));

		it('should map logical board to correct ui state.', () => {
			let board = [
				['r', 'k'],
				['_', 'K'],
				['q', 'Q']
			];
			let state = subject.toState(board);

			assert.deepEqual(state.sort(), [
				{ id: 'a1', pieceId: 'r', color: BLACK },
				{ id: 'b1', pieceId: 'k', color: BLACK },
				{ id: 'a2', pieceId: '_', color: BLACK },
				{ id: 'b2', pieceId: 'K', color: WHITE },
				{ id: 'a3', pieceId: 'q', color: BLACK },
				{ id: 'b3', pieceId: 'Q', color: WHITE }
			].sort());
		});
	});

	describe('fromState', () => {
		it('should exist.', () => assert.notEqual(subject.fromState, undefined));

		it('should ui state to logical board', () => {
			let uiState = [
				{ id: 'a1', pieceId: 'r', color: BLACK },
				{ id: 'b1', pieceId: 'k', color: BLACK },
				{ id: 'a2', pieceId: '_', color: BLACK },
				{ id: 'b2', pieceId: 'K', color: WHITE },
				{ id: 'a3', pieceId: 'q', color: BLACK },
				{ id: 'b3', pieceId: 'Q', color: WHITE }
			];

			let board = subject.fromState(uiState);
			assert.deepEqual(board.sort(), [
				['r', 'k'],
				['_', 'K'],
				['q', 'Q']
			].sort());
		});
	});
});
