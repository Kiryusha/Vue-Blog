// List.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import List from 'Components/elements/blog/List';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('List.vue', () => {
  const endlessScroll = jest.fn();
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
      list: {
        list: [{}, {}],
        currentPage: 1,
        activeCategory: '',
        isBottomReached: false,
      },
    },
    actions: {
      fetchList: () => {},
    }
  };
  let store = new Vuex.Store(storeConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(List, { ...config, store });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("lifecycle-driven methods calls", () => {
    it('should attach endlessScroll() to the window scroll event on a created hook', async () => {
        const wrapper = shallowMount(List, {...config, store, methods: {
          endlessScroll,
        }});
        await wrapper.vm.$nextTick();
        global.window.dispatchEvent(new Event('scroll'));
        wrapper.destroy();

        expect(endlessScroll).toHaveBeenCalled();
      });

    it('should remove endlessScroll() from the window scroll event on a destroyed hook', async () => {
      const wrapper = shallowMount(List, {...config, store, methods: {
        endlessScroll,
      }})
      await wrapper.destroy();
      global.window.dispatchEvent(new Event('scroll'));

      expect(endlessScroll).not.toHaveBeenCalled();
    });
  });
});
