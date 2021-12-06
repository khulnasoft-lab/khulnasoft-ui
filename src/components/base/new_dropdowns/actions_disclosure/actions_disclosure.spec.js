import { mount } from '@vue/test-utils';
import { dropdownVariantOptions } from '../../../../utils/constants';
import GlLoadingIcon from '../../loading_icon/loading_icon.vue';
import GlActionsDisclosure from './actions_disclosure.vue';
import GlActionsDisclosureItem from './actions_disclosure_item.vue';

const DEFAULT_BTN_TOGGLE_CLASSES = [
  'btn',
  'btn-default',
  'btn-md',
  'gl-button',
  'dropdown-toggle',
  'gl-dropdown-toggle',
];

describe('actions-disclosure', () => {
  let wrapper;

  const buildWrapper = (propsData, slots = {}) => {
    wrapper = mount(GlActionsDisclosure, {
      propsData,
      slots,
      stubs: {
        GlActionsDisclosureItem,
      },
    });
  };

  const findDisclosureToggle = () => wrapper.find('.btn.gl-dropdown-toggle');
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findIcon = () => wrapper.find('.dropdown-icon');
  const findCaret = () => wrapper.find('.dropdown-chevron');
  const findItems = () => wrapper.findAllComponents(GlActionsDisclosureItem);

  it('renders when text is null', () => {
    buildWrapper({ text: null });

    expect(wrapper.exists()).toBe(true);
  });

  describe('disabled state', () => {
    it('is not disabled by default', () => {
      buildWrapper({});

      expect(findDisclosureToggle().attributes('disabled')).toBe(undefined);
    });

    it('can be disabled', () => {
      buildWrapper({ disabled: true });

      expect(findDisclosureToggle().attributes('disabled')).toBe('disabled');
    });

    it('can be disabled via the loading prop', () => {
      buildWrapper({ loading: true });

      expect(findDisclosureToggle().attributes('disabled')).toBe('disabled');
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
  `('disclosure with props $props', ({ props, toggleClasses }) => {
    beforeEach(async () => {
      buildWrapper(props);

      await wrapper.vm.$nextTick();
    });

    it('sets toggle button classes', () => {
      const classes = findDisclosureToggle().classes().sort();

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

      await wrapper.vm.$nextTick();
    });

    it(`class is inherited from toggle class of type ${type}`, () => {
      expect(findDisclosureToggle().classes().sort()).toEqual(
        expect.arrayContaining(expectedClasses.sort())
      );
    });
  });

  describe('secondary category', () => {
    it.each(Object.keys(dropdownVariantOptions))('applies %s variant class properly', (variant) => {
      buildWrapper({ category: 'secondary', variant });

      expect(findDisclosureToggle().classes()).toContain(`btn-${variant}-secondary`);
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

  describe('button content templates', () => {
    const mockComponent = {
      template: '<span>mock</span>',
    };

    it('shows the button text template with the default loading spinner, icon, and disclosure caret', () => {
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
