import { takeEvery, put, call, all } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {
  export_list_api,
  get_list_api, delete_api, create_api, get_detail_api,
  update_api, get_image_files_api, rotate_image_api, create_image_files_api, get_forms_api,
  get_data_api, update_plan_data_api, create_corrective_plan_api
} from '../../api/plans';

function* handleExportList({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(export_list_api, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
    yield put(actions.handleExportListSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleExportListError());
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
  const { data, callback, type } = payload;

  try {
    if (type === 'PUT') {
      const result = yield call(update_api, data);

      callback({
        error: false,
        message: 'Cập nhật thành công',
        data: result.data
      });
    } else {
      const { ids, values } = data;
      const result = yield all(ids.map((id) => call(update_api, { id, ...values }, type)));

      callback({
        error: false,
        message: 'Cập nhật thành công',
        data: result.length
      });
    }

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

function* handleGetImageFiles({ payload }) {
  const { id, query, callback } = payload;

  try {
    const result = yield call(get_image_files_api, id, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
    yield put(actions.handleGetImageFilesSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetImageFilesError());
      }
    }
  }
}

function* handleRotateImage({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(rotate_image_api, data);

    callback({
      error: false,
      message: 'Xoay hình thành công',
      data: result.data
    });
    yield put(actions.handleRotateImageSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleRotateImageError());
      }
    }
  }
}

function* handleCreateImageFiles({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(create_image_files_api, data);

    callback({
      error: false,
      message: 'Thêm hình thành công',
      data: result.data
    });
    yield put(actions.handleCreateImageFilesSucess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleCreateImageFilesError());
      }
    }
  }
}

function* handleGetForms({ payload }) {
  const { id, query, callback } = payload;

  try {
    const result = yield call(get_forms_api, id, query);

    callback({
      error: false,
      total: result.total,
      data: result.data
    });
    yield put(actions.handleGetFormsSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetFormsError());
      }
    }
  }
}

function* handleGetData({ payload }) {
  const { id, callback } = payload;
  try {
    const result = yield call(get_data_api, id);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetDataSuccess(result.data[0]));
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetDataError());
      }
    }
  }
}


function* handleUpdatePlanData({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(update_plan_data_api, data);

    callback({
      error: false,
      message: 'Cập nhật thành công',
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

function* handleCreateCorrectivePlan({ payload }) {
  const { data, callback } = payload;

  try {
    const result = yield call(create_corrective_plan_api, data);
    console.log('Result: ', result)
    callback({
      error: false,
      message: 'Thành công',
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
  takeEvery(actionTypes.EXPORT_LIST, handleExportList),
  takeEvery(actionTypes.GET_LIST, handleGetList),
  takeEvery(actionTypes.DELETE, handleDelete),
  takeEvery(actionTypes.CREATE, handleCreate),
  takeEvery(actionTypes.GET_DETAIL, handleGetDetail),
  takeEvery(actionTypes.UPDATE, handleUpdate),
  takeEvery(actionTypes.GET_IMAGE_FILES, handleGetImageFiles),
  takeEvery(actionTypes.ROTATE_IMAGE, handleRotateImage),
  takeEvery(actionTypes.CREATE_IMAGE_FILES, handleCreateImageFiles),
  takeEvery(actionTypes.GET_FORMS, handleGetForms),
  takeEvery(actionTypes.GET_DATA, handleGetData),
  takeEvery(actionTypes.UPDATE_PLAN_DATA, handleUpdatePlanData),
  takeEvery(actionTypes.CREATE_CORRECTIVE_PLAN, handleCreateCorrectivePlan),
];