// Delete.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Delete from 'Components/elements/modals/Delete.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Delete.vue', () => {
  const fetchCategories = jest.fn();
  const deletePost = jest.fn();
  const DELETED_POST_FROM_LIST = jest.fn();
  const config = {
    localVue,
    stubs: ['modal'],
    mocks: {
      $modal: {
        hide: jest.fn(),
      },
    },
  };

  let storeConfig = {
    state: {
      user: {
        id: '1a',
      },
    },
    mutations: {
      DELETED_POST_FROM_LIST: jest.fn(),
    },
    actions: {
      fetchCategories: () => {},
      deletePost: () => {},
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Delete, { ...config, store });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should set code data property on beforeOpen()', () => {
      const wrapper = shallowMount(Delete, { ...config, store });

      wrapper.vm.beforeOpen({
        params: {
          code: 'test',
        }
      })

      expect(wrapper.vm.code).toBe('test');
    });

    it('should call all delete functions on submitDeletion()', async () => {
      const wrapper = shallowMount(Delete, { ...config, store, methods: {
        deletePost,
        fetchCategories,
        DELETED_POST_FROM_LIST,
      }});

      wrapper.vm.beforeOpen({
        params: {
          code: 'test',
        }
      })

      await wrapper.vm.submitDeletion()

      expect(deletePost).toHaveBeenCalledTimes(1);
      expect(deletePost).toHaveBeenCalledWith({
        code: 'test',
        userId: '1a',
      });
      expect(fetchCategories).toHaveBeenCalledTimes(1);
      expect(DELETED_POST_FROM_LIST).toHaveBeenCalledTimes(1);
      expect(DELETED_POST_FROM_LIST).toHaveBeenCalledWith('test');
    });
  });
});
