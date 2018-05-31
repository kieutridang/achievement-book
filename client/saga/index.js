// vendor
import { fork } from 'redux-saga/effects';
// app
import weeklyPlanSaga from '../components/App/saga'
import appSaga from './appSaga'


export default function* rootSaga() { 
    yield fork(weeklyPlanSaga);
    yield fork(appSaga)
}