import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import avatarPath1 from '../../../../static/img/avatar.png';
import avatarPath3 from '../../../../static/img/avatar_1.png';
import GlBreadcrumb, { COLLAPSE_AT_SIZE } from './breadcrumb.vue';
import GlBreadcrumbItem from './breadcrumb_item.vue';

describe('Breadcrumb component', () => {
  let wrapper;

  const items = [
    { text: 'first_breadcrumb', href: 'https://gitlab.com', avatarPath: avatarPath1 },
    {
      text: 'second_breadcrumb',
      to: 'to_value',
    },
    {
      text: 'third_breadcrumb',
      href: 'https://about.gitlab.com',
      avatarPath: avatarPath3,
    },
  ];

  const extraItems = [
    { text: 'fourth_breadcrumb', href: 'https://gitlab.com' },
    {
      text: 'fifth_breadcrumb',
      to: 'to_value',
    },
  ];

  const findAllAvatars = () => wrapper.findAll('[data-testid="avatar"]');
  const findBreadcrumbItems = () => wrapper.findAllComponents(GlBreadcrumbItem);
  const findCollapsedListExpander = () => wrapper.find('[data-testid="collapsed-expander"]');

  const findVisibleBreadcrumbItems = () =>
    findBreadcrumbItems().wrappers.filter((item) => item.isVisible());
  const findHiddenBreadcrumbItems = () =>
    findBreadcrumbItems().wrappers.filter((item) => !item.isVisible());

  const createComponent = (propsData = { items }) => {
    wrapper = shallowMount(GlBreadcrumb, {
      propsData,
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

  describe('items', () => {
    it('has one breadcrumb-item for each item in the items props', () => {
      createComponent();

      expect(findBreadcrumbItems()).toHaveLength(items.length);
    });
  });

  describe('ariaLabel', () => {
    it('uses prop if provided', () => {
      createComponent({ items, ariaLabel: 'Folder breadcrumbs' });

      expect(wrapper.attributes('aria-label')).toBe('Folder breadcrumbs');
    });

    it('uses default if prop not provided', () => {
      createComponent();

      expect(wrapper.attributes('aria-label')).toBe('Breadcrumb');
    });
  });

  describe('avatars', () => {
    it('renders 2 avatars when 2 avatarPaths are passed', () => {
      createComponent();

      expect(findAllAvatars()).toHaveLength(2);
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
