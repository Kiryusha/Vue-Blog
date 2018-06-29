// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'normalize.css';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal';
import axios from '@/helpers/axios-api';
import VueAxios from 'vue-axios';
import Tooltip from 'vue-directive-tooltip';
import App from './App';
import router from './router';
import store from './store';

// importing all svgs
const requireAll = r => r.keys().forEach(r);
requireAll(require.context('./assets/ico/', true, /\.svg$/));


// fixing IE11 "Object doesn't support property or method 'blur'" error
if (typeof SVGElement.prototype.blur === 'undefined') {
  SVGElement.prototype.blur = () => {};
}

Vue.config.productionTip = false;

// todo: adjust loader's color
const progressBarOptions = {
  color: '#BB9500',
  failedColor: '#FF0000',
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

const tooltipOptions = {
  placement: 'top',
  class: 'tooltip-custom',
  offset: 2,
  delay: 100,
};

Vue.use(VueProgressBar, progressBarOptions);
Vue.use(Vuelidate);
Vue.use(VModal);
Vue.use(VueAxios, axios);
Vue.use(Tooltip, tooltipOptions);

// Loading store from localStorage
store.commit('initialiseStore');

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
