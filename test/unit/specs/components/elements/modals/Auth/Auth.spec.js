// auth.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Auth from 'Components/elements/modals/Auth.vue';
import callErrorModal from '@/helpers/callErrorModal';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('@/helpers/callErrorModal', () => jest.fn());

describe('Auth.vue', () => {
  const submit = jest.fn();
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
    actions: {
      authenticate: () => {},
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Auth, { ...config, store });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should call authenticate() on submit()', () => {
      const authenticate = jest.fn().mockResolvedValue();
      const wrapper = shallowMount(Auth, { ...config, store, methods: {
        authenticate,
      }});

      wrapper.vm.submit('test')

      expect(authenticate).toHaveBeenCalledTimes(1);
    });
  });

  describe('custom actions', () => {
    it('should call callErrorModal() on submit() when get error', async () => {
      const authenticate = jest.fn().mockRejectedValue(new Error('test'));
      const wrapper = shallowMount(Auth, { ...config, store, methods: {
        authenticate,
      }});

      await wrapper.vm.submit('test')

      expect(callErrorModal).toHaveBeenCalledTimes(1);
    });
  });
});
