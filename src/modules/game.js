export const WHITE_KING_SQUARE = 'e1';
export const BLACK_KING_SQUARE = 'e8';

export const WHITE_K_ROOK_SQUARE = 'h1';
export const BLACK_K_ROOK_SQUARE = 'h8';

export const WHITE_Q_ROOK_SQUARE = 'c1';
export const BLACK_Q_ROOK_SQUARE = 'c8';

export const WHITE_K_AFTER_KING_CASTLE = 'g1';
export const BLACK_K_AFTER_KING_CASTLE = 'g8';

export const WHITE_R_AFTER_KING_CASTLE = 'f1';
export const BLACK_R_AFTER_KING_CASTLE = 'f8';

export const CASTLE_KING_SIDE = 'chess/game/castle_king';
export const CASLTE_QUEEN_SIDE = 'chess/game/castle_queen';

export const ANALYZE_BOARD = 'chess/game/analyze';

export const analyzeBoard = (fromSquare, toSquare, piece) => ({
  type: ANALYZE_BOARD,
  fromSquare,
  toSquare,
  piece
});

export const castleKingSide = (isWhite) => ({
  type: CASTLE_KING_SIDE,
  isWhite
});

export const castleQueenSide = (isWhite) => ({
  type: CASTLE_QUEEN_SIDE,
  isWhite
});
