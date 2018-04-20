import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import weeklyStart from './containers/WeekStart/reducer'
 
const store = createStore(
  todoApp,
  weeklyStart,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;