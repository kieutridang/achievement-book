import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './components/App/index.jsx'
import Login from './containers/Login/index.jsx'
import SignUp from './containers/SignUp/index.jsx'
import Home from "./containers/Home/index.jsx";
import DailyPlan from './containers/DayStart/index.jsx'
import DailyResult from './containers/DayEnd/index.jsx'

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/users/login' component={Login} />
        <Route exact path='/users/signup' component={SignUp} />
        <Route exact path='/daily-plan' component={DailyPlan} />
        <Route exact path='/daily-plan/:date' component={DailyPlan} />        
        <Route exact path='/daily-result' component={DailyResult} />
        <Route exact path='/daily-result/:date' component={DailyResult} />
        
    </Switch>
)

export default routes