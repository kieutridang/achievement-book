import * as constants from './constants';

export const fetchWeeklyPlan = (date) => ({
  type: constants.FETCH_WEEKLY_PLAN,
  payload: {
    date
  }
});

export const fetchWeeklyPlanSuccessfully = (data) => ({
  type: constants.FETCH_WEEKLY_PLAN_SUCCESSFULLY,
  payload: {
    data
  }
});
