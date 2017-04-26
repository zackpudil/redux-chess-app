import assert from 'assert';
import sinon from 'sinon';
import * as board from '../chess/board';
import subject, { HIGHLIGHT_SQUARE, CLEAR_HIGHLIGHTS, INIT_SQUARES, SELECT_SQUARE } from './squares';

describe('squares', () => {
	it('should exist.', () => assert.notEqual(subject, undefined));

	it('should not modify state on unsupported action', () => {
		let state = [{ test: 1 }, { test: 2 }];
		let test = subject(state, { type: 'unsupported' });

		assert.equal(test, state);
	});

	it('should modify state on supported action', () => {
		let state = [{ id: '1'}, {id: '2'}];
		let test = subject(state, { type: CLEAR_HIGHLIGHTS });

		assert.notEqual(test, state);
	});

	describe('clear highlights', () => {
		it('should set highlighted property to false.', () => {
			let state = [
				{ id: '1', highlighted: true},
				{ id: '2', highlighted: false},
				{ id: '3', highlighted: true}
			];

			let test = subject(state, { type: CLEAR_HIGHLIGHTS });

			assert.deepEqual(test.sort(),
				[
					{ id: '1', highlighted: false, selected: false},
					{ id: '2', highlighted: false, selected: false},
					{ id: '3', highlighted: false, selected: false}
				].sort());
		});
	});

	describe('highlight square', () => {
		it('should highlight selected square.', () => {
			let state = [
				{ id: '1', highlighted: false },
				{ id: '2', highlighted: false },
				{ id: '3', highlighted: false }
			];

			let test = subject(state, { type: HIGHLIGHT_SQUARE, squareId: '2' });

			assert.deepEqual(test.sort(),
				[
					{ id: '1', highlighted: false },
					{ id: '2', highlighted: true },
					{ id: '3', highlighted: false }
				].sort());
		});
	});

	describe('initialize squares', () => {
		it('should initialize board and map to state.', () => {
			let state = [];
			sinon.stub(board, 'initBoard').returns({ state: 'new' });
			sinon.stub(board, 'toState').callsFake(() => {});

			subject(state, { type: INIT_SQUARES });

			assert(board.initBoard.called);
			assert(board.toState.calledWith({ state: 'new' }));
		});
	});

	describe('select square', () => {
		it('should set select property to true.', () => {
			let state = [
				{ id: '1', selected: false},
				{ id: '2', selected: false},
				{ id: '3', selected: false}
			];

			let test = subject(state, { type: SELECT_SQUARE, squareId: '2'});

			assert.deepEqual(test.sort(),
				[
					{ id: '1', selected: false},
					{ id: '2', selected: true},
					{ id: '3', selected: false}
				].sort());

		});
	});
});
