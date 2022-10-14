import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { GL_DROPDOWN_HIDDEN, GL_DROPDOWN_SHOWN, POPPER_CONFIG } from '../constants';
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
  'dropdown-toggle',
  'gl-dropdown-toggle',
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

  const findDropdownToggle = () => wrapper.find('.btn.gl-dropdown-toggle');
  const findDropdownMenu = () => wrapper.find('.dropdown-menu');

  describe('popper.js instance', () => {
    it('should initialize popper.js instance with toggle and menu elements and config for left-aligned menu', async () => {
      await buildWrapper();
      expect(mockCreatePopper).toHaveBeenCalledWith(
        findDropdownToggle().element,
        findDropdownMenu().element,
        { ...POPPER_CONFIG, placement: 'bottom-start' }
      );
    });

    it('should initialize popper.js instance with toggle and menu elements and config for right-aligned menu', async () => {
      await buildWrapper({ right: true });
      expect(mockCreatePopper).toHaveBeenCalledWith(
        findDropdownToggle().element,
        findDropdownMenu().element,
        { ...POPPER_CONFIG, placement: 'bottom-end' }
      );
    });

    it('should update popper instance when component is updated', async () => {
      await buildWrapper();
      await findDropdownToggle().trigger('click');
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
    ${{ toggleText: 'toggleText', icon: 'close' }}                   | ${['dropdown-icon-text']}
    ${{ icon: 'close' }}                                             | ${['dropdown-icon-only']}
    ${{ icon: 'close', toggleText: 'toggleText', textSrOnly: true }} | ${['dropdown-icon-only']}
    ${{ icon: 'close', textSrOnly: true }}                           | ${['dropdown-icon-only']}
    ${{ toggleText: 'toggleText', noCaret: true }}                   | ${['dropdown-toggle-no-caret']}
  `('dropdown with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await nextTick();
    });

    it(`sets toggle button classes to '${toggleClasses}'`, () => {
      const classes = findDropdownToggle().classes().sort();

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
      expect(findDropdownToggle().classes().sort()).toEqual(
        expect.arrayContaining(expectedClasses.sort())
      );
    });
  });

  describe('toggle visibility', () => {
    beforeEach(() => {
      buildWrapper();
    });

    it('should toggle menu visibility on toggle button click', async () => {
      const toggle = findDropdownToggle();
      const menu = findDropdownMenu();

      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('show')).toBe(true);
      expect(toggle.attributes('aria-expanded')).toBe('true');
      expect(wrapper.emitted(GL_DROPDOWN_SHOWN).length).toBe(1);

      // close menu clicking toggle btn again
      await toggle.trigger('click');
      expect(menu.classes('show')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
    });

    it('should close the menu when Escape is pressed inside menu and focus toggle', async () => {
      const toggle = findDropdownToggle();
      const menu = findDropdownMenu();

      // open menu clicking toggle btn
      await toggle.trigger('click');
      expect(menu.classes('show')).toBe(true);

      // close menu pressing ESC on it
      await menu.trigger('keydown.esc');
      expect(menu.classes('show')).toBe(false);
      expect(toggle.attributes('aria-expanded')).toBeUndefined();
      expect(wrapper.emitted(GL_DROPDOWN_HIDDEN).length).toBe(1);
      expect(toggle.element).toHaveFocus();
    });
  });
});
