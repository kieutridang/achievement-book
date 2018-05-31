
import 'regenerator-runtime/runtime'
import createReducer from './reducers/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { fromJS, Map } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

const sagaMiddleware = createSagaMiddleware()


const middleware = applyMiddleware(sagaMiddleware);


const store = createStore(
  createReducer(),
  fromJS({}),
  // Immutable.Map({}),
  composeWithDevTools(middleware),

)
store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);


export default store; 
