import axios from 'axios';
import { handleLogout } from '../features/login/actions';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const httpService = {
  setupInterceptors: (store) => {
    axiosInstance.interceptors.response.use((response) => {
      const total = parseInt(response.headers['x-total-count'], 10) || 0;

      return {
        data: response.data,
        total
      };
    }, (error) => {
      // 401, 403
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(handleLogout());
      }

      return Promise.reject(error);
    });
  }
};

export default axiosInstance;
export {
  httpService
}