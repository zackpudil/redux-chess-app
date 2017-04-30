export const WHITE_KING_SQUARE = 'e1';
export const BLACK_KING_SQUARE = 'e8';

export const WHITE_K_ROOK_SQUARE = 'g1';
export const BLACK_K_ROOK_SQUARE = 'g8';

export const WHITE_AFTER_CASTLE

export const WHITE_Q_ROOK_SQUARE = 'c1';
export const BLACK_Q_ROOK_SQUARE = 'c8';

export const CASTLE_KING_SIDE = 'chess/game/castle_king';
export const CASLTE_QUEEN_SIDE = 'chess/game/castle_queen';

export const castleKingSide = (isWhite) => ({
  type: CATLE_KING_SIDE,
  isWhite
});

export const castleQueenSide = (isWhite) => ({
  type: CASTLE_QUEEN_SIDE,
  isWhite
});
