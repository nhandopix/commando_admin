import * as actionTypes from './actionTypes';

const handleGetCallCoverageChart = (query, callback) => ({
  type: actionTypes.GET_CALL_COVERAGE_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetCallCoverageChartSuccess = () => ({
  type: actionTypes.GET_CALL_COVERAGE_CHART_SUCCESS
});
const handleGetCallCoverageChartError = () => ({
  type: actionTypes.GET_CALL_COVERAGE_CHART_ERROR
});

const handleGetCallAchievementChart = (query, callback) => ({
  type: actionTypes.GET_CALL_ACHIEVEMENT_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetCallAchievementChartSuccess = () => ({
  type: actionTypes.GET_CALL_ACHIEVEMENT_CHART_SUCCESS
});
const handleGetCallAchievementChartError = () => ({
  type: actionTypes.GET_CALL_ACHIEVEMENT_CHART_ERROR
});

const handleGetNoncooperationReasonsChart = (query, callback) => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetNoncooperationReasonsChartSuccess = () => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_CHART_SUCCESS
});
const handleGetNoncooperationReasonsChartError = () => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_CHART_ERROR
});

const handleGetNoncooperationReasonsChartTrends = (query, callback) => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_TRENDS_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetNoncooperationReasonsChartTrendsSuccess = () => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_TRENDS_CHART_SUCCESS
});
const handleGetNoncooperationReasonsChartTrendsError = () => ({
  type: actionTypes.GET_NONCOOPERATION_REASONS_TRENDS_CHART_ERROR
});

const handleGetFridgesDisplayResultChart = (query, callback) => ({
  type: actionTypes.GET_FRIDGES_DISPLAY_RESULT_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetFridgesDisplayResultChartSuccess = () => ({
  type: actionTypes.GET_FRIDGES_DISPLAY_RESULT_CHART_SUCCESS
});
const handleGetFridgesDisplayResultChartError = () => ({
  type: actionTypes.GET_FRIDGES_DISPLAY_RESULT_CHART_ERROR
});

const handleGetFridgesComplianceChart = (query, callback) => ({
  type: actionTypes.GET_FRIDGES_COMPLIANCE_CHART,
  payload: {
    query,
    callback
  }
});
const handleGetFridgesComplianceChartSuccess = () => ({
  type: actionTypes.GET_FRIDGES_COMPLIANCE_CHART_SUCCESS
});
const handleGetFridgesComplianceChartError = () => ({
  type: actionTypes.GET_FRIDGES_COMPLIANCE_CHART_ERROR
});

export {
  handleGetCallCoverageChart,
  handleGetCallCoverageChartSuccess,
  handleGetCallCoverageChartError,
  handleGetCallAchievementChart,
  handleGetCallAchievementChartSuccess,
  handleGetCallAchievementChartError,
  handleGetNoncooperationReasonsChart,
  handleGetNoncooperationReasonsChartSuccess,
  handleGetNoncooperationReasonsChartError,
  handleGetNoncooperationReasonsChartTrends,
  handleGetNoncooperationReasonsChartTrendsSuccess,
  handleGetNoncooperationReasonsChartTrendsError,
  handleGetFridgesDisplayResultChart,
  handleGetFridgesDisplayResultChartSuccess,
  handleGetFridgesDisplayResultChartError,
  handleGetFridgesComplianceChart,
  handleGetFridgesComplianceChartSuccess,
  handleGetFridgesComplianceChartError
}
