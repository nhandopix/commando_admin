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

export {
  handleGetList,
  handleGetListSuccess,
  handleGetListError
}