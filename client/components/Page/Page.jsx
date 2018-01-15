import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login/Login.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import App from '../App/App.jsx'

export default class Page extends React.Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/registration' component={App} />
            </Switch>
        </div>
    )}
}