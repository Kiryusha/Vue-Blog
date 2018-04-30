// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import App from './App';
import router from './router';

const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./assets/ico/', true, /\.svg$/));

Vue.config.productionTip = false;

const options = {
  color: '#BB9500',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'top',
  inverse: false,
};

Vue.use(VueProgressBar, options);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
