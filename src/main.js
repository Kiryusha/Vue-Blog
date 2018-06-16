// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import 'normalize.css';
import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal';
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
const options = {
  color: '#BB9500',
  failedColor: '#BD4932',
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
Vue.use(Vuelidate);
Vue.use(VModal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
