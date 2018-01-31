import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import routes from './router.jsx'
import Board from './components/Board/index.jsx'
import { observe } from './components/functions/game'

// ReactDom.render((
//     <BrowserRouter>
//         {routes}
//     </BrowserRouter>
// ), document.getElementById('root'));

const rootEl = document.getElementById('root');

observe(knightPosition =>
    ReactDOM.render(
        <Board knightPosition={knightPosition} />,
        rootEl
    )
);
