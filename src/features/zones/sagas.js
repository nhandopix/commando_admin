import { takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { get_list_api } from '../../api/zones';

function* handleGetList({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_list_api, query);

    callback({ data: result.data });
  } catch (error) {
    console.log('error: ', error);
  }
}

export default [
  takeEvery(actionTypes.GET_LIST, handleGetList)
]