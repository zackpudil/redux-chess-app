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

export const toMoveNotation = (pieceId, toSquareId, fromSquareId, isTake) => {
  let move = '';
  let isPawn = pieceId.toLowerCase() === 'p';
  let isKing = pieceId.toLowerCase() === 'k';

  let standardMove = () => {
    move += pieceId;
    if(isTake) move += 'x';
    move += toSquareId;
  };

  if(!isPawn && !isKing) {
    standardMove();
  } else if(isPawn) {
    if(!isTake) move += toSquareId;
    else move += fromSquareId.split('')[0] + 'x' + toSquareId.split('')[0];
  } else if(isKing) {
    var toKing, toQueen, king;
    if(pieceId.toLowerCase() === pieceId) {
      toKing = BLACK_K_AFTER_KING_CASTLE;
      toQueen = BLACK_K_AFTER_QUEEN_CASTLE;
      king = BLACK_KING_SQUARE;
    } else {
      toKing = WHITE_K_AFTER_KING_CASTLE;
      toQueen = WHITE_K_AFTER_QUEEN_CASTLE;
      king = WHITE_KING_SQUARE;
    }

    if(toSquareId === toKing && fromSquareId === king) move = '0-0';
    else if(toSquareId === toQueen && fromSquareId === king) move = '0-0-0';
    else standardMove();
  }  

  return move;
};
