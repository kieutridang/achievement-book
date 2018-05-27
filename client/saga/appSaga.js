import { call, put, takeLatest, select } from 'redux-saga/effects';
import { _helper } from "../components/api/_helper";
import * as constants from '../constants/index';
import * as actions from '../actions/appActions';

import moment from 'moment'

export function* fetchUser(action) {
  try {
    const response = yield call(_helper.fetchGET, '/user/getuser');
    if (response.status == 200) {
      yield put(actions.fetchUserSuccessfully(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export default function* appSaga() {
  yield takeLatest(constants.FETCH_USER, fetchUser);
}
