// Publish.vue

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Publish from 'Components/elements/publish/Publish.vue';
import callErrorModal from '@/helpers/callErrorModal';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.directive('tooltip',  () => {});

jest.mock('@/helpers/callErrorModal', () => jest.fn());

describe('Publish.vue', () => {
  const fetchPost = jest.fn();
  const updatePost = jest.fn();
  const sendPost = jest.fn();
  const fetchData = jest.fn();
  const submit = jest.fn();
  const config = {
    localVue,
    mocks: {
      $router: {
        push: jest.fn(),
      },
      $Progress: {
        finish: () => {},
        fail: () => {},
      },
      $modal: {
        show: jest.fn(),
      },
      $v: {
        $touch: () => {},
        title: {
          $error: () => {},
          $invalid: false,
          $touch: () => {},
        },
        code: {
          $error: () => {},
          $invalid: true,
          $touch: () => {},
        },
        category: {
          $error: () => {},
          $invalid: false,
          $touch: () => {},
        },
        detailText: {
          $error: () => {},
          $invalid: false,
          $touch: () => {},
        },
      },
    },
  };

  let storeConfig = {
    state: {
      user: {
        id: '1a',
        name: 'test',
        post: {},
      },
    },
    actions: {
      fetchPost: jest.fn(),
      sendPost: jest.fn(),
      updatePost: jest.fn(),
    },
  };
  let store = new Vuex.Store(storeConfig);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('component shallow rendering', () => {
    it('should match a snapshot - post state', () => {
      const wrapper = shallowMount(Publish, {...config, store});

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('should match a snapshot - edit state', () => {
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        fetchData,
      }});

      wrapper.setProps({ postCode: 'bar' });

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('lifecycle-driven methods calls', () => {
    it('should call fetchData() on a created hook and edit state', () => {
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        fetchData,
      }});

      wrapper.setProps({ postCode: 'bar' });

      expect(fetchData).toHaveBeenCalledTimes(1);
      expect(fetchData).toHaveBeenCalledWith('bar');
    });

    it('should call error modal on fetchData() if get error', async () => {
      const fetchPost = jest.fn().mockRejectedValue(new Error('test'))
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        fetchPost,
      }});

      await wrapper.setProps({ postCode: 'bar' });
      await wrapper.vm.$nextTick();

      expect(callErrorModal).toHaveBeenCalledTimes(1);
    });
  });

  describe("custom actions", () => {
    it('should call sendPost() on submit() if values are valid and state is post', () => {
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        sendPost,
      }});
      const el = wrapper.find('.submit');

      wrapper.vm.submit();

      expect(sendPost).toHaveBeenCalledTimes(1);
    });

    it('should call updatePost() on submit() if values are valid and state is edit', () => {
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        updatePost,
      }});

      wrapper.setProps({ postCode: 'bar' });
      wrapper.vm.submit();

      expect(updatePost).toHaveBeenCalledTimes(1);
    });

    it('should call modal on submit() if get response', async () => {
      const sendPost = jest.fn().mockResolvedValue({
        data: {
          message: 'test',
        },
      });
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        sendPost,
      }});

      await wrapper.vm.submit();

      expect(wrapper.vm.$modal.show).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$modal.show).toHaveBeenCalledWith('response', {
        message: 'test'
      });
    });

    it('should call error modal on submit() if get error', async () => {
      const sendPost = jest.fn().mockRejectedValue(new Error('test'))
      const wrapper = shallowMount(Publish, {...config, store, methods: {
        sendPost,
      }});

      await wrapper.vm.submit();

      expect(callErrorModal).toHaveBeenCalledTimes(1);
    });

    // it('should ', async () => {
    //   const sendPost = jest.fn().mockRejectedValue(new Error('test'))
    //   const wrapper = shallowMount(Publish, {...config, store, methods: {
    //     sendPost,
    //   }});
    //
    //   await wrapper.vm.submit();
    //
    //   expect(callErrorModal).toHaveBeenCalledTimes(1);
    // });
  });
});
