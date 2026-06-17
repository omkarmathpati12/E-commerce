import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: false,
});

let authData = null;

export const setAuth = (username, password) => {
  const token = btoa(`${username}:${password}`);
  authData = { username, password, token };
  api.defaults.headers.common['Authorization'] = `Basic ${token}`;
};

export const clearAuth = () => {
  authData = null;
  delete api.defaults.headers.common['Authorization'];
};

export const loadAuth = () => {
  return authData;
};

export default api;
