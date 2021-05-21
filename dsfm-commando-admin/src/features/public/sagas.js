import { takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actions from './actions';
import {
  get_countries_api,
  get_provinces_api,
  get_districts_api,
  get_wards_api,
  get_areas_api,
} from "../../api/public";

function* handleGetCountries({ payload }) {
  const { callback } = payload;

  try {
    const result = yield call(get_countries_api);

    callback({ error: false, data: result.data });
    yield put(actions.handleGetCountriesSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetCountriesError());
      }
    }
  }
}

function* handleGetProvinces({ payload }) {
  const { country_code, callback } = payload;

  try {
    const result = yield call(get_provinces_api, country_code);

    callback({ error: false, data: result.data });
    yield put(actions.handleGetProvincesSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetProvincesError());
      }
    }
  }
}

function* handleGetDistricts({ payload }) {
  const { country_code, province_code, callback } = payload;

  try {
    const result = yield call(get_districts_api, country_code, province_code);

    callback({ error: false, data: result.data });
    yield put(actions.handleGetDistrictsSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetDistrictsError());
      }
    }
  }
}

function* handleGetWards({ payload }) {
  const { country_code, province_code, district_code, callback } = payload;

  try {
    const result = yield call(get_wards_api, country_code, province_code, district_code);

    callback({ error: false, data: result.data });
    yield put(actions.handleGetWardsSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetWardsError());
      }
    }
  }
}

function* handleGetAreas({ payload }) {
  const { callback } = payload;

  try {
    const result = yield call(get_areas_api);

    callback({ error: false, data: result.data });
    yield put(actions.handleGetAreasSuccess());
  } catch (error) {
    if (error.response) {
      if (error.response.status !== 401 && error.response.status !== 403) {
        const message = error.response.data?.message || error.message;
        callback({ error: true, message });
        yield put(actions.handleGetAreasError());
      }
    }
  }
}

export default [
  takeEvery(actionTypes.GET_COUNTRIES, handleGetCountries),
  takeEvery(actionTypes.GET_PROVINCES, handleGetProvinces),
  takeEvery(actionTypes.GET_DISTRICTS, handleGetDistricts),
  takeEvery(actionTypes.GET_WARDS, handleGetWards),
  takeEvery(actionTypes.GET_AREAS, handleGetAreas),
];