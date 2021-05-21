import * as actionTypes from './actionTypes';

const initialState = {
  query: {
    ordering: '',
    search: '',
    province_code: undefined,
    page: 1,
    page_size: 10
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_QUERY: {
      return {
        ...initialState,
        query: action.payload.query
      };
    }

    default: {
      return state;
    }
  }
}