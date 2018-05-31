import * as constants from '../constants/index';

export const fetchUser = () => ({
  type: constants.FETCH_USER
});

export const fetchUserSuccessfully = (data) => ({
  type: constants.FETCH_USER_SUCCESSFULLY,
  payload: {
    data
  }
});

