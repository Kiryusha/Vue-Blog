import axios from 'axios';
import app from '@/main';

const instance = axios.create();

function processError(error) {
  let errText = 'Неизвестная ошибка.';

  if (error.response) {
    errText = error.response.data.message ? error.response.data.message :
      error.response.data;
  } else {
    errText = error.message;
  }

  app.$Progress.fail();
  app.$modal.show('response', { message: errText });
}

instance.interceptors.request.use((config) => {
  app.$Progress.start();
  return config;
}, (error) => {
  processError(error);

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
    processError(error);
  }

  return Promise.reject(error);
});

export default instance;
