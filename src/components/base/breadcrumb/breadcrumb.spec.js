import { shallowMount } from '@vue/test-utils';
import { BBreadcrumbItem } from 'bootstrap-vue';
import { createMockDirective } from '~helpers/vue_mock_directive';
import Breadcrumb, { COLLAPSE_AT_SIZE } from './breadcrumb.vue';

describe('Broadcast message component', () => {
  let wrapper;

  const items = [
    { text: 'first_breadcrumb', href: 'http://gitlab.com' },
    {
      text: 'second_breadcrumb',
      to: 'to_value',
    },
    { text: 'third_breadcrumb', href: 'http://about.gitlab.com' },
  ];

  const extraItems = [
    { text: 'fourth_breadcrumb', href: 'http://gitlab.com' },
    {
      text: 'fifth_breadcrumb',
      to: 'to_value',
    },
  ];

  const findAvatarSlot = () => wrapper.find('[data-testid="avatar-slot"]');
  const findSeparatorSlot = () => wrapper.find('[data-testid="separator-slot"]');
  const findBreadcrumbItems = () => wrapper.findAllComponents(BBreadcrumbItem);
  const findAllSeparators = () => wrapper.findAll('[data-testid="separator"]');
  const findCollapsedListExpander = () => wrapper.find('[data-testid="collapsed-expander"]');
  const findExpanderSeparator = () => wrapper.find('[data-testid="expander-separator"]');

  const findVisibleBreadcrumbItems = () =>
    wrapper.findAll('.gl-breadcrumb-item:not(.gl-display-none)');
  const findHiddenBreadcrumbItems = () => wrapper.findAll('.gl-breadcrumb-item.gl-display-none');

  const createComponent = (propsData = { items }) => {
    wrapper = shallowMount(Breadcrumb, {
      propsData,
      slots: {
        avatar: '<div data-testid="avatar-slot"></div>',
        separator: '<div data-testid="separator-slot"></div>',
      },
      directives: { GlTooltip: createMockDirective('gl-tooltip') },
    });

    wrapper.vm.$refs.firstItem = [
      {
        querySelector: () => ({ focus: jest.fn() }),
      },
    ];
  };

  describe('slots', () => {
    it('has an avatar slot', () => {
      createComponent();

      expect(findAvatarSlot().exists()).toBe(true);
    });

    it('has a separator slot', () => {
      createComponent();

      expect(findSeparatorSlot().exists()).toBe(true);
    });

    it('separator slot is shown only with more than one item', () => {
      createComponent({ items: [items[0]] });

      expect(findSeparatorSlot().exists()).toBe(false);
    });
  });

  describe('items', () => {
    it('has one breadcrumb-item for each item in the items props', () => {
      createComponent();

      expect(findBreadcrumbItems()).toHaveLength(items.length);
    });

    it(`with ${items.length} items has ${items.length - 1} separators`, () => {
      createComponent();

      expect(findAllSeparators()).toHaveLength(items.length - 1);
    });
  });

  describe('bindings', () => {
    it('first breadcrumb has text and href bound', () => {
      createComponent();

      expect(findBreadcrumbItems().at(0).attributes()).toMatchObject({
        text: items[0].text,
        href: items[0].href,
      });
    });

    it('second breadcrumb has text and to bound', () => {
      createComponent();

      expect(findBreadcrumbItems().at(1).attributes()).toMatchObject({
        text: items[1].text,
        to: items[1].to,
      });
    });
  });

  describe('collapsible', () => {
    describe(`when breadcrumbs list size is NOT larger than ${COLLAPSE_AT_SIZE}`, () => {
      beforeEach(() => {
        createComponent();
      });
      it('should not display collapsed list expander && separator', () => {
        expect(findCollapsedListExpander().exists()).toBe(false);
        expect(findExpanderSeparator().exists()).toBe(false);
      });

      it('should display all items visible', () => {
        expect(findVisibleBreadcrumbItems()).toHaveLength(items.length);
      });
    });

    describe(`when breadcrumbs list size is larger than ${COLLAPSE_AT_SIZE}`, () => {
      beforeEach(() => {
        createComponent({ items: [...items, ...extraItems] });
      });
      it('should display collapsed list expander && separator', () => {
        expect(findCollapsedListExpander().exists()).toBe(true);
        expect(findExpanderSeparator().exists()).toBe(true);
      });

      it('should display only first && 2 last items and the rest as hidden', () => {
        const alwaysVisibleNum = 3;
        expect(findVisibleBreadcrumbItems()).toHaveLength(alwaysVisibleNum);
        expect(findHiddenBreadcrumbItems()).toHaveLength(
          items.length + extraItems.length - alwaysVisibleNum
        );
      });

      it('should expand the list on expander click', async () => {
        findCollapsedListExpander().vm.$emit('click');
        await wrapper.vm.$nextTick();
        expect(findHiddenBreadcrumbItems()).toHaveLength(0);
        expect(findVisibleBreadcrumbItems()).toHaveLength(items.length + extraItems.length);
      });
    });
  });
});
