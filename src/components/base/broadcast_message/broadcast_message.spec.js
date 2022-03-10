import { shallowMount } from '@vue/test-utils';
import GlBroadcastMessage from './broadcast_message.vue';

describe('Broadcast message component', () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(GlBroadcastMessage, options);
  };

  const findDismissButton = () => wrapper.findComponent({ ref: 'dismiss' });

  beforeEach(() => {
    createComponent({ slots: { default: 'some message' } });
  });

  it('clicking on dismiss button emits a dismiss event', () => {
    findDismissButton().vm.$emit('click');

    expect(wrapper.emitted('dismiss')).toHaveLength(1);
  });
});
