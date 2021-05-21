import axiosInstance from '../utils/axios';
import { convertQueryString } from '../utils/helpers';

const get_list_api = (query) => {
  const path = '/public/cities/?' + convertQueryString(query);

  return axiosInstance.get(path);
};

export {
  get_list_api
}