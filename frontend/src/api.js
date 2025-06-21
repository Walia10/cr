import axios from 'axios';

const API = axios.create({
  baseURL: 'https://cr-g6g3.onrender.com/',
});



API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;
