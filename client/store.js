
import 'regenerator-runtime/runtime'
import createReducer from './reducers/reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { fromJS, Map } from 'immutable';
import { routerMiddleware } from 'react-router-redux';

const sagaMiddleware = createSagaMiddleware()


const middleware = applyMiddleware(sagaMiddleware);


const store = createStore(
  createReducer(),
  fromJS({}),
  // Immutable.Map({}),
  compose(middleware, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

)
store.runSaga = sagaMiddleware.run;
store.runSaga(rootSaga);


export default store;
