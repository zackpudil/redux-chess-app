import React from 'react';
import {WHITE, BLACK, NO_PIECE_ID} from '~/chess/board';

export const pieceIdToUnicode = {
  'K': '\u2654',
  'k': '\u265A',
  'Q': '\u2655',
  'q': '\u265B',
  'R': '\u2656',
  'r': '\u265C',
  'B': '\u2657',
  'b': '\u265D ',
  'N': '\u2658',
  'n': '\u265E',
  'P': '\u2659',
  'p': '\u265F',
  '_': ''
}

// render the piece, which in html is an a tag.
export const Piece = (props) => {
  let pieceClass = 'piece ';

  pieceClass += props.pieceId === NO_PIECE_ID 
    ? "no-piece" : props.color === BLACK ? 'black' : 'white';

  return (
    <a href="javascript:void(0)" className={pieceClass}
      onClick={props.pieceClick}>{pieceIdToUnicode[props.pieceId]}</a>
  );
};

export const Square = (props) => {
  let squareClass = props.highlighted 
    ? props.pieceId === NO_PIECE_ID 
      ? "highlighted" : "highlighted-red" : "";
	squareClass += props.selected ? " selected" : "";
  squareClass += props.check ? " checked" : "";

  // MJ note this logic can be lifted up into parent component or in mapDispatchToProps in board.jsx
  //all of this logic is based on props being passed in and could be centralized in the redux layer.
  //doing so removes critical app logic from a component and would be easier to test
	let pieceClick = props.squareClick.bind(null, props.id, props.pieceId, props.color);
	return (
		<div id={props.id} className={squareClass}> 
      <Piece pieceId={props.pieceId} color={props.color}  pieceClick={pieceClick} />
		</div>
	);
};

