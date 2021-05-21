import * as actionTypes from './actionTypes';

const handleGetList = (query, callback) => ({
  type: actionTypes.GET_LIST,
  payload: {
    query,
    callback
  }
});

export {
  handleGetList
}