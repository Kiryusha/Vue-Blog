import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/pages/Blog';
import List from '@/components/pages/blog/List';
import Post from '@/components/pages/blog/Post';
import NotFound from '@/components/pages/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    },
    {
      path: '/blog/',
      component: Blog,
      children: [{
        path: '',
        component: List,
        name: 'BlogList',
        props: true,
      }, {
        path: ':code',
        component: Post,
        name: 'BlogPost',
      }],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
});
