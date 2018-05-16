import { call, put, takeLatest, select } from 'redux-saga/effects';
import { _helper } from "../api/_helper";
import * as constants from './constants';
import * as actions from './actions';

import moment from 'moment'

export function* fetchWeeklyPlan(action) {
  try {
    // const response = yield call(_helper.fetchGET, '/weeklyplan/' + action.payload.date);
    const response = yield call(_helper.fetchGET, '/weeklyplan/2018-05-14');
    if (response && !response.error) {
      yield put(actions.fetchWeeklyPlanSuccessfully(response.data));
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