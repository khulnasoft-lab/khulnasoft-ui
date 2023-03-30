import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Breadcrumb, { COLLAPSE_AT_SIZE } from './breadcrumb.vue';
import GlBreadcrumbItem from './breadcrumb_item.vue';

describe('Breadcrumb component', () => {
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
  const findBreadcrumbItems = () => wrapper.findAllComponents(GlBreadcrumbItem);
  const findCollapsedListExpander = () => wrapper.find('[data-testid="collapsed-expander"]');

  const findVisibleBreadcrumbItems = () =>
    findBreadcrumbItems().wrappers.filter((item) => item.isVisible());
  const findHiddenBreadcrumbItems = () =>
    findBreadcrumbItems().wrappers.filter((item) => !item.isVisible());

  const createComponent = (propsData = { items }) => {
    wrapper = shallowMount(Breadcrumb, {
      propsData,
      slots: {
        avatar: '<div data-testid="avatar-slot"></div>',
      },
      stubs: {
        GlBreadcrumbItem,
      },
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
  });

  describe('items', () => {
    it('has one breadcrumb-item for each item in the items props', () => {
      createComponent();

      expect(findBreadcrumbItems()).toHaveLength(items.length);
    });
  });

  describe('bindings', () => {
    beforeEach(() => {
      createComponent();
    });

    it('first breadcrumb has text, href && ariaCurrent=`false` bound', () => {
      expect(findBreadcrumbItems().at(0).props()).toMatchObject({
        text: items[0].text,
        href: items[0].href,
        ariaCurrent: false,
      });
    });

    it('second breadcrumb has text, to && ariaCurrent=`false` bound', () => {
      expect(findBreadcrumbItems().at(1).props()).toMatchObject({
        text: items[1].text,
        to: items[1].to,
        ariaCurrent: false,
      });
    });

    it('last breadcrumb has text, to && ariaCurrent=`page` bound', () => {
      expect(findBreadcrumbItems().at(2).props()).toMatchObject({
        text: items[2].text,
        href: items[2].href,
        ariaCurrent: 'page',
      });
    });
  });

  describe('collapsible', () => {
    describe(`when breadcrumbs list size is NOT larger than ${COLLAPSE_AT_SIZE}`, () => {
      beforeEach(() => {
        createComponent();
      });
      it('should not display collapsed list expander', () => {
        expect(findCollapsedListExpander().exists()).toBe(false);
      });

      it('should display all items visible', () => {
        expect(findVisibleBreadcrumbItems()).toHaveLength(items.length);
      });
    });

    describe(`when breadcrumbs list size is larger than ${COLLAPSE_AT_SIZE}`, () => {
      beforeEach(() => {
        createComponent({ items: [...items, ...extraItems] });
      });
      it('should display collapsed list expander', () => {
        expect(findCollapsedListExpander().exists()).toBe(true);
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
        await nextTick();
        expect(findHiddenBreadcrumbItems()).toHaveLength(0);
        expect(findVisibleBreadcrumbItems()).toHaveLength(items.length + extraItems.length);
      });
    });
  });
});
