// Menu.vue

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Menu from 'Components/elements/header/Menu.vue';
import callErrorModal from '@/helpers/callErrorModal';

const localVue = createLocalVue();
localVue.use(Vuex);

jest.mock('@/helpers/callErrorModal', () => jest.fn());

describe('Menu.vue', () => {
  let config = {
    localVue,
    stubs: ['router-link'],
    mocks: {
      $Progress: {
        start: () => {},
        finish: () => {},
      },
      $route: {
        path: '/blog/',
      },
      $router: {
        push: jest.fn(),
      },
      $modal: {
        show: () => {},
      },
    },
  };

  let storeConfig = {
    state: {
      user: {
        id: '1a',
      },
    },
    actions: {
      authLogout: () => {},
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Menu, { ...config, store });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should call authLogout() on logout()', async () => {
      const authLogout = jest.fn().mockResolvedValue();
      const wrapper = shallowMount(Menu, { ...config, store, methods: {
        authLogout,
      }});

      await wrapper.vm.logout()

      expect(authLogout).toHaveBeenCalledTimes(1);
    });

    it('should call callErrorModal() on logout() with error', async () => {
      const authLogout = jest.fn().mockRejectedValue();
      const wrapper = shallowMount(Menu, { ...config, store, methods: {
        authLogout,
      }});

      await wrapper.vm.logout()

      expect(callErrorModal).toHaveBeenCalledTimes(1);
    });

    it('should redirect to "/blog/" on logout() if route is "/publish/"', async () => {
      config.mocks.$route.path = '/publish/';

      const authLogout = jest.fn().mockResolvedValue();
      const wrapper = shallowMount(Menu, { ...config, store, methods: {
        authLogout,
      }});

      await wrapper.vm.logout()

      expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$router.push).toHaveBeenCalledWith('/blog/');
    });
  });
});
