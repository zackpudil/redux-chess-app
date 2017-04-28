import assert from 'assert';
import * as subject from './rule-engine';

describe('Rule Engine', () => {
	describe('enforceBoundary', () => {
		it('should exist.', () => assert.notEqual(subject.enforceBoundary, undefined));

		it('should not allow playable squares that do not exist.', () => {
			let squares = [{ x: 1, y: 3 }, { x: 9, y: 3 }, { x: -3, y: 1 },
										 { x: 3, y: 9 }, { x: 1, y: -3 }, { x: 2, y: 2 }];

			let enforcedSquares = subject.enforceBoundary(squares);

			assert.notEqual(squares, enforcedSquares);
			assert.deepEqual(enforcedSquares.sort(),
				[{x: 1, y: 3 }, { x: 2, y: 2 }].sort());
		});
	});

	describe('latteral jumping', () => {
		it('should exist.', () => assert.notEqual(subject.enforceLatteralJump, undefined));

		it('should remove squares passed a piece latterally.', () => {
			let board = [
				['_', '_', '_', '_', '_'],
				['_', 'p', '_', 'r', '_'],
				['_', 'q', '_', 'p', '_'],
				['_', '_', '_', '_', '_']
			];

			let moveSquares = [{ x: 4, y: 1 }, { x: 1, y: 2 }, 
												 { x: 2, y: 2 }, { x: 3, y: 2 }, 
												 { x: 5, y: 2 }, { x: 4, y: 3 },
												 { x: 4, y: 4 }];

			let enforcedSquares = subject.enforceLatteralJump({ x: 4, y: 2 }, 
																									 moveSquares, board);

			assert.notEqual(moveSquares, enforcedSquares);
			assert.deepEqual(enforcedSquares.sort(), [
				{ x: 4, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 },
				{ x: 5, y: 2 }, { x: 4, y: 3 }
			].sort());
		});
	});

	describe('diagnal jumping', () => {
		it('should exist.', () => assert.notEqual(subject.enforceDiagnalJump, undefined));

		it('should remove squares passed a piece diagnally.', () => {
			let board = [
				['_', '_', '_', '_'],
				['_', 'p', '_', '_'],
				['_', '_', 'b', '_'],
				['_', 'p', '_', '_'],
				['_', '_', '_', '_']
			];

			let moveSquares = [{x:1, y:1}, {x:2, y:2}, {x:4, y:4}, {x:4, y:2},
												 {x:1, y:5}, {x:2, y:4}, {x:1, y:2}];

			let enforcedSquares = subject.enforceDiagnalJump({ x:3, y:3 }, moveSquares, board);
    
			assert.notEqual(moveSquares, enforcedSquares);
			assert.deepEqual(enforcedSquares.sort(), [ 
        { x: 2, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 4 }, { x: 2, y: 4 } 
      ]);
		});

		it('should not remove squares that are latterly below biship.', () => {
			let board = [
				['_', '_', '_', '_', '_'],
				['_', '_', '_', 'p', '_'],
				['_', 'p', 'b', '_', '_'],
				['_', '_', 'p', '_', '_'],
				['_', '_', '_', '_', '_']
			];

			let moveSquares = [
        {x: 1, y: 5}, { x: 2, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 1},
        {x: 1, y: 1}, { x: 2, y: 2 }, { x: 4, y: 4 }, { x: 5, y: 5 }
      ];

			let enforcedSquares = subject.enforceDiagnalJump({ x:3, y:3}, moveSquares, board);
      

			assert.notEqual(moveSquares, enforcedSquares);
			assert.deepEqual(enforcedSquares.sort(), [ 
        { x: 4, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 2 },
        { x: 1, y: 5 }, { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 5 }
      ]);
		});
	});

	describe('taken square', () => {
		it('should exist.', () => assert.notEqual(subject.enforceTakenSquare, undefined));

		it('should remove squares that are taken by other pieces.', () => {
			let board = [
				['_', '_', 'P', '_'],
				['n', '_', '_', '_'],
				['_', '_', 'p', '_'],
				['_', 'p', '_', '_']
			];

			let moveSquares = [{x: 3, y: 1}, {x: 3, y: 3}, { x: 2, y: 4 }];

			let enforcedSquares = subject.enforceTakenSquare({x: 1, y: 2}, moveSquares, false, board);
		});
	});
});
