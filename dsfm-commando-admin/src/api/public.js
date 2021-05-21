import axiosInstance from '../utils/axios';

const get_countries_api = () => {
  const path = '/public/locations/countries/';

  return axiosInstance.get(path);
};

const get_provinces_api = (country_code) => {
  const path = `/public/locations/countries/${country_code}/provinces/`;

  return axiosInstance.get(path);
};

const get_districts_api = (country_code, province_code) => {
  const path = `/public/locations/countries/${country_code}/provinces/${province_code}/districts/`;

  return axiosInstance.get(path);
};

const get_wards_api = (country_code, province_code, district_code) => {
  const path = `/public/locations/countries/${country_code}/provinces/${province_code}/districts/${district_code}/wards/`;

  return axiosInstance.get(path);
};

const get_areas_api = () => {
  const path = "/public/areas/";

  return axiosInstance.get(path);
};

export {
  get_countries_api,
  get_provinces_api,
  get_districts_api,
  get_wards_api,
  get_areas_api,
};