import { combineReducers } from 'redux-immutable';
import WeeklyPlanReducer from '../components/App/reducer'

export default function createReducer() {
  return combineReducers({
    WeeklyPlan : WeeklyPlanReducer,
  });
}