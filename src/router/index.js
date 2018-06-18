import Vue from 'vue';
import Router from 'vue-router';
import Blog from '@/components/pages/Blog';
import List from '@/components/elements/blog/List';
import Post from '@/components/elements/blog/Post';
import Publish from '@/components/pages/Publish';
import NotFound from '@/components/pages/NotFound';
import store from '@/store';

Vue.use(Router);

const router = new Router({
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
      }, {
        path: ':code',
        component: Post,
      }],
    }, {
      path: '/publish/',
      component: Publish,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ':code',
          component: Publish,
          meta: {
            requiresAuth: true,
          },
        },
      ],
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!store.state.auth.isAuthenticated) {
      next('/blog/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
