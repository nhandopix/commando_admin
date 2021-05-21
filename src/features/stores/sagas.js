import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import { get_list_api, delete_api, create_api, get_detail_api, update_api } from '../../api/stores';

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

function* handleDelete({ payload }) {
  const { ids, callback } = payload;
  try {
    const result = yield all(ids.map((id) => call(delete_api, id)));

    callback({
      error: false,
      data: result.length,
      message: 'Xóa thành công'
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

function* handleCreate({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(create_api, data);

    callback({
      error: false,
      message: 'Tạo mới thành công',
      data: result.data
    });
    yield put(actions.handleCreateSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleCreateError());
      }
    }
  }
}

function* handleGetDetail({ payload }) {
  const { id, callback } = payload;

  try {
    const result = yield call(get_detail_api, id);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetDetailSuccess());
  }
  catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetDetailError());
      }
    }
  }
}

function* handleUpdate({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(update_api, data);

    callback({
      error: false,
      message: 'Cập nhật thành công',
      data: result.data
    });
    yield put(actions.handleUpdateSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleUpdateError());
      }
    }
  }
}

export default [
  takeEvery(actionTypes.GET_LIST, handleGetList),
  takeEvery(actionTypes.DELETE, handleDelete),
  takeEvery(actionTypes.CREATE, handleCreate),
  takeEvery(actionTypes.GET_DETAIL, handleGetDetail),
  takeEvery(actionTypes.UPDATE, handleUpdate)
];