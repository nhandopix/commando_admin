import * as actionTypes from './actionTypes';

const handleLogin = (data, callback) => ({
  type: actionTypes.LOGIN,
  payload: {
    data,
    callback
  }
});
const handleLoginSuccess = (data) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: {
    data
  }
});
const handleLoginError = () => ({
  type: actionTypes.LOGIN_ERROR
});

const handleLogout = () => ({
  type: actionTypes.LOGOUT
});

const handleCheckAuth = () => ({
  type: actionTypes.CHECK_AUTH
});

export {
  handleLogin,
  handleLoginSuccess,
  handleLoginError,
  handleLogout,
  handleCheckAuth
}