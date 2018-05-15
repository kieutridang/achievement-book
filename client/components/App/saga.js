import { call, put, takeLatest, select } from 'redux-saga/effects';
import { _helper } from "../api/_helper";
import * as constants from './constants';
import * as actions from './actions';

import moment from 'moment'

export function* fetchWeeklyPlan(action) {
  try {
    const response = yield call(_helper.fetchGET, '/dailyplan/getplan/' + action.payload.date);
    if (response && !response.error) {
        console.log(response)
        yield put(actions.fetchWeeklyPlanSuccessfully(response));
      } else {
        throw new Error(response.error);
      }
    
  } catch (error) {
    console.log(error);
  }
}

export default function* weeklyPlanSaga() {
  yield takeLatest(constants.FETCH_WEEKLY_PLAN, fetchWeeklyPlan);
}