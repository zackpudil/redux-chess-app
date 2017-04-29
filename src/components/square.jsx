import React from 'react';
import {BLACK, NO_PIECE_ID} from '../modules/pieces';

export const Piece = (props) => {
  let pieceClass = props.pieceId === NO_PIECE_ID 
    ? "" : props.color === BLACK ? 'black' : 'white';

  return (
    <a href="javascript:void(0)" className={pieceClass}
      onClick={props.pieceClick}>{props.pieceId}</a>
  );
};

export const Square = (props) => {
	let pieceClick = () => {
		if(props.pieceId === NO_PIECE_ID)
			props.movePiece(props.id);
		else
			props.routePiece(props.id, props.pieceId);
	};

  let squareClass = props.highlighted 
    ? props.pieceId === NO_PIECE_ID ? "highlighted" : "highlighted-red" 
    : "";
	squareClass += props.selected ? "selected" : "";

	return (
		<div id={props.id} className={squareClass}> 
      <Piece pieceId={props.pieceId} color={props.color}  pieceClick={pieceClick} />
		</div>
	);
};

