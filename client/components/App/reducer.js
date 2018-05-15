import { fromJS } from 'immutable';

import * as constants from './constants';
import { debug } from 'util';

const initialState = fromJS({
  data: {}
});

const WeeklyPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_WEEKLY_PLAN_SUCCESSFULLY:
          return  state.set('data', action.payload.data)  ;

    default:
      return state;
  }
};

export default WeeklyPlanReducer;
