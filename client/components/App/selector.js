import { createSelector } from 'reselect';

const WeeklyPlanSelector = (state) => state.get('WeeklyPlan');

const WeeklyPlanData = createSelector(
  (WeeklyPlanSelector),
  (state) => state.get('data')
)

export {
  WeeklyPlanData,
};
