// Blog.vue

import { shallowMount, createLocalVue  } from '@vue/test-utils';
import Vuex from 'vuex';
import Header from 'Components/layout/Header.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Blog.vue', () => {
  const config = {
    localVue,
    stubs: ['router-link', 'vue-progress-bar'],
  };

  let storeConfig = {
    state: {
      user: {
        id: '',
        name: '',
      },
    },
  };
  let store = new Vuex.Store(storeConfig);

  describe('component shallow rendering', () => {
    it('should match a snapshot - not authenticated', () => {
      const wrapper = shallowMount(Header, {...config, store});
      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match a snapshot - authenticated', () => {
      storeConfig.state.user.id = '1a';
      storeConfig.state.user.name = 'test';
      store = new Vuex.Store(storeConfig);

      const wrapper = shallowMount(Header, {...config, store});

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('updateHeader() is attached on a mounted hook', async () => {
      const updateHeader = jest.fn();
      const wrapper = shallowMount(Header, {...config, store, methods: {
        updateHeader,
      }});

      global.window.dispatchEvent(new Event('scroll'));

      expect(updateHeader).toHaveBeenCalledTimes(1);
    });

    it('updateHeader() is removed on a mounted hook', async () => {
      const updateHeader = jest.fn();
      const wrapper = shallowMount(Header, {...config, store, methods: {
        updateHeader,
      }});

      wrapper.destroy();
      global.window.dispatchEvent(new Event('scroll'));

      expect(updateHeader).not.toHaveBeenCalled();
    });
  });

  describe("custom actions", () => {
    it('should call toggleMenu() when click on .menu-btn', () => {
      const toggleMenu = jest.fn();
      const wrapper = shallowMount(Header, {...config, store, methods: {
        toggleMenu,
      }});
      const el = wrapper.find('.menu-btn');

      el.trigger('click');

      expect(toggleMenu).toHaveBeenCalledTimes(1);
    });

    it('should revert boolean property "isMenuActive" on toggleMenu()', () => {
      const wrapper = shallowMount(Header, {...config, store});

      wrapper.vm.toggleMenu();

      expect(wrapper.vm.isMenuActive).toBe(true);
    });
  });
});
