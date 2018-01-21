import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './components/App/index.jsx'
import PredictHousePrice from './containers/PredictHousePrice'

const routes = (
    <Switch>
        {/* <Route exact path='/' component={App} /> */}
        <Route exact path='/' component={PredictHousePrice} />
    </Switch>
)

export default routes