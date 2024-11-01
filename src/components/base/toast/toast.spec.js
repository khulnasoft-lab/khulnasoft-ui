import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { waitForAnimationFrame } from '../../../utils/test_utils';
import GlToast from './toast';

Vue.use(GlToast);
const Component = {
  template: `<div />`,
};

describe('GlToast', () => {
  let wrapper;

  const findToasts = () => document.body.querySelectorAll('.gl-toast');

  beforeEach(() => {
    wrapper = mount(Component);
  });

  afterEach(async () => {
    await waitForAnimationFrame();
    await waitForAnimationFrame();
    await waitForAnimationFrame();
    findToasts().forEach((toast) => toast.remove());
  });

  it('attaches $toast property', () => {
    expect(wrapper.vm.$toast).toEqual({
      show: expect.any(Function),
    });
  });

  it('shows a toast', async () => {
    expect(findToasts()).toHaveLength(0);

    const toast = wrapper.vm.$toast.show('foo');
    expect(toast).toEqual({
      id: expect.any(String),
      hide: expect.any(Function),
    });

    await waitForAnimationFrame();
    await waitForAnimationFrame();
    await waitForAnimationFrame();

    expect(findToasts()).toHaveLength(1);
  });

  it('closes the toast when clicking on the close button', async () => {
    wrapper.vm.$toast.show('foo');
    await waitForAnimationFrame();
    await waitForAnimationFrame();
    await waitForAnimationFrame();

    const toasts = findToasts();
    expect(toasts).toHaveLength(1);

    const closeButton = toasts[0].querySelector('.gl-toast-close-button');
    expect(closeButton).not.toBeNull();

    closeButton.click();
    await waitForAnimationFrame();
    await waitForAnimationFrame();

    expect(findToasts()).toHaveLength(0);
  });

  describe('onComplete callback', () => {
    let onCompleteSpy;
    let toast;

    beforeEach(() => {
      onCompleteSpy = jest.fn();

      toast = wrapper.vm.$toast.show('foo', {
        onComplete: onCompleteSpy,
      });
    });

    it('calls onComplete callback only when matching toast hides', () => {
      expect(onCompleteSpy).not.toHaveBeenCalled();

      // Pretend some other toast was hidden.
      wrapper.vm.$root.$emit('bv::toast:hidden', { componentId: 'some other toast' });
      expect(onCompleteSpy).not.toHaveBeenCalled();

      // Pretend our toast was hidden.
      wrapper.vm.$root.$emit('bv::toast:hidden', { componentId: toast.id });
      expect(onCompleteSpy).toHaveBeenCalledTimes(1);
    });

    it('unregisters global listener when toast is hidden', () => {
      expect(onCompleteSpy).not.toHaveBeenCalled();

      // Pretend the toast was hidden. Can't seem to do this directly in jsdom,
      // so fake it by emitting the event we listen for.
      const event = { componentId: toast.id };
      wrapper.vm.$root.$emit('bv::toast:hidden', event);
      expect(onCompleteSpy).toHaveBeenCalledTimes(1);

      // This event won't fire more than once in practice, as once the toast is
      // hidden it'll be destroyed and won't show again. This is here to
      // indirectly test that the listener was removed when the toast is
      // hidden the first time.
      wrapper.vm.$root.$emit('bv::toast:hidden', event);
      expect(onCompleteSpy).toHaveBeenCalledTimes(1);
    });
  });
});
