import axiosInstance from '../utils/axios';
import { convertObjToQueryString } from '../utils/helpers';

const get_call_coverage_chart_api = (query) => {
  //const query1 = {'flag_report':1};
  const path = '/admin/plans/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

const get_call_achievement_chart_api = (query) => {
  const path = '/admin/pgs/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

const get_noncooperation_reasons_chart_api = (query) => {
  const path = '/admin/pgs/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

const get_noncooperation_reasons_trends_chart_api = (query) => {
  const path = '/admin/pgs/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

const get_fridges_display_result_chart_api = (query) => {
  const path = '/admin/pgs/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

const get_fridges_compliance_chart_api = (query) => {
  const path = '/admin/pgs/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

export {
  get_call_coverage_chart_api,
  get_call_achievement_chart_api,
  get_noncooperation_reasons_chart_api,
  get_noncooperation_reasons_trends_chart_api,
  get_fridges_display_result_chart_api,
  get_fridges_compliance_chart_api
}