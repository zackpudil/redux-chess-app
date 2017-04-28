import React from 'react';
import {connect} from 'react-redux';
import {initSquares} from '../modules/squares';
import {routePiece, movePiece, BLACK, NO_PIECE_ID} from '../modules/pieces';
import {Square} from './Square';

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


