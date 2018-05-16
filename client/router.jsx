import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App/index.jsx';
import Login from './containers/Login/index.jsx';
import SignUp from './containers/SignUp/index.jsx';
import Home from "./containers/Home/index.jsx";
import DailyPlan from './containers/DayStart/index.jsx';
import DailyResult from './containers/DayEnd/index.jsx';
import WeeklyPlan from './containers/WeekStart/index'
import WeeklyResult from './containers/WeekEnd/index.jsx'

const routes = (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/users/login' component={Login} />
        <Route exact path='/users/signup' component={SignUp} />
        <Route exact path='/day-plan' component={DailyPlan} />
        <Route exact path='/day-plan/:date' component={DailyPlan} />        
        <Route exact path='/day-result' component={DailyResult} />
        <Route exact path='/day-result/:date' component={DailyResult} />
        <Route exact path='/week-plan' component={WeeklyPlan} />
        <Route exact path='/week-result' component={WeeklyResult} />
    </Switch>
)

export default routes