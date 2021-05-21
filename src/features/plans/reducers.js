import * as actionTypes from './actionTypes';

const initialState = {
  query: {
    ordering: '',
    search: '',
    page: 1,
    page_size: 10,
    pg_sid: undefined,
    store_sid: undefined,
    start_date: undefined,
    end_date: undefined,
    status: undefined,
    qc_status: undefined,
    isExport: false,
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