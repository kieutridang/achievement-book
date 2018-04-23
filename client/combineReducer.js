import { combineReducers } from "redux";
import weeklyData from './containers/WeekStart/reducer'

const achievementBook = combineReducers({
  weeklyData,
})

export default achievementBook;