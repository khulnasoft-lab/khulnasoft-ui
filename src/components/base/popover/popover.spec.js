import { shallowMount } from '@vue/test-utils';
import { tooltipActionEvents, popoverPlacements, ESC_KEY_CODE } from '../../../utils/constants';
import GlPopover from './popover.vue';

describe('GlPopover', () => {
  let wrapper;
  let doCloseMock;
  let BPopoverStub;

  beforeEach(() => {
    doCloseMock = jest.fn();
    BPopoverStub = {
      template: `
      <div>
        <slot name="title" />
      </div>
    `,
      methods: {
        doClose: doCloseMock,
      },
      props: ['customClass'],
    };
  });

  const createWrapper = (props, { stubs = {}, listeners = {} } = {}) => {
    wrapper = shallowMount(GlPopover, {
      propsData: {
        target: document.body,
        ...props,
      },
      stubs,
      listeners,
    });
  };

  const findBVPopover = () => wrapper.findComponent({ ref: 'bPopover' });
  const findCloseButton = () => findBVPopover().find('[data-testid="close-button"]');

  const clickESC = () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', keyCode: ESC_KEY_CODE }));
  };

  it.each(tooltipActionEvents)('passes through the %s event to the bvPopover instance', (event) => {
    createWrapper();
    wrapper.vm.$emit(event);

    expect(findBVPopover().emitted(event)).toHaveLength(1);
  });

  it('does not have the `has-close-button` class where there is no close button', () => {
    createWrapper();

    expect(findBVPopover().props('customClass')).not.toContain('has-close-button');
  });

  describe('triggers', () => {
    it('defaults to "hover focus" for triggers', () => {
      createWrapper();

      expect(findBVPopover().exists()).toBe(true);
    });

    it('uses custom triggers if provided', () => {
      const triggers = 'manual';
      createWrapper({ triggers });

      expect(findBVPopover().props('triggers')).toBe(triggers);
    });
  });

  describe('title slot', () => {
    it('renders title slot content', () => {
      const title = 'Popover title';
      createWrapper({ title });

      expect(findBVPopover().props('title')).toBe(title);
    });
  });

  describe('placement', () => {
    it(`uses "${popoverPlacements.top}" placement by default`, () => {
      createWrapper();

      expect(findBVPopover().props('placement')).toBe(popoverPlacements.top);
    });

    it('uses a defined placement', () => {
      createWrapper({ placement: popoverPlacements.right });

      expect(findBVPopover().props('placement')).toBe(popoverPlacements.right);
    });
  });

  describe('close button', () => {
    const createWrapperWithCloseButton = (title = '') => {
      createWrapper({ showCloseButton: true, title }, { stubs: { BPopover: BPopoverStub } });
    };

    describe('when there is no title', () => {
      beforeEach(() => {
        createWrapperWithCloseButton();
      });

      it('renders a close button', () => {
        expect(findCloseButton().exists()).toBe(true);
      });

      it('does not have the `has-title` class, and the button floats to the right', () => {
        expect(findBVPopover().props('customClass')).toBe('gl-popover has-close-button');
        expect(findCloseButton().classes()).toContain('gl-float-right');
      });

      it("calls BPopover's doClose method when clicking on the close button", () => {
        findCloseButton().vm.$emit('click');

        expect(doCloseMock).toHaveBeenCalled();
      });

      it('emits close-button-clicked event when clicking on the close button', () => {
        findCloseButton().vm.$emit('click');

        expect(wrapper.emitted('close-button-clicked')).toHaveLength(1);
      });
    });

    describe('when there is a title', () => {
      beforeEach(() => {
        createWrapperWithCloseButton('Popover title');
      });

      it('has the `has-title` class, and the button does not float to the right', () => {
        expect(findBVPopover().props('customClass')).toBe('gl-popover has-title has-close-button');
        expect(findCloseButton().classes()).not.toContain('gl-float-right');
      });
    });
  });

  describe('when shown', () => {
    let showSpy;
    let hideSpy;

    beforeEach(async () => {
      showSpy = jest.fn();
      hideSpy = jest.fn();

      createWrapper(
        {},
        { listeners: { show: showSpy, hide: hideSpy }, stubs: { BPopover: BPopoverStub } }
      );

      findBVPopover().vm.$emit('show');
    });

    it('triggers show spy', () => {
      expect(showSpy).toHaveBeenCalledTimes(1);
    });

    it('does not trigger hide spy', () => {
      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('does not trigger doClose', () => {
      expect(doCloseMock).not.toHaveBeenCalled();
    });

    it('when esc is clicked, hides popover', async () => {
      clickESC();

      expect(doCloseMock).toHaveBeenCalledTimes(1);
    });

    it('when esc is clicked after destroy, does nothing', async () => {
      wrapper.destroy();
      clickESC();

      expect(doCloseMock).not.toHaveBeenCalled();
    });

    it('when esc is clicked after hide, does nothing', async () => {
      findBVPopover().vm.$emit('hide');
      clickESC();

      expect(doCloseMock).not.toHaveBeenCalled();
    });
  });
});
