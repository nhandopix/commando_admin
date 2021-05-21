import * as actionTypes from './actionTypes';

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

const handleUpdate = (data, callback) => ({
  type: actionTypes.UPDATE,
  payload: {
    data,
    callback
  }
});
const handleUpdateSuccess = () => ({
  type: actionTypes.UPDATE_SUCCESS
});
const handleUpdateError = () => ({
  type: actionTypes.UPDATE_ERROR
});

export {
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
  handleUpdateError
}
