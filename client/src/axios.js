import axios from 'axios';

const instance = axios.create();

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(
  function (config) {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth && auth.token.id) {
      config.headers.Authorization = `Bearer ${auth.token.id}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
