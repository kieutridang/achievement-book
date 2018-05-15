import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Router } from 'react-router-dom'
import routes from './router.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import configureStore from './store'
import { createBrowserHistory } from 'history';



const history = createBrowserHistory({basename: '/', forceRefresh: true});
  
const initialState = {};
const store = configureStore(initialState, history)

ReactDom.render((
	<Provider store={store}>
		<Router history={history}>
			{routes}
		</Router>
	</Provider>
), document.getElementById('root'));
