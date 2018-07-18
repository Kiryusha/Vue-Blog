// Input.vue

import { shallowMount } from '@vue/test-utils';
import Input from 'Components/elements/general/Input.vue';

describe('Input.vue', () => {

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Input);

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match a snapshot - with error', () => {
      const wrapper = shallowMount(Input);

      wrapper.setProps({
        error: 'test error',
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('custom actions', () => {
    it('should set innerValue on value prop change', () => {
      const wrapper = shallowMount(Input);

      wrapper.setProps({
        value: 'test',
      });

      expect(wrapper.vm.innerValue).toBe('test');
    });

    it('should emit parent input event on local input event', () => {
      const wrapper = shallowMount(Input);

      wrapper.find('.control').trigger('input');

      expect(wrapper.emitted().input).toBeTruthy();
    });
  });
});
