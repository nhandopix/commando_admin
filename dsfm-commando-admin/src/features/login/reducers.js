import * as actionTypes from './actionTypes';

const initialState = {
  userInfo: null,
  isOAuth: false
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        userInfo: action.payload.data,
        isOAuth: true
      };
    }

    case actionTypes.LOGOUT: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}