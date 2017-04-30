import {WHITE_K_ROOK_SQUARE, 
        WHITE_R_AFTER_KING_CASTLE,
        BLACK_K_ROOK_SQUARE,
        BLACK_R_AFTER_KING_CASTLE,
        WHITE_Q_ROOK_SQUARE, 
        BLACK_Q_ROOK_SQUARE } from '../game';

import { ANALYZE_BOARD, CASTLE_KING_SIDE, CASLTE_QUEEN_SIDE } from '../game';
import { castleKingSide } from '../game';
import { addPiece, removePiece } from '../squares';
import { wasKingCastle } from '~/chess/analysis';

export default store => next => action => {
  switch(action.type) {
    case ANALYZE_BOARD:
      if(wasKingCastle(action.fromSquare, action.toSquare, action.piece)) {
        store.dispatch(castleKingSide(action.piece.toUpperCase() === action.piece));
      }
      break;
    case CASTLE_KING_SIDE:
      if(action.isWhite) {
        next(removePiece(WHITE_K_ROOK_SQUARE));
        next(addPiece(WHITE_R_AFTER_KING_CASTLE, 'R'));
      } else {
        next(removePiece(BLACK_K_ROOK_SQUARE));
        next(addPiece(BLACK_R_AFTER_KING_CASTLE, 'r'));
      }
      break;
    default:
      next(action);
  }
};
