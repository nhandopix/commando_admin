import axiosInstance from '../utils/axios';
import { convertObjToQueryString } from '../utils/helpers';

const get_list_api = (query) => {
  let path = '/public/store-types/?' + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

export {
  get_list_api
}