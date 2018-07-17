// Publish.vue

import { shallowMount } from '@vue/test-utils';
import Publish from 'Components/pages/Publish.vue';

describe('Publish.vue', () => {
  const initBlog = jest.fn();
  const fetchCategories = jest.fn();
  const fetchList = jest.fn();
  const config = {
    stubs: ['router-view'],
    mocks: {
      $route: {
        fullPath: 'full/path',
        params: {
          code: null,
        }
      },
    },
  };

  describe('component shallow rendering', () => {
    it('should match a snapshot - no $route code param', () => {
      const wrapper = shallowMount(Publish, config);

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.contains('publish-stub')).toBe(true);
    });

    it('should match a snapshot - with $route code params', () => {
      config.mocks.$route.params.code = 'test';

      const wrapper = shallowMount(Publish, config);

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.contains('publish-stub')).toBe(true);
    });
  });
});
