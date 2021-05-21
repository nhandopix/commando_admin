import { takeEvery, put, call } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {
  get_call_coverage_chart_api,
  get_call_achievement_chart_api,
  get_noncooperation_reasons_chart_api,
  get_noncooperation_reasons_trends_chart_api,
  get_fridges_display_result_chart_api,
  get_fridges_compliance_chart_api
} from '../../api/chart';

function* handleGetCallCoverageChart({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_call_coverage_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetCallCoverageChartSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetCallCoverageChartError());
      }
    }
  }
}

function* handleGetCallAchievementChart({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_call_achievement_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetCallAchievementChartSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetCallAchievementChartError());
      }
    }
  }
}

function* handleGetNoncooperationReasonsChart({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_noncooperation_reasons_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetNoncooperationReasonsChartSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetNoncooperationReasonsChartError());
      }
    }
  }
}

function* handleGetNoncooperationReasonsChartTrends({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_noncooperation_reasons_trends_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetNoncooperationReasonsChartTrendsSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetNoncooperationReasonsChartTrendsError());
      }
    }
  }
}

function* handleGetFridgesDisplayResultChart({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_fridges_display_result_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetFridgesDisplayResultChartSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetFridgesDisplayResultChartError());
      }
    }
  }
}

function* handleGetFridgesComplianceChart({ payload }) {
  const { query, callback } = payload;

  try {
    const result = yield call(get_fridges_compliance_chart_api, query);

    callback({
      error: false,
      data: result.data
    });
    yield put(actions.handleGetFridgesComplianceChartSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetFridgesComplianceChartError());
      }
    }
  }
}

export default [
  takeEvery(actionTypes.GET_CALL_COVERAGE_CHART, handleGetCallCoverageChart),
  takeEvery(actionTypes.GET_CALL_ACHIEVEMENT_CHART, handleGetCallAchievementChart),
  takeEvery(actionTypes.GET_NONCOOPERATION_REASONS_CHART, handleGetNoncooperationReasonsChart),
  takeEvery(actionTypes.GET_NONCOOPERATION_REASONS_TRENDS_CHART, handleGetNoncooperationReasonsChartTrends),
  takeEvery(actionTypes.GET_FRIDGES_DISPLAY_RESULT_CHART, handleGetFridgesDisplayResultChart),
  takeEvery(actionTypes.GET_FRIDGES_COMPLIANCE_CHART, handleGetFridgesComplianceChart),
];