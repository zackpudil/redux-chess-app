import {WHITE_K_ROOK_SQUARE, 
        WHITE_R_AFTER_KING_CASTLE,
        BLACK_K_ROOK_SQUARE,
        BLACK_R_AFTER_KING_CASTLE,
        WHITE_Q_ROOK_SQUARE, 
        WHITE_R_AFTER_QUEEN_CASTLE,
        BLACK_Q_ROOK_SQUARE,
        BLACK_R_AFTER_QUEEN_CASTLE } from '../game';

import { ANALYZE_BOARD, CASTLE_KING_SIDE, CASTLE_QUEEN_SIDE } from '../game';
import { castleKingSide, castleQueenSide } from '../game';
import { addPiece, removePiece } from '../squares';
import { wasKingCastle, wasQueenCastle } from '~/chess/analysis';

export default store => next => action => {
  switch(action.type) {
    case ANALYZE_BOARD:
      if(wasKingCastle(action.fromSquare, action.toSquare, action.piece)) {
        store.dispatch(castleKingSide(action.piece.toUpperCase() === action.piece));
      }

      if(wasQueenCastle(action.fromSquare, action.toSquare, action.piece)) {
        store.dispatch(castleQueenSide(action.piece.toUpperCase() === action.piece));
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
    case CASTLE_QUEEN_SIDE:
      if(action.isWhite) {
        next(removePiece(WHITE_Q_ROOK_SQUARE));
        next(addPiece(WHITE_R_AFTER_QUEEN_CASTLE, 'R'));
      } else {
        next(removePiece(BLACK_Q_ROOK_SQUARE));
        next(addPiece(BLACK_R_AFTER_QUEEN_CASTLE, 'r'));
      }
    default:
      next(action);
  }
};
