import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './components/App/index.jsx'
import Login from './containers/Login/index.jsx'
import SignUp from './containers/SignUp/index.jsx'
import Home from "./containers/Home/index.jsx";

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/users/login' component={Login} />
        <Route exact path='/users/signup' component={SignUp} />
    </Switch>
)

export default routes