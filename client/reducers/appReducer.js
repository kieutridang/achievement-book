import { fromJS } from 'immutable';

import * as constants from '../constants/index';


const initialState = fromJS({
    data: {},

});

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.FETCH_USER_SUCCESSFULLY:
            return state.set('data', action.payload.data);
                        
       

        default:
            return state;
    }
};

export default appReducer;
