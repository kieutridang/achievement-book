import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './components/App/index.jsx';
import Login from './containers/Login/index.jsx';
import SignUp from './containers/SignUp/index.jsx';
import Home from "./containers/Home/index.jsx";
import DailyPlan from './containers/DayStart/index.jsx';
import DailyResult from './containers/DayEnd/index.jsx';
import WeekStart from './containers/WeekStart/index';
import WeekEnd from './containers/WeekEnd/index.jsx';
import Dashboard from './containers/Dashboard/index.jsx';

const routes = (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/home' component={Dashboard} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/users/login' component={Login} />
        <Route exact path='/users/signup' component={SignUp} />
        <Route exact path='/day-plan' component={DailyPlan} />
        <Route exact path='/day-plan/:date' component={DailyPlan} />        
        <Route exact path='/day-result' component={DailyResult} />
        <Route exact path='/day-result/:date' component={DailyResult} />
        <Route exact path='/week-result/' component={WeekEnd} />
        <Route exact path='/week-result/:date' component={WeekEnd} />
        <Route exact path='/week-plan' component={WeekStart} />
    </Switch>
)

export default routes