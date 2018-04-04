import { createStore } from 'redux'
import todoApp from './reducers/reducers'
 
const store = createStore(
  todoApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;