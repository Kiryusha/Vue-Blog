// Response.vue

import { shallowMount } from '@vue/test-utils';
import Response from 'Components/elements/modals/Response.vue';

describe('Response.vue', () => {
  const config = {
    stubs: ['modal'],
  };

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Response, config);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should set title data property on beforeOpen()', () => {
      const wrapper = shallowMount(Response, config);

      wrapper.vm.beforeOpen({
        params: {
          message: 'test',
        }
      })

      expect(wrapper.vm.title).toBe('test');
    });
  });
});
