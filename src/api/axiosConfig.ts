
import axios from 'axios';
import { deleteAuthTokenLocalStorage, getAuthTokenLocalStore, setAuthTokenLocalStore } from '../store/browser';

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const setAuthToken = (token: string | null) => {
  if (token) {
    setAuthTokenLocalStore(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    removeAuthToken();
  }
};

export const removeAuthToken = () => {
  deleteAuthTokenLocalStorage();
  delete axios.defaults.headers.common['Authorization'];
};

const initToken = getAuthTokenLocalStore();

if (initToken) {
  setAuthToken(initToken);
}

axios.interceptors.request.use(
  (config) => {
    const token = getAuthTokenLocalStore();

    if (token && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axios;