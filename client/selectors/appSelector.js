import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

const AppSelector = (state) => state.get('AppReducer');

const AppData = () => createSelector(
  (AppSelector),
  (AppSelector) => AppSelector.get('data')
)


export {
    AppData
};
