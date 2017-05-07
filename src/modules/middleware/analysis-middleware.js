/* Handles the analyzeBoard action, it dispatches action based on analysis to itself. Such as castling and pawn promotion. */
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
import { addPiece, removePiece, checkSquare } from '../squares';
import { wasKingCastle, wasQueenCastle, isKingInCheck, getSquaresOfPiece } from '~/chess/analysis';
import { fromState } from '~/chess/board';

export default store => next => action => {
  switch(action.type) {
    case ANALYZE_BOARD:
      // check for castling, if castling move is detected dispatch CASTLE actions to self.
      let isWhite = action.piece.toUpperCase() === action.piece;
      if(wasKingCastle(action.fromSquare, action.toSquare, action.piece)) {
        store.dispatch(castleKingSide(isWhite));
      }

      if(wasQueenCastle(action.fromSquare, action.toSquare, action.piece)) {
        store.dispatch(castleQueenSide(isWhite));
      }

      let board = fromState(store.getState().squares);
      if(isKingInCheck(board, !isWhite)) {
        next(checkSquare(getSquaresOfPiece(isWhite ? 'k' : 'K', board)[0]));
        next(checkSquare(action.toSquare));
      }
      break;
    // castling actions need to move the rook as well, dispatch more remove/add piece actions to squares reducer.
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
      break;
    default:
      next(action);
  }
};
