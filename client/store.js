
import 'regenerator-runtime/runtime'
import createReducer from './reducers/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import root from './saga'
import { fromJS } from 'immutable';

const sagaMiddleware = createSagaMiddleware()
const middleware = applyMiddleware(sagaMiddleware);

const initialState = {};
 
const store = createStore(
  createReducer(),
  fromJS(initialState),
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

)
sagaMiddleware.run(root)

export default store;