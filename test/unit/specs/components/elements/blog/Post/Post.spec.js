// Post.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Post from 'Components/elements/blog/Post';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Blog.vue', () => {
  const config = {
    localVue,
    mocks: {
      $route: {
        params: {
          code: 'test',
        }
      }
    }
  };

  let storeConfig = {
    state: {
      post: {
        data: {
          title: 'test',
          date: new Date('01/01/01'),
        },
      },
    },
    actions: {
      fetchPost: () => {},
    }
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot - not authenticated', () => {
      const wrapper = shallowMount(Post, { ...config, store });
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('should set author to user name on created', () => {
      storeConfig.state.post.data.username = 'test';
      let store = new Vuex.Store(storeConfig);
      const wrapper = shallowMount(Post, { ...config, store });

      expect(wrapper.vm.author).toBe('test');
    });
  });
});
