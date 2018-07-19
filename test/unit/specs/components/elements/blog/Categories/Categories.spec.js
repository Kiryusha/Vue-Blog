// Categories.vue

import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Categories from 'Components/elements/blog/Categories';
import callErrorModal from '@/helpers/callErrorModal';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('@/helpers/callErrorModal', () => jest.fn());

describe('Categories.vue', () => {
  const fetchList = jest.fn();
  const config = {
    localVue,
    mocks: {
      $route: {
        path: '/blog/',
      },
      $router: {
        push: jest.fn(),
      },
    }
  };

  let storeConfig = {
    state: {
      list: {
        categories: ['cat','dog'],
        activeCategory: 'cat',
      },
    },
    actions: {
      fetchList: () => {},
    },
  };
  let store = new Vuex.Store(storeConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component shallow rendering', async () => {
    it('should match a snapshot', () => {
      const wrapper = mount(Categories, { ...config, store });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should call plain fetchList() on selectCategory() by selecting active category', () => {
      const wrapper = mount(Categories, { ...config, store, methods: {
        fetchList,
      }});

      wrapper.vm.selectCategory('cat')

      expect(fetchList).toHaveBeenCalledTimes(1);
      expect(fetchList).toHaveBeenCalledWith({});
    });

    it('should call fetchList("dog") on selectCategory() by selecting "dog" category while "cat" is active', () => {
      const wrapper = mount(Categories, { ...config, store, methods: {
        fetchList,
      }});

      wrapper.vm.selectCategory('dog')

      expect(fetchList).toHaveBeenCalledTimes(1);
      expect(fetchList).toHaveBeenCalledWith({
        activeCategory: 'dog',
      });
    });

    it('should call $router.push("/blog/") on selectCategory() if route differs from "/blog/"', async () => {
      config.mocks.$route.path = '/blog/test/';
      const wrapper = mount(Categories, { ...config, store, methods: {
        fetchList,
      }});

      await wrapper.vm.selectCategory('cat')

      expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/blog/');
    });

    it('should call callErrorModal() on selectCategory() if error happens', async () => {
      const fetchList = jest.fn().mockRejectedValue(new Error('test'));
      const wrapper = mount(Categories, { ...config, store, methods: {
        fetchList,
      }});

      await wrapper.vm.selectCategory('cat')

      expect(callErrorModal).toHaveBeenCalledTimes(1);
    });
  });
});
