import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import  Store from './store';
import Board from './components/board';
import TakenPieces from './components/taken-pieces';
import Moves from './components/moves';

import { BLACK, WHITE } from './modules/pieces';

const App = () => (
	<Provider store={Store}>
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          <TakenPieces color={WHITE} />
          <Board />
          <TakenPieces color={BLACK} />
        </div>
        <div className="col-md-2">
          <Moves />
        </div>
      </div>
    </div>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('appRoot'));
