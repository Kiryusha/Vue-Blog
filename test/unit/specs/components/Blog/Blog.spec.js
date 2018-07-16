// Blog.vue

import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vuex from 'vuex';
import Blog from 'Components/pages/Blog.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Blog.vue', () => {
  const initBlog = jest.fn();
  const fetchCategories = jest.fn();
  const fetchList = jest.fn();
  const config = {
    localVue,
    stubs: ['router-view'],
    mocks: {
      $route: {
        fullPath: 'full/path',
      },
    },
  };

  let storeConfig = {
    state: {
      list: {
        categories: [],
      },
    },
    actions: {
      fetchList: jest.fn(),
      fetchCategories: jest.fn(),
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot - no categories', () => {
      const wrapper = shallowMount(Blog, {...config, store});

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match a snapshot - with categories', () => {
      storeConfig.state.list.categories = [1, 2, 3];
      store = new Vuex.Store(storeConfig);

      const wrapper = shallowMount(Blog, {...config, store});

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.contains('categories-stub')).toBe(true);
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('should call initBlog() on a created hook', () => {
      const wrapper = shallowMount(Blog, {...config, store, methods: {
        initBlog,
      }});

      expect(initBlog).toHaveBeenCalledTimes(1);
    });

    it('should call fetchList() and fetchCategories() on initBlog()', () => {
      const wrapper = shallowMount(Blog, {...config, store, methods: {
        fetchList,
        fetchCategories,
      }});

      expect(fetchList).toHaveBeenCalledTimes(1);
      expect(fetchCategories).toHaveBeenCalledTimes(1);
    });
  });
});
