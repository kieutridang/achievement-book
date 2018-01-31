import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './components/App/index.jsx'

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
    </Switch>
)

export default routes