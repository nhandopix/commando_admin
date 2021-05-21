import axiosInstance from '../utils/axios';
import { convertQueryString } from '../utils/helpers';

const export_list_api = (query) => {
  const path = '/admin/exports/plans/?' + convertQueryString(query);
  const config = {
    timeout: 600000
  };

  return axiosInstance.get(path, config);
};

const get_list_api = (query) => {
  const path = '/admin/plans/?' + convertQueryString(query);

  return axiosInstance.get(path);
};

const delete_api = (id) => {
  const path = `/admin/plans/${id}/`;

  return axiosInstance.delete(path);
};

const create_api = (data) => {
  const path = '/admin/plans/';

  return axiosInstance.post(path, data);
};

const get_detail_api = (id) => {
  const path = `/admin/plans/${id}/`;

  return axiosInstance.get(path);
};

const update_api = (data, type = 'PUT') => {
  const path = `/admin/plans/${data.id}/`;

  if (type === 'PUT') {
    return axiosInstance.patch(path, data);
  }

  return axiosInstance.patch(path, data);
};

const get_image_files_api = (id, query) => {
  let path = `/admin/plans/${id}/image-files/?` + convertQueryString(query);

  return axiosInstance.get(path);
};

const rotate_image_api = ({ plan_sid, plan_file_id, data }) => {
  const path = `/admin/plans/${plan_sid}/image-files/${plan_file_id}/rotation/`;

  return axiosInstance.post(path, data);
};

const create_image_files_api = ({ plan_sid, data }) => {
  const path = `/admin/plans/${plan_sid}/image-files/`;

  return axiosInstance.post(path, data);
};

const get_forms_api = (id, query) => {
  let path = `/admin/plans/${id}/forms/?` + convertQueryString(query);

  return axiosInstance.get(path);
};

const get_data_api = (id) => {
  const path = `/admin/plans/${id}/data/`;

  return axiosInstance.get(path);
};

const update_plan_data_api = (data) => {
  const path = `/admin/plans/${data.plan_sid}/data/${data.id}/`;

  return axiosInstance.put(path, data);
};

const create_corrective_plan_api = ({ plan_sid, ...data }) => {
  const path = `admin/plans/${plan_sid}/corrective/`;

  return axiosInstance.post(path, data);
};

export {
  export_list_api,
  get_list_api,
  delete_api,
  create_api,
  get_detail_api,
  update_api,
  get_image_files_api,
  rotate_image_api,
  create_image_files_api,
  get_forms_api,
  get_data_api,
  update_plan_data_api,
  create_corrective_plan_api
}