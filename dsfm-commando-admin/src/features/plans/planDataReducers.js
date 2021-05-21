import produce from 'immer';
import _ from 'lodash';
import * as actionTypes from './actionTypes';

const initialState = {
  planData: null
};

const planReducer = produce((draft, action) => {
  switch (action.type) {
    case actionTypes.GET_DATA_SUCCESS: {
      console.log('action: ', action)
      draft.planData = action.payload.data;
      break;
    }

    case actionTypes.CHANGE_VALUE: {
      _.set(draft.planData.data, action.payload.path, action.payload.value);
      break;
    }

    default: {
      return draft;
    }
  }
}, initialState);

export default planReducer;