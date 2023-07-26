import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { computePosition, autoUpdate, offset, autoPlacement } from '@floating-ui/dom';
import {
  ARROW_DOWN,
  GL_DROPDOWN_FOCUS_CONTENT,
  GL_DROPDOWN_HIDDEN,
  GL_DROPDOWN_SHOWN,
  GL_DROPDOWN_CONTENTS_CLASS,
} from '../constants';
import { waitForAnimationFrame } from '../../../../utils/test_utils';
import { DEFAULT_OFFSET, FIXED_WIDTH_CLASS_SMALL, FIXED_WIDTH_CLASS_LARGE } from './constants';
import GlBaseDropdown from './base_dropdown.vue';

jest.mock('@floating-ui/dom');
const mockStopAutoUpdate = jest.fn();
offset.mockImplementation((options) => options);
autoPlacement.mockImplementation((options) => options);

const DEFAULT_BTN_TOGGLE_CLASSES = [
  'btn',
  'btn-default',
  'btn-md',
  'gl-button',
  'gl-new-dropdown-toggle',
];

describe('base dropdown', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlBaseDropdown, {
      propsData: {
        toggleId: 'dropdown-toggle-btn-1',
        ...propsData,
      },
      slots: {
        default: `<div class="${GL_DROPDOWN_CONTENTS_CLASS}" />`,
        ...slots,
      },
      attachTo: document.body,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    autoUpdate.mockImplementation(() => {
      return mockStopAutoUpdate;
    });
    computePosition.mockImplementation(() => new Promise(() => {}));
  });

  const findDefaultDropdownToggle = () => wrapper.find('.btn.gl-new-dropdown-toggle');
  const findCustomDropdownToggle = () => wrapper.find('.gl-new-dropdown-custom-toggle');
  const findDropdownToggleText = () => findDefaultDropdownToggle().find('.gl-button-text');
  const findDropdownMenu = () => wrapper.find('.gl-new-dropdown-panel');

  describe('Floating UI instance', () => {
    it("starts Floating UI's when opening the dropdown", async () => {
      buildWrapper();
      await findDefaultDropdownToggle().trigger('click');

      expect(autoUpdate).toHaveBeenCalledTimes(1);
    });

    it('stops Floating UI when closing the dropdown', async () => {
      buildWrapper();
      await findDefaultDropdownToggle().trigger('click');
      await findDefaultDropdownToggle().trigger('click');

      expect(autoUpdate).toHaveBeenCalledTimes(1);
      expect(mockStopAutoUpdate).toHaveBeenCalledTimes(1);
    });

    it('restarts Floating UI when reopening the dropdown', async () => {
      buildWrapper();
      await findDefaultDropdownToggle().trigger('click');
      await findDefaultDropdownToggle().trigger('click');
      await findDefaultDropdownToggle().trigger('click');

      expect(autoUpdate).toHaveBeenCalledTimes(2);
      expect(mockStopAutoUpdate).toHaveBeenCalledTimes(1);
    });

    it("stops Floating UI's auto updates on destroy", async () => {
      buildWrapper();
      await findDefaultDropdownToggle().trigger('click');
      wrapper.destroy();

      expect(mockStopAutoUpdate).toHaveBeenCalled();
    });

    describe('computePosition', () => {
      beforeEach(() => {
        autoUpdate.mockImplementation(jest.requireActual('@floating-ui/dom').autoUpdate);
      });

      it('initializes Floating UI with reference and floating elements and config for left-aligned menu', async () => {
        buildWrapper();
        await findDefaultDropdownToggle().trigger('click');

        expect(computePosition).toHaveBeenCalledWith(
          findDefaultDropdownToggle().element,
          findDropdownMenu().element,
          {
            placement: 'bottom-start',
            strategy: 'absolute',
            middleware: [
              offset({ mainAxis: DEFAULT_OFFSET }),
              autoPlacement({
                allowedPlacements: ['bottom-start', 'top-start', 'bottom-end', 'top-end'],
              }),
            ],
          }
        );
      });

      it('initializes Floating UI with reference and floating elements and config for center-aligned menu', async () => {
        buildWrapper({ placement: 'center' });
        await findDefaultDropdownToggle().trigger('click');

        expect(computePosition).toHaveBeenCalledWith(
          findDefaultDropdownToggle().element,
          findDropdownMenu().element,
          {
            placement: 'bottom',
            strategy: 'absolute',
            middleware: [
              offset({ mainAxis: DEFAULT_OFFSET }),
              autoPlacement({
                allowedPlacements: ['bottom', 'top'],
              }),
            ],
          }
        );
      });

      it('initializes Floating UI with reference and floating elements and config for right-aligned menu', async () => {
        buildWrapper({ placement: 'right' });
        await findDefaultDropdownToggle().trigger('click');

        expect(computePosition).toHaveBeenCalledWith(
          findDefaultDropdownToggle().element,
          findDropdownMenu().element,
          {
            placement: 'bottom-end',
            strategy: 'absolute',
            middleware: [
              offset({ mainAxis: DEFAULT_OFFSET }),
              autoPlacement({
                allowedPlacements: ['bottom-start', 'top-start', 'bottom-end', 'top-end'],
              }),
            ],
          }
        );
      });

      it("passes custom offset to Floating UI's middleware", async () => {
        const customOffset = { mainAxis: 10, crossAxis: 40 };
        buildWrapper({
          placement: 'right',
          offset: customOffset,
        });
        await findDefaultDropdownToggle().trigger('click');

        expect(computePosition).toHaveBeenCalledWith(
          findDefaultDropdownToggle().element,
          findDropdownMenu().element,
          {
            placement: 'bottom-end',
            strategy: 'absolute',
            middleware: [offset(customOffset), autoPlacement(expect.any(Object))],
          }
        );
      });

      describe('positioningStrategy', () => {
        it('uses the absolute positioning strategy by default', async () => {
          buildWrapper();

          await findDefaultDropdownToggle().trigger('click');
          await nextTick();

          expect(computePosition).toHaveBeenCalledWith(
            findDefaultDropdownToggle().element,
            findDropdownMenu().element,
            expect.objectContaining({
              strategy: 'absolute',
            })
          );
          expect(findDropdownMenu().classes()).toContain('gl-absolute');
        });

        it('applies the fixed positioning strategy properly', async () => {
          buildWrapper({
            positioningStrategy: 'fixed',
          });

          await findDefaultDropdownToggle().trigger('click');
          await nextTick();

          expect(computePosition).toHaveBeenCalledWith(
            findDefaultDropdownToggle().element,
            findDropdownMenu().element,
            expect.objectContaining({
              strategy: 'fixed',
            })
          );
          expect(findDropdownMenu().classes()).toContain('gl-fixed');
        });
      });
    });
  });

  describe('renders content to the default slot', () => {
    const defaultContent = 'Some content here';
    const slots = { default: defaultContent };

    it('renders the content', () => {
      buildWrapper({}, slots);
      expect(wrapper.find('.gl-new-dropdown-inner').html()).toContain(defaultContent);
    });
  });

  describe.each`
    props                                                            | toggleClasses
    ${{}}                                                            | ${[]}
    ${{ toggleText: 'toggleText' }}                                  | ${[]}
    ${{ icon: 'close' }}                                             | ${['gl-new-dropdown-icon-only']}
    ${{ icon: 'close', toggleText: 'toggleText', textSrOnly: true }} | ${['gl-new-dropdown-icon-only']}
    ${{ icon: 'close', textSrOnly: true }}                           | ${['gl-new-dropdown-icon-only']}
    ${{ toggleText: 'toggleText', noCaret: true }}                   | ${['gl-new-dropdown-toggle-no-caret']}
  `('dropdown with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await nextTick();
    });

    it(`sets toggle button classes to '${toggleClasses}'`, () => {
      const classes = findDefaultDropdownToggle().classes().sort();

      expect(classes).toEqual([...DEFAULT_BTN_TOGGLE_CLASSES, ...toggleClasses].sort());
    });
  });

  describe.each`
    toggleClass             | expectedClasses                                      | type
    ${'my-class'}           | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'my-class']}       | ${'string'}
    ${{ 'my-class': true }} | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'my-class']}       | ${'object'}
    ${['cls-1', 'cls-2']}   | ${[...DEFAULT_BTN_TOGGLE_CLASSES, 'cls-1', 'cls-2']} | ${'array'}
    ${null}                 | ${[...DEFAULT_BTN_TOGGLE_CLASSES]}                   | ${'null'}
  `('with toggle classes', ({ toggleClass, expectedClasses, type }) => {
    beforeEach(async () => {
      buildWrapper({ toggleClass });

      await nextTick();
    });

    it(`class is inherited from toggle class of type ${type}`, () => {
      expect(findDefaultDropdownToggle().classes().sort()).toEqual(
        expect.arrayContaining(expectedClasses.sort())
      );
    });
  });

  describe('block prop', () => {
    it('does not apply block style if false', () => {
      buildWrapper({ block: false });

      expect(wrapper.classes()).not.toContain('gl-w-full');
      expect(findDropdownToggleText().classes()).not.toContain('gl-w-full');
    });

    it('applies block style if true', () => {
      buildWrapper({ block: true });

      expect(wrapper.classes()).toContain('gl-display-block!');
      expect(findDropdownToggleText().classes()).toContain('gl-w-full');
      expect(findDefaultDropdownToggle().props('block')).toBe(true);
    });
  });

  describe('default toggle', () => {
    beforeEach(() => {
      buildWrapper();
    });

    it('should open the menu on click but keep focus on toggle', async () => {
      const toggle = findDefaultDropdownToggle();
      const menu = findDropdownMenu();

      toggle.element.focus();
      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(true);
      expect(toggle.attributes('aria-expanded')).toBe('true');
      expect(toggle.element).toHaveFocus();

      // close menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN)).toHaveLength(1);
      expect(toggle.element).toHaveFocus();
    });

    it('should emit `GL_DROPDOWN_FOCUS_CONTENT` event on `ARROW_DOWN`', () => {
      findDefaultDropdownToggle().trigger('keydown', { code: ARROW_DOWN });
      expect(wrapper.emitted(GL_DROPDOWN_FOCUS_CONTENT)).toHaveLength(1);
    });

    it('should close menu on Escape and focus toggle', async () => {
      const toggle = findDefaultDropdownToggle();
      const menu = findDropdownMenu();

      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(true);
      expect(toggle.attributes('aria-expanded')).toBe('true');

      // close menu clicking toggle btn
      menu.element.focus();
      await menu.trigger('keydown.esc');
      expect(menu.classes('gl-display-block!')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN)).toHaveLength(1);
      expect(toggle.element).toHaveFocus();
    });
  });

  describe('Custom toggle', () => {
    const customToggleTestId = 'custom-toggle';
    const toggleContent = `<button data-testid="${customToggleTestId}">Custom toggle</button>`;
    const findFirstToggleElement = () =>
      findCustomDropdownToggle().find(`[data-testid="${customToggleTestId}"]`);

    beforeEach(() => {
      const slots = { toggle: toggleContent };
      buildWrapper({}, slots);
    });

    it('does not render default toggle button', () => {
      expect(findDefaultDropdownToggle().exists()).toBe(false);
    });

    it('renders the custom toggle instead', () => {
      expect(findCustomDropdownToggle().exists()).toBe(true);
    });

    it('renders provided via slot content as custom toggle', () => {
      expect(findCustomDropdownToggle().html()).toContain(toggleContent);
    });

    describe('toggle visibility', () => {
      beforeEach(() => {
        autoUpdate.mockImplementation(jest.requireActual('@floating-ui/dom').autoUpdate);
        computePosition.mockImplementation(() => Promise.resolve);
      });

      it('should toggle menu visibility on toggle click', async () => {
        const toggle = findCustomDropdownToggle();
        const firstToggleChild = findFirstToggleElement();
        const menu = findDropdownMenu();
        // open menu clicking toggle btn
        await toggle.trigger('click');
        expect(menu.classes('gl-display-block!')).toBe(true);
        expect(firstToggleChild.attributes('aria-expanded')).toBe('true');
        await waitForAnimationFrame();
        expect(wrapper.emitted(GL_DROPDOWN_SHOWN)).toHaveLength(1);

        // close menu clicking toggle btn again
        await toggle.trigger('click');
        expect(menu.classes('gl-display-block!')).toBe(false);
        expect(firstToggleChild.attributes('aria-expanded')).toBe('false');
        expect(wrapper.emitted(GL_DROPDOWN_HIDDEN)).toHaveLength(1);
      });

      it('should close the menu when Escape is pressed inside menu and focus first child in the toggle', async () => {
        const toggle = findCustomDropdownToggle();
        const firstToggleChild = findFirstToggleElement();
        const menu = findDropdownMenu();
        // open menu clicking toggle btn
        await toggle.trigger('click');
        expect(menu.classes('gl-display-block!')).toBe(true);

        // close menu pressing ESC on it
        await menu.trigger('keydown.esc');
        expect(menu.classes('gl-display-block!')).toBe(false);
        expect(firstToggleChild.attributes('aria-expanded')).toBe('false');
        expect(wrapper.emitted(GL_DROPDOWN_HIDDEN)).toHaveLength(1);
        expect(toggle.find(`[data-testid="${customToggleTestId}"]`).element).toHaveFocus();
      });
    });

    it('should emit `GL_DROPDOWN_FOCUS_CONTENT` event on `ARROW_DOWN`', () => {
      const toggle = findCustomDropdownToggle();
      toggle.trigger('keydown', { code: ARROW_DOWN });
      expect(wrapper.emitted(GL_DROPDOWN_FOCUS_CONTENT)).toHaveLength(1);
    });
  });

  describe('fluid width', () => {
    it('uses a fixed width by default', () => {
      buildWrapper();

      expect(findDropdownMenu().classes()).toContain(FIXED_WIDTH_CLASS_SMALL);
    });

    it('drops the fixed width when `fluidWidth` is `true`', () => {
      buildWrapper({ fluidWidth: true });

      expect(findDropdownMenu().classes()).not.toContain(FIXED_WIDTH_CLASS_SMALL);
    });
  });

  describe('width prop', () => {
    it('adds the FIXED_WIDTH_CLASS_SMALL when not set', () => {
      buildWrapper();

      expect(findDropdownMenu().classes()).toContain(FIXED_WIDTH_CLASS_SMALL);
      expect(findDropdownMenu().classes()).not.toContain(FIXED_WIDTH_CLASS_LARGE);
    });

    it('adds the FIXED_WIDTH_CLASS_LARGE when set to large', () => {
      buildWrapper({ width: 'lg' });

      expect(findDropdownMenu().classes()).toContain(FIXED_WIDTH_CLASS_LARGE);
      expect(findDropdownMenu().classes()).not.toContain(FIXED_WIDTH_CLASS_SMALL);
    });
  });
});
