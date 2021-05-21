import * as actionTypes from './actionTypes';

const test = () => ({
  type: actionTypes.TEST
});
const testSuccess = () => ({
  type: actionTypes.TEST_SUCCESS
});
const testError = () => ({
  type: actionTypes.TEST_ERROR
});

export {
  test,
  testSuccess,
  testError
}