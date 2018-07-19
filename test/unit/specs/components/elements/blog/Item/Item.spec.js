// Item.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Item from 'Components/elements/blog/Item';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Item.vue', () => {
  const config = {
    localVue,
    mocks: {
      $route: {
        params: {
          code: 'test',
        }
      },
      $modal: {
        show: () => {},
      },
      $router: {
        push: () => {},
      },
    }
  };

  let storeConfig = {
    state: {
      user: {
        userId: '1a',
        isAdmin: false,
      },
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot', async () => {
      const wrapper = shallowMount(Item, { ...config, store });

      await wrapper.setProps({
        data: {
          title: 'test',
          date: new Date('01/01/01'),
          username: 'author',
          previewText: 'test',
        }
      })

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('should set author to user name on created', async () => {
      const wrapper = shallowMount(Item, { ...config, store });

      await wrapper.setProps({
        data: {
          title: 'test',
          date: new Date('01/01/01'),
          username: 'author',
          previewText: 'test',
        }
      })

      expect(wrapper.vm.author).toBe('author');
    });
  });
});
