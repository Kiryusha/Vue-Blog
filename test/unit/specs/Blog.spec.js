// Blog.vue

import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Blog from 'Components/pages/Blog.vue';
import installUnhandledPromise from 'jest-plugin-unhandled-promise';
import callErrorModal from '@/helpers/callErrorModal';

// Jest, since v21, should do it yourself, but I didnt find that option.
installUnhandledPromise(console.log);
// Unless we connect axios and vue-axios, Jest cannot mock "this.axios"
Vue.use(VueAxios, axios);

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('@/helpers/callErrorModal', () => jest.fn());

describe('Blog.vue', () => {
  // $route.fullPath is used as :key value in router-view
  const initBlog = jest.fn();
  const fetchCategories = jest.fn();
  const fetchList = jest.fn();
  const addScroll = jest.fn();
  const removeScroll = jest.fn();
  const endlessScroll = jest.fn();
  let wrapper;
  let config =  {
    stubs: ['router-view'],
    mocks: {
      $route: {
        fullPath: 'full/path',
        path: '/blog/',
      },
      $router: {
        push: jest.fn(),
      },
      $modal: {
        show: () => {},
      },
      $Progress: {
        fail: () => {},
      },
    },
  };

  beforeEach(() => {
    axios.get.mockClear();
    axios.get.mockResolvedValue({ data: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
    config.mocks.$route.path = '/blog/';
  });

  describe('component shallow rendering', () => {
    beforeEach(() => {
      wrapper = shallowMount(Blog, config);
    });

    it('matches shallow snapshot of itself', () => {
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('renders sidebar if has categories', () => {
      wrapper.setData({ categories: [1, 2, 3] });

      expect(wrapper.contains('sidebarblock-stub')).toBe(true);
    });
  });

  describe("lifecycle-driven methods calls", () => {
    it('calling initBlog() on a created hook', () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        initBlog,
      }});

      expect(initBlog).toHaveBeenCalledTimes(1);
    });

    it('calling fetchCategories() on a created hook', () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
      }});

      expect(fetchCategories).toHaveBeenCalledTimes(1);
    });

    it('fetchCategories() should set categories to API value', async () => {
      const data = ['cat', 'dog'];
      axios.get.mockResolvedValue({ data });

      const wrapper = shallowMount(Blog, config);
      await wrapper.vm.$nextTick();

      expect(axios.get).toHaveBeenCalledWith('/api/categories/');
      expect(wrapper.vm.categories).toBe(data);
    });

    it('calling fetchList() on a created hook', () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
        fetchList,
      }});

      expect(fetchList).toHaveBeenCalledTimes(1);
    });

    it('fetchList() should set list to API value', async () => {
      const data = [{ cat: 'dog' }, { cat: 'dog' }, { cat: 'dog' }];
      axios.get.mockResolvedValue({ data });

      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
      }});
      await wrapper.vm.$nextTick();

      expect(axios.get).toHaveBeenCalledWith('/api/posts/1/');
      expect(wrapper.vm.list).toBe(data);
    });

    it('calling asynchronously addScroll() on a created hook', async () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
        fetchList,
        addScroll,
      }});
      await wrapper.vm.$nextTick();

      expect(addScroll).toHaveBeenCalledTimes(1);
    });

    it('addScroll() attaches endlessScroll() to the window scroll event', async () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
        fetchList,
        endlessScroll,
      }});
      await wrapper.vm.$nextTick();
      global.window.dispatchEvent(new Event('scroll'));
      wrapper.destroy();

      expect(endlessScroll).toHaveBeenCalled();
    });

    it('calling removeScroll() on a destroyed hook', () => {
      const wrapper = shallowMount(Blog, {...config, methods: {
        addScroll,
        removeScroll,
      }})
      wrapper.destroy();

      expect(removeScroll).toHaveBeenCalledTimes(1);
    });

    it('removeScroll() removes endlessScroll() from the window scroll event', async () => {
      // Attaching events to global objects is hell for unit testing
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
        fetchList,
        endlessScroll,
      }})
      await wrapper.vm.$nextTick();

      wrapper.destroy();
      global.window.dispatchEvent(new Event('scroll'));

      expect(endlessScroll).not.toHaveBeenCalled();
    });
  });

  describe("custom actions", () => {
    it('fetchList() should add API value to list', async () => {
      const list = [{ gato: 'perro' }];
      const data = [{ cat: 'dog' }];

      axios.get.mockResolvedValue({ data });

      const wrapper = shallowMount(Blog, {...config, methods: {
        initBlog,
      }});

      wrapper.setData({ list });
      // imitating scroll to bottom
      wrapper.vm.fetchList(null, 2, true);
      await wrapper.vm.$nextTick();

      expect(axios.get).toHaveBeenCalledWith('/api/posts/2/');
      expect(wrapper.vm.list).toEqual([...list, ...data]);
    });

    it("fetchList('test') should call '/api/categories/category/1/'", async () => {
      const wrapper = shallowMount(Blog, config);
      wrapper.vm.fetchList('test');

      expect(axios.get).toHaveBeenCalledWith('/api/categories/test/1/');
    });

    it("fetchList('test') should set its argument as activeCategory", async () => {
      const wrapper = shallowMount(Blog, config);
      wrapper.vm.fetchList('test');

      expect(wrapper.vm.activeCategory).toBe('test');
    });

    it("fetchList('test') should call redirect if $route is not '/blog/'", async () => {
      config.mocks.$route.path = '/post/';
      const wrapper = shallowMount(Blog, config);

      wrapper.vm.fetchList('test');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$router.push).toHaveBeenCalled();
    });

    it("deletePost('test') should delete post from list by code", async () => {
      const list = [{
        code: 'test',
      }, {
        code: 'test2',
      }];
      const result = [{
        code: 'test2',
      }]
      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchList,
      }});

      wrapper.setData({ list });
      wrapper.vm.deletePost('test');
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.list).toEqual(result);
    });
  });

  describe("error handling", () => {
    it("fetchCategories() reject calls callErrorModal()", async () => {
      axios.get.mockResolvedValue();
      axios.get.mockRejectedValue(new Error('test'));

      const wrapper = shallowMount(Blog, config);
      await wrapper.vm.$nextTick();

      expect(callErrorModal).toHaveBeenCalled();
    });

    it("fetchList() reject calls callErrorModal()", async () => {
      axios.get.mockResolvedValue();
      axios.get.mockRejectedValue(new Error('test'));

      const wrapper = shallowMount(Blog, {...config, methods: {
        fetchCategories,
      }});
      await wrapper.vm.$nextTick();

      expect(callErrorModal).toHaveBeenCalled();
    });
  });
});
