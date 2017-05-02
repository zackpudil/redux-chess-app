import React from 'react';
import {connect} from 'react-redux';
import {initSquares} from '../reducers/squares';
import {routePiece, movePiece, takePiece, BLACK, NO_PIECE_ID} from '../reducers/pieces';
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
          takePiece={this.props.takePiece }
          whiteTurn={this.props.whiteTurn }/>)}
			</div>
		);
	}
};

export default connect(
  (state = { squares: [], game: { whiteTurn: true } }) => 
    ({ squares: state.squares, whiteTurn: state.game.whiteTurn }), 
  { routePiece, movePiece, takePiece, initSquares})
(Board);


