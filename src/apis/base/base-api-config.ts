import axios from "axios";
import apiConfig from "../configs/api-config";
const api = axios.create({
  baseURL: apiConfig,
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
