import React from 'react';
import ReactDom from 'react-dom';
import Main from './components/Main/Main.jsx'
import { BrowserRouter } from 'react-router-dom'
import routes from './router.jsx'

ReactDom.render((
    <BrowserRouter>
        {routes}
    </BrowserRouter>
), document.getElementById('root'));