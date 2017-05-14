import React from 'react';
import {connect} from 'react-redux';
import { groupMovesByColor } from '~/modules/game/selectors';

// display a table of moves, in move notation.
export const Moves = (props) => {
  //MJ Note this is a lot of logic in a component. Maybe move this into mapStateToProps function, or something closer to the redux store. 
  //maybe a selector http://redux.js.org/docs/recipes/ComputingDerivedData.html
    return (<table className="table">
      <thead>
        <tr>
          <th className={props.whiteTurn ? "active" : ""}>White</th>
          <th className={!props.whiteTurn ? "active" : ""}>Black</th>
        </tr>
      </thead>
      <tbody>
        { props.moves.map((m, i) => (<tr key={i}>
          <td>{m.white}</td>
          <td>{m.black}</td>
          </tr>)) }
      </tbody>
    </table>
  );
};

const initialState = {
  game: {
    moves: [],
    whiteTurn: true
  }
};

const selector = (state = initialState) => {
  return {
    whiteTurn: state.game.whiteTurn,
    moves: groupMovesByColor(state.game.moves)
  };
};

export default connect(selector)(Moves);
