import * as actionTypes from './actionTypes';

const handleGetCountries = (callback) => ({
  type: actionTypes.GET_COUNTRIES,
  payload: {
    callback
  }
});
const handleGetCountriesSuccess = () => ({
  type: actionTypes.GET_COUNTRIES_SUCCESS
});
const handleGetCountriesError = () => ({
  type: actionTypes.GET_COUNTRIES_ERROR
});

const handleGetProvinces = (country_code, callback) => ({
  type: actionTypes.GET_PROVINCES,
  payload: {
    country_code,
    callback
  }
});
const handleGetProvincesSuccess = () => ({
  type: actionTypes.GET_PROVINCES_SUCCESS
});
const handleGetProvincesError = () => ({
  type: actionTypes.GET_PROVINCES_ERROR
});

const handleGetDistricts = (country_code, province_code, callback) => ({
  type: actionTypes.GET_DISTRICTS,
  payload: {
    country_code,
    province_code,
    callback
  }
});
const handleGetDistrictsSuccess = () => ({
  type: actionTypes.GET_DISTRICTS_SUCCESS
});
const handleGetDistrictsError = () => ({
  type: actionTypes.GET_DISTRICTS_ERROR
});

const handleGetWards = (country_code, province_code, district_code, callback) => ({
  type: actionTypes.GET_WARDS,
  payload: {
    country_code,
    province_code,
    district_code,
    callback
  }
});
const handleGetWardsSuccess = () => ({
  type: actionTypes.GET_WARDS_SUCCESS,
});
const handleGetWardsError = () => ({
  type: actionTypes.GET_WARDS_ERROR,
});

const handleGetAreas = (callback) => ({
  type: actionTypes.GET_AREAS,
  payload: {
    callback,
  },
});
const handleGetAreasSuccess = () => ({
  type: actionTypes.GET_AREAS_SUCCESS,
});
const handleGetAreasError = () => ({
  type: actionTypes.GET_AREAS_ERROR,
});

export {
  handleGetCountries,
  handleGetCountriesSuccess,
  handleGetCountriesError,
  handleGetProvinces,
  handleGetProvincesSuccess,
  handleGetProvincesError,
  handleGetDistricts,
  handleGetDistrictsSuccess,
  handleGetDistrictsError,
  handleGetWards,
  handleGetWardsSuccess,
  handleGetWardsError,
  handleGetAreas,
  handleGetAreasSuccess,
  handleGetAreasError,
};