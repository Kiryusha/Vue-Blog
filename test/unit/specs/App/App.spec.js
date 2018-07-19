// App.vue

import { shallowMount } from '@vue/test-utils';

import App from '@/App';

describe('App.vue', () => {
  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(App, { stubs: ['router-view'] });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
