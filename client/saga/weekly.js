import { call, put, takeLatest, select } from 'redux-saga/effects';
import { _helper } from "../components/api/_helper";
import * as constants from '../constants/index';
import * as actions from '../actions/weekly';

import moment from 'moment'

export function* fetchWeeklyPlan(action) {
  try {
    const response = yield call(_helper.fetchGET, '/weeklyplan/' + action.payload.date);
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