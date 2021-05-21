import axiosInstance from '../utils/axios';
import { convertQueryString } from '../utils/helpers';

const get_list_api = (query) => {
  const path = '/admin/reason-error/?' + convertQueryString(query);

  return axiosInstance.get(path);
};

const get_reason_group_error_list = (query) => {
  const path = '/admin/reason-group-error/?' + convertQueryString(query);

  return axiosInstance.get(path);
}

export {
  get_list_api,
  get_reason_group_error_list
}