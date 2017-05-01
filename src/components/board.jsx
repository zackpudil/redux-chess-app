import React from 'react';
import {connect} from 'react-redux';
import {initSquares} from '../modules/squares';
import {routePiece, movePiece, takePiece, BLACK, NO_PIECE_ID} from '../modules/pieces';
import {Square} from './Square';

export class Board extends React.Component {
	componentDidMount() {
		this.props.initSquares()
	}

	render() {
		return (
			<div className="board">
				{this.props.squares.slice().reverse().map((s, i) => <Square key={i} {...s} 
					routePiece={this.props.routePiece} 
          movePiece={this.props.movePiece} 
          takePiece={this.props.takePiece }/>)}
			</div>
		);
	}
};

export default connect(
	(state = { squares: [] }) => ({ squares: state.squares }), 
  { routePiece, movePiece, takePiece, initSquares})
(Board);


