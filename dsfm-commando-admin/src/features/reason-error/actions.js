import * as actionTypes from './actionTypes';

const handleGetList = (query, callback) => ({
  type: actionTypes.GET_LIST,
  payload: {
    query,
    callback
  }
});

const handleGetReasonErrorGroupList = (query, callback) => ({
  type: actionTypes.GET_REASON_GROUP_ERROR_LIST,
  payload: {
    query,
    callback
  }
});

export {
  handleGetList,
  handleGetReasonErrorGroupList
}