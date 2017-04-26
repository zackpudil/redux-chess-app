import assert from 'assert';
import subject from './move-engine';

describe('moveEngine', () => {
	it('should exist', () => assert.notEqual(subject, undefined));

	describe('pawn', () => {
		it('should exist.', () => assert(subject.p && subject.P));

		it('should push pawn one square.', () => {
			let testWhite = subject.P('a3');
			let testBlack = subject.p('a6');

			assert.equal(testWhite[0], 'a4');
			assert.equal(testBlack[0], 'a5');
		});

		it('should move by two if on starting square.', () => {
			let testWhite = subject.P('a2');
			let testBlack = subject.p('c7');

			assert.deepEqual(testWhite, ['a3', 'a4']);
			assert.deepEqual(testBlack, ['c6', 'c5']);
		});

		it('should not move passed the board.', () => {
			let testWhite = subject.P('a8');
			let testBlack = subject.p('c1');

			assert.equal(testWhite.length, 0);
			assert.equal(testBlack.length, 0);
		});
	});

	describe('knight', () => {
		it('should exist.', () => assert(subject.n && subject.N));

		it('should move in L shape around board.', () => {
			let test = subject.N('e4');
			let test2 = subject.n('e4');

			assert.deepEqual(test.sort(), ['f2', 'd2', 'c3', 'g3', 'g5', 'c5', 'd6', 'f6'].sort());
			assert.deepEqual(test2.sort(), ['f2', 'd2', 'c3', 'g3', 'g5', 'c5', 'd6', 'f6'].sort());

		});

		it('should not move off board.', () => {
			let test = subject.N('g1');
			let test2 = subject.n('g1');

			assert.deepEqual(test.sort(), ['f3', 'h3', 'e2'].sort());
			assert.deepEqual(test2.sort(), ['f3', 'h3', 'e2'].sort());
		});
	});
});
