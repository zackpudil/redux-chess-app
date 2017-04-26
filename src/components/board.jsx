import React from 'react';
import {connect} from 'react-redux';
import {initSquares} from '../modules/squares';
import {routePiece, BLACK} from '../modules/pieces';

export const Square = (props) => {
	let pieceClick = () => {
			props.routeOnClick(props.id, props.pieceId);
	};

	let squareClass = props.highlighted ? "highlighted" : "";
	squareClass += props.selected ? "selected" : "";

	let pieceClass = props.pieceId === "_" ? "" : props.color === BLACK ? 'black' : 'white';
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
				{this.props.squares.map((s, i) => <Square {...s} key={i} routeOnClick={this.props.routeOnClick} />)}
			</div>
		);
	}
};

export default connect(
	(state = []) => ({ squares: state }), 
	{ routeOnClick: routePiece, initSquares})(Board);


