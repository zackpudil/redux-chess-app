import assert from 'assert';
import sinon from 'sinon';

import {WHITE, BLACK} from '~/modules/pieces';
import * as subject from '~/chess/board';

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
				{ id: 'h1', pieceId: 'r', color: BLACK },
				{ id: 'g1', pieceId: 'k', color: BLACK },
				{ id: 'h2', pieceId: '_', color: BLACK },
				{ id: 'g2', pieceId: 'K', color: WHITE },
				{ id: 'h3', pieceId: 'q', color: BLACK },
				{ id: 'g3', pieceId: 'Q', color: WHITE }
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

  describe('toSquare', () => {
    it('should exist.', () => assert.notEqual(subject.toSquare, undefined));

    it('should map coord to square', () => {
      let coords = [{ x: 1, y: 1 }, { x: 8, y: 8 }, { x: 4, y: 4}, { x: 2, y: 6 }];
      let squares = coords.map(subject.toSquare);

      assert.deepEqual(squares.sort(), ['a1', 'h8', 'd4', 'b6'].sort());
    });
  });

  describe('toCoord', () => {
    it('should exist.', () => assert.notEqual(subject.toCoord, undefined));

    it('should map square to coord', () => {
      let squares = ['a1', 'h8', 'd4', 'b6'];
      let coords = squares.map(subject.toCoord);

      assert.deepEqual(coords, [{x: 1, y: 1}, {x: 8, y: 8}, {x: 4, y:4}, {x:2, y:6}]);
    });
  });
});
