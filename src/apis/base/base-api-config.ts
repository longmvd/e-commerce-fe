import { useCookie } from '@/composable/clientStorage/useCookie';
import axios from 'axios';
import apiConfig from '../configs/api-config';
const { getCookie } = useCookie();
const api = axios.create({
  baseURL: apiConfig,
  headers: {
    Authorization: 'Bearer ' + getCookie('Bearer'),
  },
});

api.interceptors.response.use(
  (response) => {
    if (response && response.status === 401) {
      //todo log out
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
