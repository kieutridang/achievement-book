import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HelloWorld from '../HelloWorld/HelloWorld.jsx'

export default class Page extends React.Component {
    render() {
        return (
        <div>
            <Switch>
                <Route exact path='/' component={HelloWorld}/>
            </Switch>
        </div>
    )}
}