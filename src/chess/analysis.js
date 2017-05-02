import { WHITE_KING_SQUARE, WHITE_K_AFTER_KING_CASTLE, WHITE_K_AFTER_QUEEN_CASTLE,
         BLACK_KING_SQUARE, BLACK_K_AFTER_KING_CASTLE, BLACK_K_AFTER_QUEEN_CASTLE  } from '~/reducers/game';

const wasCastle = (fromSquare, toSquare, after) => {
    return (fromSquare === WHITE_KING_SQUARE || fromSquare === BLACK_KING_SQUARE)
       &&  (toSquare === after);
};

export const wasKingCastle = (fromSquare, toSquare, piece) => {
  if(piece.toLowerCase() !== 'k') return false;
  return wasCastle(fromSquare, toSquare, 
    piece.toLowerCase() === piece ? BLACK_K_AFTER_KING_CASTLE : WHITE_K_AFTER_KING_CASTLE);
}
        
export const wasQueenCastle = (fromSquare, toSquare, piece) => {
  if(piece.toLowerCase() !== 'k') return false;
  return wasCastle(fromSquare, toSquare, 
    piece.toLowerCase() === piece ? BLACK_K_AFTER_QUEEN_CASTLE : WHITE_K_AFTER_QUEEN_CASTLE);
};

export const toMoveNotation = (pieceId, toSquareId, isTake) => {
  let move = '';
  if(pieceId.toLowerCase() !== 'p') move += pieceId;
  if(isTake) move += 'x';
  move += toSquareId;

  return move;
};
