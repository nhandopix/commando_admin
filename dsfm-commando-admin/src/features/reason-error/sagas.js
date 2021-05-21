import { takeEvery, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import { get_list_api, get_reason_group_error_list } from '../../api/reason-error';

function* handleGetList({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_list_api, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
      }
    }
  }
}

function* handleGetReasonErrorGroupList({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_reason_group_error_list, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
      }
    }
  }
}

export default [
  takeEvery(actionTypes.GET_LIST, handleGetList),
  takeEvery(actionTypes.GET_REASON_GROUP_ERROR_LIST, handleGetReasonErrorGroupList),
];