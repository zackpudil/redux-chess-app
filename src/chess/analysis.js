import { WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE,
         BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE } from '~/modules/game';

export const wasKingCastle = (fromSquare, toSquare, piece) => {
  if(piece === 'K') {
    return fromSquare === WHITE_KING_SQUARE && toSquare === WHITE_K_AFTER_KING_CASTLE;
  } else if(piece === 'k') {
    return fromSquare === BLACK_KING_SQUARE && toSquare === BLACK_K_AFTER_KING_CASTLE;
  }
  return false;
}
        
