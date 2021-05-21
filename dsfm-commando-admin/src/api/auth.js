import axiosInstance from '../utils/axios';

const login_api = (data) => {
  return axiosInstance.post('/auth/login/', data);
};

export {
  login_api
}