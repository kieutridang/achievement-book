import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const WeeklyPlanSelector = (state) => state.get('WeeklyPlan');

const WeeklyPlanData = () => createSelector(
  (WeeklyPlanSelector),
  (WeeklyPlanSelector) => WeeklyPlanSelector.get('data')
)

export {
  WeeklyPlanData,
};
