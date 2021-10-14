import { createLocalVue, mount } from '@vue/test-utils';
import GlToast from './toast';

const localVue = createLocalVue();
localVue.use(GlToast);
const Component = {
  template: `<div />`,
};

const bvToastMock = {
  toast: jest.fn(),
};

describe('GlToast', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      mocks: {
        $bvToast: bvToastMock,
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
    bvToastMock.toast.mockReset();
  });

  it('attaches $toast propery', () => {
    expect(wrapper.vm.$toast).toEqual({
      show: expect.any(Function),
    });
  });

  it('show returns a toast object', () => {
    const toast = wrapper.vm.$toast.show('foo');

    expect(toast).toEqual({
      id: expect.any(String),
      hide: expect.any(Function),
    });
  });

  describe('action as a function', () => {
    const actionText = 'Undo';
    let onClickMock;

    beforeEach(() => {
      onClickMock = jest.fn();
      wrapper.vm.$toast.show('foo', {
        action: {
          text: actionText,
          onClick: onClickMock,
        },
      });
    });

    it('renders the action properly', () => {
      const actionNode = bvToastMock.toast.mock.calls[0][1].title[0];

      expect(actionNode.children[0].text).toBe(actionText);
      expect(actionNode.data).toEqual({
        class: ['gl-toast-action'],
        on: {
          click: expect.any(Function),
        },
        role: 'button',
      });
    });

    it('clicking on the action triggers the passed function', () => {
      bvToastMock.toast.mock.calls[0][1].title[0].data.on.click();
      expect(onClickMock).toHaveBeenCalled();
    });
  });

  describe('action as a link', () => {
    const actionText = 'External link';
    const actionUrl = 'https://gitlab.com';
    const actionTarget = '_blank';

    beforeEach(() => {
      wrapper.vm.$toast.show('foo', {
        action: {
          text: actionText,
          link: {
            href: actionUrl,
            target: actionTarget,
          },
        },
      });
    });

    it('renders the action properly', () => {
      const actionNode = bvToastMock.toast.mock.calls[0][1].title[0];
      const linkComponent = actionNode.componentOptions.children[0];

      expect(linkComponent.text).toBe(actionText);
      expect(actionNode.componentOptions.propsData.target).toBe(actionTarget);
      expect(actionNode.data).toEqual(
        expect.objectContaining({
          attrs: {
            href: actionUrl,
          },
          class: ['gl-toast-action'],
        })
      );
    });
  });
});
