import React from 'react';
import {connect} from 'react-redux';

export const Moves = (props) => {
  let groupMoves = props.moves.reduce((acc, val, idx) => {
    if(idx % 2 === 0)  acc[idx] = { white: val }
    else  acc[idx - 1].black = val;

    return acc;
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>White</th>
          <th>Black</th>
        </tr>
      </thead>
      <tbody>
        { groupMoves.map((m, i)=> <tr key={i}><td>{m.white}</td><td>{m.black}</td></tr>) }
      </tbody>
    </table>
  );
};

export default connect(
  (state = { game: { moves: [] }}) => ({ moves: state.game.moves }))
(Moves);
