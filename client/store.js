
import 'regenerator-runtime/runtime'
import createReducer from './reducers/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import root from './saga'
import { fromJS, Map } from 'immutable';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history) {

const middleware = applyMiddleware(sagaMiddleware,  routerMiddleware(history),);

 
const store = createStore(
  createReducer(),
  fromJS(initialState),
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

)
store.runSaga = sagaMiddleware.run;
store.runSaga(root);
return store;
}