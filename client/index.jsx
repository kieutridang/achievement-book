import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import routes from './router.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import store from './store'

ReactDom.render((
	<Provider store={store}>
		<BrowserRouter>
			{routes}
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));
