import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth && auth.token.id) {
      config.headers.Authorization = `Bearer ${auth.token.id}`;
    }

    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;
