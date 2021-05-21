import { takeEvery, put, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { login_api } from '../../api/auth';
import { parseJwt } from '../../utils/helpers';

function* handleLogin({ payload }) {
  const { data, callback } = payload;
  try {
    const result = yield call(login_api, data);
    const { token, role } = result.data;

    yield localStorage.setItem('token', token);
    yield localStorage.setItem('role', role);

    callback({ error: false });

    yield put(actions.handleLoginSuccess(result.data));

  } catch (error) {
    const message = error.response?.data?.message || error.message;
    callback({ error: true, message });
    yield put(actions.handleLoginError());
  }
}

function* handleLogout() {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('role');
}

function* handleCheckAuth() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  // Convert JWT to Object
  const parseResult = parseJwt(token);

  if (parseResult) {
    if (parseResult.exp < (new Date().getTime() / 1000) || parseResult.user?.role !== role) {
      yield put(actions.handleLogout());
    } else {
      yield put(actions.handleLoginSuccess(parseResult.user));
    }
  } else {
    yield put(actions.handleLogout());
  }
}

export default [
  takeEvery(actionTypes.LOGIN, handleLogin),
  takeEvery(actionTypes.LOGOUT, handleLogout),
  takeEvery(actionTypes.CHECK_AUTH, handleCheckAuth)
];