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

	describe('biship', () => {
		it('should exist.', () => assert(subject.b && subject.B));

		it('should move diagnal', () => {
			let test = subject.b('f3');
			let test2 = subject.B('f3');

			assert.deepEqual(test.sort(),
				[ 'e2', 'g2', 'g4', 'e4', 'd1', 'h1', 'h5', 'd5', 'c6', 'b7', 'a8' ].sort());
			assert.deepEqual(test2.sort(),
				[ 'e2', 'g2', 'g4', 'e4', 'd1', 'h1', 'h5', 'd5', 'c6', 'b7', 'a8' ].sort());
		});
	});

	describe('root', () => {
		it('should exist.', () => assert(subject.r && subject.R));

		it('should move latterally.', () => {
			let test = subject.r('f3');
			let test2 = subject.R('f3');

			assert.deepEqual(test.sort(),
				[ 'f2','f4','g3','e3','f1','f5','h3','d3','f6','c3','f7','b3','f8','a3' ].sort())

			assert.deepEqual(test2.sort(),
				[ 'f2','f4','g3','e3','f1','f5','h3','d3','f6','c3','f7','b3','f8','a3' ].sort())
		});
	});

	describe('king', () => {
		it('should exist.', () => assert(subject.k && subject.K));

		it('should move one square in all directions.', () => {
			let test = subject.k('f3');
			let test2 = subject.K('f3');

			assert.deepEqual(test.sort(),
				['f2', 'f4', 'g2', 'g3', 'g4', 'e2', 'e3', 'e4'].sort());
			assert.deepEqual(test2.sort(),
				['f2', 'f4', 'g2', 'g3', 'g4', 'e2', 'e3', 'e4'].sort());

		});
	});

	describe('queen', () => {
		it('should exist.', () => assert(subject.q && subject.Q));

		it('should move like a bishop and rook together.', () => {
			let test = subject.q('f3');
			let test2 = subject.Q('f3');

			assert.deepEqual(test.sort(),
				[ 'a3','a8','b3','b7','c3','c6','d1','d3','d5',
					'e2','e3','e4','f1','f2','f4','f5','f6','f7',
					'f8','g2','g3','g4','h1','h3','h5' ].sort());

			assert.deepEqual(test2.sort(),
				[ 'a3','a8','b3','b7','c3','c6','d1','d3','d5',
					'e2','e3','e4','f1','f2','f4','f5','f6','f7',
					'f8','g2','g3','g4','h1','h3','h5' ].sort());
		});
	});
});
