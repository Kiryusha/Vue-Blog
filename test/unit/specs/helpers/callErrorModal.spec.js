// callErrorModal.js

import { createLocalVue } from '@vue/test-utils';
import callErrorModal from '@/helpers/callErrorModal';

const localVue = createLocalVue();

localVue.$Progress = {
  fail: jest.fn(),
};

localVue.$modal = {
  show: jest.fn(),
};

describe('callErrorModal.js', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set modal title to error.message if there is no error.response', () => {
    callErrorModal(localVue, new Error('test'));

    expect(localVue.$Progress.fail).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledWith('response', { message: 'test' });
  });

  it('should set modal title to error.response.data if there is no error.response.data.message', () => {
    callErrorModal(localVue, { response: {
      data: 'test response',
    }});

    expect(localVue.$Progress.fail).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledWith('response', { message: 'test response' });
  });

  it('should set modal title to error.response.data.message if there is it', () => {
    callErrorModal(localVue, { response: {
      data: {
        message: 'test response',
      }
    }});

    expect(localVue.$Progress.fail).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledTimes(1);
    expect(localVue.$modal.show).toHaveBeenCalledWith('response', { message: 'test response' });
  });
});
