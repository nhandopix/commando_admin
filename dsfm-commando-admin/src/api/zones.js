import axiosInstance from '../utils/axios';
import { convertQueryString } from '../utils/helpers';

const get_list_api = (query) => {
  const path = '/public/zones/?' + convertQueryString(query);

  return axiosInstance.get(path);
};

export {
  get_list_api
}