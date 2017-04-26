import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import  Store from './store';
import Board from './components/board';

const App = () => (
	<Provider store={Store}>
		<Board />
	</Provider>
);

ReactDOM.render(<App />, document.getElementById('appRoot'));
