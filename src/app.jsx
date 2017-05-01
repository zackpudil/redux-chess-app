import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  Store from './store';
import Board from './components/board';
import TakenPieces from './components/taken-pieces';

import { BLACK, WHITE } from './modules/pieces';

const App = () => (
	<Provider store={Store}>
    <div>
      <TakenPieces color={WHITE} />
      <Board />
      <TakenPieces color={BLACK} />
    </div>
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('appRoot'));
