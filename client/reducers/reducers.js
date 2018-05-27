import { combineReducers } from 'redux-immutable';
import WeeklyPlanReducer from '../components/App/reducer'
import AppReducer from './appReducer'

export default function createReducer() {
  return combineReducers({
    WeeklyPlan : WeeklyPlanReducer,
    AppReducer: AppReducer
  });
}