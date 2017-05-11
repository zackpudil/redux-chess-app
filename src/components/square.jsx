import React from 'react';
import {WHITE, BLACK, NO_PIECE_ID} from '../modules/pieces';

// render the piece, which in html is an a tag.
export const Piece = (props) => {
  let pieceClass = 'piece ';

  pieceClass += props.pieceId === NO_PIECE_ID 
    ? "" : props.color === BLACK ? 'black' : 'white';

  return (
    <a href="javascript:void(0)" className={pieceClass}
      onClick={props.pieceClick}>{props.pieceId}</a>
  );
};

export const Square = (props) => {
  let squareClass = props.highlighted 
    ? props.pieceId === NO_PIECE_ID 
      ? "highlighted" : "highlighted-red" : "";
	squareClass += props.selected ? " selected" : "";
  squareClass += props.check ? " checked" : "";

  // piece click, handles what actions to call based on its own state, and state of board.
  // MJ note this logic can be lifted up into parent component or in mapDispatchToProps in board.jsx
  //all of this logic is based on props being passed in and could be centralized in the redux layer.
  //doing so removes critical app logic from a component and would be easier to test
	let pieceClick = () => {
    if(props.pieceId === NO_PIECE_ID) {  // if square does not have a piece, dispatch move action.  If no piece selected before it will clear highlights.
			props.movePiece(props.id);
    } else {
      if(props.highlighted)
        props.takePiece(props.id);
      else { // if the square is not highlighted, then we want a route action.
        // this ensure that route action is called if it's the color's turn.
        if(props.whiteTurn && props.color === WHITE)
			    props.routePiece(props.id, props.pieceId);
        else if(!props.whiteTurn && props.color === BLACK)
          props.routePiece(props.id, props.pieceId);
      }
    }
	};

	return (
		<div id={props.id} className={squareClass}> 
      <Piece pieceId={props.pieceId} color={props.color}  pieceClick={pieceClick} />
		</div>
	);
};

