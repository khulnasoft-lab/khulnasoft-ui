import { mount } from '@vue/test-utils';
import { dropdownVariantOptions } from '../../../../utils/constants';
import GlLoadingIcon from '../../loading_icon/loading_icon.vue';
import GlDisclosure from './disclosure.vue';
import GlDisclosureItem from './disclosure_item.vue';

const DEFAULT_BTN_TOGGLE_CLASSES = [
  'btn',
  'btn-default',
  'btn-md',
  'gl-button',
  'dropdown-toggle',
  'gl-dropdown-toggle',
];

describe('disclosure', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlDisclosure, {
      propsData,
      slots,
      stubs: {
        GlDisclosureItem,
      },
    });
  };

  afterEach(() => wrapper.destroy());

  const findDropdownToggle = () => wrapper.find('.btn.gl-dropdown-toggle');
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findIcon = () => wrapper.find('.dropdown-icon');
  const findCaret = () => wrapper.find('.dropdown-chevron');
  const findItems = () => wrapper.findAllComponents(GlDisclosureItem);

  it('renders when text is null', () => {
    buildWrapper({ text: null });

    expect(wrapper.exists()).toBe(true);
  });

  describe('disabled state', () => {
    it('is not disabled by default', () => {
      buildWrapper({});

      expect(findDropdownToggle().attributes('disabled')).toBe(undefined);
    });

    it('can be disabled', () => {
      buildWrapper({ disabled: true });

      expect(findDropdownToggle().attributes('disabled')).toBe('disabled');
    });

    it('can be disabled via the loading prop', () => {
      buildWrapper({ loading: true });

      expect(findDropdownToggle().attributes('disabled')).toBe('disabled');
    });
  });

  describe.each`
    props                                                | toggleClasses
    ${{}}                                                | ${[]}
    ${{ text: 'text' }}                                  | ${[]}
    ${{ text: 'text', icon: 'close' }}                   | ${['dropdown-icon-text']}
    ${{ icon: 'close' }}                                 | ${['dropdown-icon-only']}
    ${{ icon: 'close', text: 'text', textSrOnly: true }} | ${['dropdown-icon-only']}
    ${{ icon: 'close', textSrOnly: true }}               | ${['dropdown-icon-only']}
  `('dropdown with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await wrapper.vm.$nextTick();
    });

    it('sets toggle button classes', () => {
      const classes = findDropdownToggle().classes().sort();

      expect(classes).toEqual([...DEFAULT_BTN_TOGGLE_CLASSES, ...toggleClasses].sort());
    });
  });

  describe.each`
    props                              | toggleClasses
    ${{}}                              | ${[]}
    ${{ text: 'text' }}                | ${[]}
    ${{ text: 'text', icon: 'close' }} | ${['dropdown-icon-text']}
    ${{ icon: 'close' }}               | ${['dropdown-icon-only']}
  `('split dropdown with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper({ ...props });

      await wrapper.vm.$nextTick();
    });

    it('updates dropdown toggle button classes', () => {
      const classes = findDropdownToggle().classes().sort();

      expect(classes).toEqual(
        expect.arrayContaining([...DEFAULT_BTN_TOGGLE_CLASSES, ...toggleClasses].sort())
      );
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

      await wrapper.vm.$nextTick();
    });

    it(`class is inherited from toggle class of type ${type}`, () => {
      expect(findDropdownToggle().classes().sort()).toEqual(
        expect.arrayContaining(expectedClasses.sort())
      );
    });
  });

  describe('secondary category', () => {
    it.each(Object.keys(dropdownVariantOptions))('applies %s variant class properly', (variant) => {
      buildWrapper({ category: 'secondary', variant });

      expect(findDropdownToggle().classes()).toContain(`btn-${variant}-secondary`);
    });
  });

  describe('Simple links list', () => {
    const items = [
      { text: 'Link one', href: '#link1' },
      { text: 'Link two', to: '#link2', target: '_blank' },
      { text: 'Link three', href: '#link3' },
    ];

    describe('when the `default` slot content was not provided but items were', () => {
      const slots = { default: '' };
      const props = { items };

      it('renders the list of links based on provided `items`', () => {
        buildWrapper(props, slots);
        expect(findItems()).toHaveLength(items.length);
      });
    });

    describe('when both default slot and items provided', () => {
      const content = 'Default content';
      const slots = { default: content };
      const props = { items };

      it('renders the slot content', () => {
        buildWrapper(props, slots);
        expect(findItems()).toHaveLength(0);
        expect(wrapper.html()).toContain(content);
      });
    });
  });

  describe('when the header slot exists', () => {
    const slots = { header: 'Header Content' };

    it('renders the header', () => {
      buildWrapper({}, slots);
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Header Content');
    });

    it('has the "gl-border-b-0!" class when header border disabled', () => {
      buildWrapper({ hideHeaderBorder: true }, slots);
      expect(wrapper.find('.gl-new-dropdown-header').classes()).toContain('gl-border-b-0!');
    });
  });

  describe('with no header slot exists', () => {
    it('does not render the header', () => {
      buildWrapper();
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeFalsy();
    });

    it('does render the header if headerText provided', () => {
      buildWrapper({ headerText: 'Header Prop Text' });
      expect(wrapper.find('.gl-new-dropdown-header').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Header Prop Text');
    });
  });

  describe('when the footer slot exists', () => {
    const slots = { footer: 'Footer Content' };

    it('renders the footer', () => {
      buildWrapper({}, slots);
      expect(wrapper.find('.gl-new-dropdown-footer').exists()).toBeTruthy();
      expect(wrapper.html()).toContain('Footer Content');
    });
  });

  describe('with no footer slot exists', () => {
    it('does not render the footer', () => {
      buildWrapper();
      expect(wrapper.find('.gl-new-dropdown-footer').exists()).toBeFalsy();
    });
  });

  describe('button content templates', () => {
    const mockComponent = {
      template: '<span>mock</span>',
    };

    it('shows the button text template with the default loading spinner, icon, and dropdown caret', () => {
      const slots = { 'button-text': mockComponent };
      buildWrapper({ loading: true, icon: 'close' }, slots);
      expect(wrapper.findComponent(mockComponent).exists()).toBe(true);
      expect(findLoadingIcon().exists()).toBe(true);
      expect(findIcon().exists()).toBe(true);
      expect(findCaret().exists()).toBe(true);
    });

    it('shows only the button content template', () => {
      const slots = { 'button-content': mockComponent };
      buildWrapper({ loading: true, icon: 'close' }, slots);
      expect(wrapper.findComponent(mockComponent).exists()).toBe(true);
      expect(findLoadingIcon().exists()).toBe(false);
      expect(findIcon().exists()).toBe(false);
      expect(findCaret().exists()).toBe(false);
    });
  });
});
