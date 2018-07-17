import axios from 'axios';
import app from '@/main';
import callErrorModal from '@/helpers/callErrorModal';

const instance = axios.create();

instance.interceptors.request.use((config) => {
  app.$Progress.start();
  return config;
}, (error) => {
  callErrorModal(app, error);

  return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
  app.$Progress.finish();
  return response;
}, (error) => {
  const altHandling =
    error.response &&
    error.response.status === 400 && (
      error.response.config.url.indexOf('/auth/login') !== -1 ||
      error.response.config.url.indexOf('/auth/register') !== -1
    );

  if (!altHandling) {
    callErrorModal(app, error);
  }

  return Promise.reject(error);
});

export default instance;
