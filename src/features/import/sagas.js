import { takeEvery, put, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { import_api, get_list_api } from '../../api/import';

function* handleImport({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(import_api, data);

    callback({
      error: false,
      message: 'File upload thành công',
      description: 'Đang chờ xử lý',
      data: result.data
    });
    yield put(actions.handleImportSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleImportError());
      }
    }
  }
}

function* handleGetList({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_list_api, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
    yield put(actions.handleGetListSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetListError());
      }
    }
  }
}

export default [
  takeEvery(actionTypes.IMPORT, handleImport),
  takeEvery(actionTypes.GET_LIST, handleGetList),
];