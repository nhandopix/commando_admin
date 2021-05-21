import axiosInstance from '../utils/axios';
import { convertObjToQueryString } from '../utils/helpers';

const import_api = (data) => {
  const path = `/admin/import-files/`;

  return axiosInstance.post(path, data);
};

const get_list_api = (query) => {
  let path = `/admin/import-files/?` + convertObjToQueryString(query);

  return axiosInstance.get(path);
};

export {
  import_api,
  get_list_api
}