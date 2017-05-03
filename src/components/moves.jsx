import React from 'react';
import {connect} from 'react-redux';

// display a table of moves, in move notation.
export const Moves = (props) => {
  // group moves based on color.  White's always first, so this reducer moves even indexes to white object and odd indexes to black object.
  let groupMoves = props.moves.reduce((acc, val, idx) => {
    if(idx % 2 === 0)  acc[idx] = { white: val }
    else  acc[idx - 1].black = val;

    return acc;
  }, []);
  return (
    <table className="table">
      <thead>
        <tr>
          <th className={props.whiteTurn ? "active" : ""}>White</th>
          <th className={!props.whiteTurn ? "active" : ""}>Black</th>
        </tr>
      </thead>
      <tbody>
        { groupMoves.map((m, i)=> <tr key={i}><td>{m.white}</td><td>{m.black}</td></tr>) }
      </tbody>
    </table>
  );
};

export default connect(
  (state = { game: { moves: [], whiteTurn: true }}) => state.game)
(Moves);
