import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/pages/Blog';
import Detail from '@/components/pages/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog,
    },
    {
      path: '/detail/',
      name: 'Detail',
      component: Detail,
    },
  ],
});
