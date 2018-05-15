// vendor
import { fork } from 'redux-saga/effects';
// app
import weeklyPlanSaga from '../components/App/saga'


export default function* root() { 
    yield fork(weeklyPlanSaga);
}