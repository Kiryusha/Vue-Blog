import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/pages/Blog';
import List from '@/components/pages/blog/List';
import Post from '@/components/pages/blog/Post';
import Publish from '@/components/pages/Publish';
import NotFound from '@/components/pages/NotFound';
import store from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    }, {
      path: '/',
      redirect: '/blog/',
    }, {
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
    }, {
      path: '/publish/',
      component: Publish,
      beforeEnter: (to, from, next) => {
        if (!store.state.isAuthenticated) {
          next('/blog/');
        } else {
          next();
        }
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
  linkActiveClass: '_active',
});
