import React from 'react';
import {connect} from 'react-redux';
import {initSquares} from '../modules/squares';
import {routePiece, movePiece, BLACK, NO_PIECE_ID} from '../modules/pieces';

export const Square = (props) => {
	let pieceClick = () => {
		if(props.pieceId === NO_PIECE_ID)
			props.movePiece(props.id);
		else
			props.routePiece(props.id, props.pieceId);
	};

	let squareClass = props.highlighted ? "highlighted" : "";
	squareClass += props.selected ? "selected" : "";

	let pieceClass = props.pieceId === NO_PIECE_ID ? "" : props.color === BLACK ? 'black' : 'white';
	return (
		<div className={squareClass}> 
			<a href="javascript:void(0)" className={pieceClass}
				onClick={pieceClick}>{props.pieceId}</a>
		</div>
	);
};

class Board extends React.Component {
	componentDidMount() {
		this.props.initSquares()
	}

	render() {
		return (
			<div className="board">
				{this.props.squares.map((s, i) => <Square key={i} {...s} 
					routePiece={this.props.routePiece} 
					movePiece={this.props.movePiece} />)}
			</div>
		);
	}
};

export default connect(
	(state = []) => ({ squares: state }), 
	{ routePiece, movePiece, initSquares})(Board);


