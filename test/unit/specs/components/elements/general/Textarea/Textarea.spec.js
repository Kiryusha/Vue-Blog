// Textarea.vue

import { shallowMount } from '@vue/test-utils';
import Textarea from 'Components/elements/general/Textarea.vue';

describe('Textarea.vue', () => {

  describe('component shallow rendering', () => {
    it('should match a snapshot', () => {
      const wrapper = shallowMount(Textarea);

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match a snapshot - with error', () => {
      const wrapper = shallowMount(Textarea);

      wrapper.setProps({
        error: 'test error',
      });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('should calln inputHandler() on an update hook', () => {
      const inputHandler = jest.fn();
      const wrapper = shallowMount(Textarea, { methods: {
        inputHandler,
      }});

      wrapper.setData({
        innerValue: 'test',
      })

      expect(inputHandler).toHaveBeenCalledTimes(1);
      });
  });

  describe('custom actions', () => {
    it('should set innerValue on value prop change', () => {
      const wrapper = shallowMount(Textarea);

      wrapper.setProps({
        value: 'test',
      });

      expect(wrapper.vm.innerValue).toBe('test');
    });

    it('should emit parent input event on local input event', () => {
      const wrapper = shallowMount(Textarea);

      wrapper.find('.control').trigger('input');

      expect(wrapper.emitted().input).toBeTruthy();
    });
  });
});
