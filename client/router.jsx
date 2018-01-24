import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './components/App/index.jsx'
import Login from './containers/Login/index.jsx'

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/users/login' component={Login} />
    </Switch>
)

export default routes