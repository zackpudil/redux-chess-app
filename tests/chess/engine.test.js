import assert from 'assert';
import sinon from 'sinon';
import subject from '~/chess/engine';

import * as rules from '~/chess/rules';

describe('Engine', () => {
	beforeEach(() => {
		sinon.stub(rules, 'enforceLatteralJump');
		sinon.stub(rules, 'enforceTakenSquare');
		sinon.stub(rules, 'enforceDiagnalJump');

		rules.enforceLatteralJump.callsFake((a, b) => b);
		rules.enforceTakenSquare.callsFake((a, b) => b);
		rules.enforceDiagnalJump.callsFake((a, b) => b);
	});

	afterEach(() => {
		rules.enforceLatteralJump.restore();
		rules.enforceTakenSquare.restore();
		rules.enforceDiagnalJump.restore();
	});

	it('should exist', () => assert.notEqual(subject, undefined));

	describe('pawn', () => {
		var p, P;
		beforeEach(() => {
			p = subject([]).p;
			P = subject([]).P;
		});

		it('should exist.', () => assert(p && P));

		it('should push pawn one square.', () => {
			let testWhite = P('a3');
			let testBlack = p('a6');

			assert.equal(testWhite[0], 'a4');
			assert.equal(testBlack[0], 'a5');
		});

		it('should move by two if on starting square.', () => {
			let testWhite = P('a2');
			let testBlack = p('c7');

			assert.deepEqual(testWhite, ['a3', 'a4']);
			assert.deepEqual(testBlack, ['c6', 'c5']);
		});

		it('should not move passed the board.', () => {
			let testWhite = P('a8');
			let testBlack = p('c1');

			assert.equal(testWhite.length, 0);
			assert.equal(testBlack.length, 0);
		});
	});

	describe('knight', () => {
		var n, N;
		beforeEach(() => {
			n = subject([]).n;
			N = subject([]).N;
		});

		it('should exist.', () => assert(n && N));

		it('should move in L shape around board.', () => {
			let test = N('e4');
			let test2 = n('e4');

			assert.deepEqual(test.sort(), ['f2', 'd2', 'c3', 'g3', 'g5', 'c5', 'd6', 'f6'].sort());
			assert.deepEqual(test2.sort(), ['f2', 'd2', 'c3', 'g3', 'g5', 'c5', 'd6', 'f6'].sort());

		});

		it('should not move off board.', () => {
			let test = N('g1');
			let test2 = n('g1');

			assert.deepEqual(test.sort(), ['f3', 'h3', 'e2'].sort());
			assert.deepEqual(test2.sort(), ['f3', 'h3', 'e2'].sort());
		});
	});

	describe('biship', () => {
		var b, B;

		beforeEach(() => {
			b = subject([]).b;
			B = subject([]).B;
		});

		it('should exist.', () => assert(b && B));

		it('should move diagnal', () => {
			let test = b('f3');
			let test2 = B('f3');

			assert.deepEqual(test.sort(),
				[ 'e2', 'g2', 'g4', 'e4', 'd1', 'h1', 'h5', 'd5', 'c6', 'b7', 'a8' ].sort());
			assert.deepEqual(test2.sort(),
				[ 'e2', 'g2', 'g4', 'e4', 'd1', 'h1', 'h5', 'd5', 'c6', 'b7', 'a8' ].sort());
		});
	});

	describe('root', () => {
		var r, R;

		beforeEach(() => {
			r = subject([]).r;
			R = subject([]).R;
		});

		it('should exist.', () => assert(r && R));

		it('should move latterally.', () => {
			let test = r('f3');
			let test2 = R('f3');

			assert.deepEqual(test.sort(),
				[ 'f2','f4','g3','e3','f1','f5','h3','d3','f6','c3','f7','b3','f8','a3' ].sort())

			assert.deepEqual(test2.sort(),
				[ 'f2','f4','g3','e3','f1','f5','h3','d3','f6','c3','f7','b3','f8','a3' ].sort())
		});
	});

	describe('king', () => {
		var k, K;

		beforeEach(() => {
			k = subject([]).k;
			K = subject([]).K;
		});

		it('should exist.', () => assert(k && K));

		it('should move one square in all directions.', () => {
			let test = k('f3');
			let test2 = K('f3');

			assert.deepEqual(test.sort(),
				['f2', 'f4', 'g2', 'g3', 'g4', 'e2', 'e3', 'e4'].sort());
			assert.deepEqual(test2.sort(),
				['f2', 'f4', 'g2', 'g3', 'g4', 'e2', 'e3', 'e4'].sort());

		});
	});

	describe('queen', () => {
		var q, Q;

		beforeEach(() => {
			q = subject([]).q;
			Q = subject([]).Q;
		});

		it('should exist.', () => assert(q && Q));

		it('should move like a bishop and rook together.', () => {
			let test = q('f3');
			let test2 = Q('f3');

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
