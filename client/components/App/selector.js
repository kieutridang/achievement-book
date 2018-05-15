import { createSelector } from 'reselect';

const WeeklyPlanSelector = (state) => state.get('WeeklyPlan');

const WeeklyPlanData = createSelector(
  (WeeklyPlanSelector),
  (WeeklyPlanSelector) => WeeklyPlanSelector.get('data')
)

export {
  WeeklyPlanData,
};
