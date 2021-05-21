import * as actionTypes from './actionTypes';

const handleImport = (data, callback) => ({
  type: actionTypes.IMPORT,
  payload: {
    data,
    callback
  }
});
const handleImportSuccess = () => ({
  type: actionTypes.IMPORT_SUCCESS
});
const handleImportError = () => ({
  type: actionTypes.IMPORT_ERROR
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

export {
  handleImport,
  handleImportSuccess,
  handleImportError,
  handleGetList,
  handleGetListSuccess,
  handleGetListError
}