import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { ENTER, GL_DROPDOWN_HIDDEN, GL_DROPDOWN_SHOWN, POPPER_CONFIG } from '../constants';
import GlBaseDropdown from './base_dropdown.vue';

const destroyPopper = jest.fn();
const updatePopper = jest.fn();
const mockCreatePopper = jest.fn().mockImplementation(() => ({
  destroy: destroyPopper,
  update: updatePopper,
}));

jest.mock('@popperjs/core', () => ({
  createPopper: (...args) => mockCreatePopper(...args),
}));

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
      slots,
      attachTo: document.body,
    });
    return nextTick();
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const findDefaultDropdownToggle = () => wrapper.find('.btn.gl-new-dropdown-toggle');
  const findCustomDropdownToggle = () => wrapper.find('.gl-new-dropdown-custom-toggle');
  const findDropdownToggleText = () => findDefaultDropdownToggle().find('.gl-button-text');
  const findDropdownMenu = () => wrapper.find('.gl-new-dropdown-panel');

  describe('popper.js instance', () => {
    it('should initialize popper.js instance with toggle and menu elements and config for left-aligned menu', async () => {
      await buildWrapper();
      expect(mockCreatePopper).toHaveBeenCalledWith(
        findDefaultDropdownToggle().element,
        findDropdownMenu().element,
        { ...POPPER_CONFIG, placement: 'bottom-start' }
      );
    });

    it('should initialize popper.js instance with toggle and menu elements and config for center-aligned menu', async () => {
      await buildWrapper({ placement: 'center' });
      expect(mockCreatePopper).toHaveBeenCalledWith(
        findDefaultDropdownToggle().element,
        findDropdownMenu().element,
        { ...POPPER_CONFIG, placement: 'bottom' }
      );
    });

    it('should initialize popper.js instance with toggle and menu elements and config for right-aligned menu', async () => {
      await buildWrapper({ placement: 'right' });
      expect(mockCreatePopper).toHaveBeenCalledWith(
        findDefaultDropdownToggle().element,
        findDropdownMenu().element,
        { ...POPPER_CONFIG, placement: 'bottom-end' }
      );
    });

    it('should update popper instance when component is updated', async () => {
      await buildWrapper();
      await findDefaultDropdownToggle().trigger('click');
      await wrapper.setProps({ category: 'tertiary' });
      expect(updatePopper).toHaveBeenCalled();
    });

    it('should destroy popper instance when component is destroyed', async () => {
      await buildWrapper();
      wrapper.destroy();
      expect(destroyPopper).toHaveBeenCalled();
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

  describe('toggle visibility', () => {
    beforeEach(() => {
      buildWrapper();
    });

    it('should toggle menu visibility on toggle button click', async () => {
      const toggle = findDefaultDropdownToggle();
      const menu = findDropdownMenu();

      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(true);
      expect(toggle.attributes('aria-expanded')).toBe('true');
      await nextTick();
      expect(wrapper.emitted(GL_DROPDOWN_SHOWN).length).toBe(1);

      // close menu clicking toggle btn again
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
    });

    it('should close the menu when Escape is pressed inside menu and focus toggle', async () => {
      const toggle = findDefaultDropdownToggle();
      const menu = findDropdownMenu();

      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('gl-display-block!')).toBe(true);

      // close menu pressing ESC on it
      await menu.trigger('keydown.esc');
      expect(menu.classes('gl-display-block!')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
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
      it('should toggle menu visibility on toggle button ENTER', async () => {
        const toggle = findCustomDropdownToggle();
        const firstToggleChild = findFirstToggleElement();
        const menu = findDropdownMenu();
        // open menu clicking toggle btn
        await toggle.trigger('keydown', { code: ENTER });
        expect(menu.classes('gl-display-block!')).toBe(true);
        expect(firstToggleChild.attributes('aria-expanded')).toBe('true');
        await nextTick();
        expect(wrapper.emitted(GL_DROPDOWN_SHOWN).length).toBe(1);

        // close menu clicking toggle btn again
        await toggle.trigger('keydown', { code: ENTER });
        expect(menu.classes('gl-display-block!')).toBe(false);
        expect(firstToggleChild.attributes('aria-expanded')).toBe('false');
        expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
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
        expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
        expect(toggle.find(`[data-testid="${customToggleTestId}"]`).element).toHaveFocus();
      });
    });
  });
});
