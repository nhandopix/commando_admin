import * as actionTypes from './actionTypes';

const handleExportList = (query, callback) => ({
  type: actionTypes.EXPORT_LIST,
  payload: {
    query,
    callback
  }
});
const handleExportListSuccess = () => ({
  type: actionTypes.EXPORT_LIST_SUCCESS
});
const handleExportListError = () => ({
  type: actionTypes.EXPORT_LIST_ERROR
});

const handleGetList = (query, callback) => ({
  type: actionTypes.GET_LIST,
  payload: {
    query,
    callback
  }
});
const handleGetListSuccess = () => ({
  type: actionTypes.GET_LIST_SUCCESS
});
const handleGetListError = () => ({
  type: actionTypes.GET_LIST_ERROR
});

const handleSetQuery = (query) => ({
  type: actionTypes.SET_QUERY,
  payload: {
    query
  }
});

const handleDelete = (ids, callback) => ({
  type: actionTypes.DELETE,
  payload: {
    ids,
    callback
  }
});
const handleDeleteSuccess = () => ({
  type: actionTypes.DELETE_SUCCESS
});
const handleDeleteError = () => ({
  type: actionTypes.DELETE_ERROR
});

const handleCreate = (data, callback) => ({
  type: actionTypes.CREATE,
  payload: {
    data,
    callback
  }
});
const handleCreateSuccess = () => ({
  type: actionTypes.CREATE_SUCCESS
});
const handleCreateError = () => ({
  type: actionTypes.CREATE_ERROR
});

const handleGetDetail = (id, callback) => ({
  type: actionTypes.GET_DETAIL,
  payload: {
    id,
    callback
  }
});
const handleGetDetailSuccess = () => ({
  type: actionTypes.GET_DETAIL_SUCCESS
});
const handleGetDetailError = () => ({
  type: actionTypes.GET_DETAIL_ERROR
});

const handleUpdate = (data, callback, type = 'PUT') => ({
  type: actionTypes.UPDATE,
  payload: {
    data,
    callback,
    type
  }
});
const handleUpdateSuccess = () => ({
  type: actionTypes.UPDATE_SUCCESS
});
const handleUpdateError = () => ({
  type: actionTypes.UPDATE_ERROR
});

const handleGetImageFiles = (id, query, callback) => ({
  type: actionTypes.GET_IMAGE_FILES,
  payload: {
    id,
    query,
    callback
  }
});
const handleGetImageFilesSuccess = () => ({
  type: actionTypes.GET_IMAGE_FILES_SUCCESS
});
const handleGetImageFilesError = () => ({
  type: actionTypes.GET_IMAGE_FILES_ERROR
});

const handleRotateImage = (data, callback) => ({
  type: actionTypes.ROTATE_IMAGE,
  payload: {
    data,
    callback
  }
});
const handleRotateImageSuccess = () => ({
  type: actionTypes.ROTATE_IMAGE_SUCCESS
});
const handleRotateImageError = () => ({
  type: actionTypes.ROTATE_IMAGE_ERROR
});

const handleCreateImageFiles = (data, callback) => ({
  type: actionTypes.CREATE_IMAGE_FILES,
  payload: {
    data,
    callback
  }
});
const handleCreateImageFilesSucess = () => ({
  type: actionTypes.CREATE_IMAGE_FILES_SUCCESS
});
const handleCreateImageFilesError = () => ({
  type: actionTypes.CREATE_IMAGE_FILES_ERROR
});

const handleGetForms = (id, query, callback) => ({
  type: actionTypes.GET_FORMS,
  payload: {
    id,
    query,
    callback
  }
});
const handleGetFormsSuccess = () => ({
  type: actionTypes.GET_FORMS_SUCCESS
});
const handleGetFormsError = () => ({
  type: actionTypes.GET_FORMS_ERROR
});

const handleGetData = (id, callback) => ({
  type: actionTypes.GET_DATA,
  payload: {
    id,
    callback
  }
});
const handleGetDataSuccess = (data) => ({
  type: actionTypes.GET_DATA_SUCCESS,
  payload: {
    data
  }
});
const handleGetDataError = () => ({
  type: actionTypes.GET_DATA_ERROR
});

const handleChangeValue = (path, value) => ({
  type: actionTypes.CHANGE_VALUE,
  payload: {
    path,
    value,
  },
});

const handleUpdatePlanData = (data, callback) => ({
  type: actionTypes.UPDATE_PLAN_DATA,
  payload: {
    data,
    callback,
  }
});

const handleCreateCorrectivePlan = (data, callback) => ({
  type: actionTypes.CREATE_CORRECTIVE_PLAN,
  payload: {
    data,
    callback
  }
});

export {
  handleExportList,
  handleExportListSuccess,
  handleExportListError,
  handleGetList,
  handleGetListSuccess,
  handleGetListError,
  handleSetQuery,
  handleDelete,
  handleDeleteSuccess,
  handleDeleteError,
  handleCreate,
  handleCreateSuccess,
  handleCreateError,
  handleGetDetail,
  handleGetDetailSuccess,
  handleGetDetailError,
  handleUpdate,
  handleUpdateSuccess,
  handleUpdateError,
  handleGetImageFiles,
  handleGetImageFilesSuccess,
  handleGetImageFilesError,
  handleRotateImage,
  handleRotateImageSuccess,
  handleRotateImageError,
  handleCreateImageFiles,
  handleCreateImageFilesSucess,
  handleCreateImageFilesError,
  handleGetForms,
  handleGetFormsSuccess,
  handleGetFormsError,
  handleGetData,
  handleGetDataSuccess,
  handleGetDataError,
  handleChangeValue,
  handleUpdatePlanData,
  handleCreateCorrectivePlan
}
