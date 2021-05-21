import { takeEvery, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

function* test() {
  try {
    console.log('TEST SAGA RUN');

    yield put(actions.testSuccess());
  } catch (error) {
    console.log('TEST SAGA RUN ERROR');

    yield put(actions.testError());
  }
}

export default [
  takeEvery(actionTypes.TEST, test)
]