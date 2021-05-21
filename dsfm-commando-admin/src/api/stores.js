import axiosInstance from '../utils/axios';
import { convertQueryString } from '../utils/helpers';

const get_list_api = (query) => {
  const path = '/admin/stores/?' + convertQueryString(query);

  return axiosInstance.get(path);
};

const delete_api = (id) => {
  const path = `/admin/stores/${id}/`;

  return axiosInstance.delete(path);
};

const create_api = (data) => {
  const path = '/admin/stores/';

  return axiosInstance.post(path, data);
};

const get_detail_api = (id) => {
  const path = `/admin/stores/${id}/`;

  return axiosInstance.get(path);
};

const update_api = (data) => {
  const path = `/admin/stores/${data.id}/`;

  return axiosInstance.put(path, data);
};

export {
  get_list_api,
  delete_api,
  create_api,
  get_detail_api,
  update_api
}