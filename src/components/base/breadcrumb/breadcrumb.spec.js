import { mount } from '@vue/test-utils';
import avatarPath1 from '../../../../static/img/avatar.png';
import avatarPath3 from '../../../../static/img/avatar_1.png';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlDisclosureDropdownItem from '../new_dropdowns/disclosure/disclosure_dropdown_item.vue';
import GlBreadcrumb from './breadcrumb.vue';
import GlBreadcrumbItem from './breadcrumb_item.vue';

describe('Breadcrumb component', () => {
  let wrapper;

  const items = [
    {
      text: 'first_breadcrumb',
      href: 'https://gitlab.com',
      avatarPath: avatarPath1,
    },
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

  const findAllAvatars = () => wrapper.findAll('[data-testid="avatar"]');
  const findBreadcrumbItems = () => wrapper.findAllComponents(GlBreadcrumbItem);
  const findOverflowDropdown = () => wrapper.findComponent(GlDisclosureDropdown);
  const findOverflowingItems = () => wrapper.findAllComponents(GlDisclosureDropdownItem);

  const findVisibleBreadcrumbItems = () =>
    findBreadcrumbItems().wrappers.filter((item) => item.isVisible());

  const createComponent = (propsData = { items }) => {
    wrapper = mount(GlBreadcrumb, {
      propsData,
      stubs: {
        GlBreadcrumbItem,
        GlDisclosureDropdown,
      },
    });
  };

  const mockElementWidth = (element, widthInPx) => {
    Object.defineProperty(element, 'clientWidth', {
      get: () => widthInPx,
    });
  };

  const mockWideWrapperWidth = () => {
    mockElementWidth(wrapper.element, 1000);
  };

  const mockSmallWrapperWidth = () => {
    mockElementWidth(wrapper.element, 1);
  };

  const mockItemsWidths = () => {
    findBreadcrumbItems().wrappers.forEach((item) => {
      mockElementWidth(item.element, 100);
    });
  };

  describe('items', () => {
    it('has one breadcrumb-item for each item in the items props', async () => {
      createComponent();
      await wrapper.vm.$nextTick();

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

  describe('showMoreLabel', () => {
    describe('when provided', () => {
      beforeEach(async () => {
        createComponent({ items, showMoreLabel: 'More...' });
        mockSmallWrapperWidth();
        mockItemsWidths();
        await wrapper.vm.$nextTick();
      });

      it('uses prop', () => {
        expect(findOverflowDropdown().props('toggleText')).toBe('More...');
      });
    });

    describe('when not provided', () => {
      beforeEach(async () => {
        createComponent();
        mockSmallWrapperWidth();
        mockItemsWidths();
        await wrapper.vm.$nextTick();
      });

      it('uses default', () => {
        expect(findOverflowDropdown().props('toggleText')).toBe('Show more breadcrumbs');
      });
    });
  });

  describe('autoResize', () => {
    describe('by default', () => {
      beforeEach(async () => {
        createComponent();
        mockSmallWrapperWidth();
        mockItemsWidths();
        await wrapper.vm.$nextTick();
      });

      it('moves overflowing items into dropdown', () => {
        expect(findOverflowDropdown().exists()).toBe(true);
        expect(findOverflowingItems().length).toBeGreaterThan(0);
      });

      it('reacts to prop changing to false', async () => {
        expect(findOverflowDropdown().exists()).toBe(true);
        await wrapper.setProps({ autoResize: false });
        await wrapper.vm.$nextTick();
        expect(findOverflowDropdown().exists()).toBe(false);
        expect(findBreadcrumbItems().length).toEqual(items.length);
      });
    });

    describe('when set to false', () => {
      beforeEach(async () => {
        createComponent({ items, autoResize: false });
        mockSmallWrapperWidth();
        mockItemsWidths();
        await wrapper.vm.$nextTick();
      });

      it('keeps all items visible', () => {
        expect(findOverflowDropdown().exists()).toBe(false);
        expect(findBreadcrumbItems().length).toEqual(items.length);
      });

      it('reacts to prop changing to true', async () => {
        expect(findOverflowDropdown().exists()).toBe(false);
        await wrapper.setProps({ autoResize: true });
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick(); // otherwise test fails with VUE_VERSION=3
        expect(findOverflowDropdown().exists()).toBe(true);
        expect(findOverflowingItems().length).toBeGreaterThan(0);
      });
    });
  });

  describe('avatars', () => {
    it('renders 2 avatars when 2 avatarPaths are passed', async () => {
      createComponent();
      await wrapper.vm.$nextTick();

      expect(findAllAvatars()).toHaveLength(2);
    });
  });

  describe('bindings', () => {
    beforeEach(() => {
      createComponent();
      mockWideWrapperWidth();
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
    describe(`when there is enough room to fit all items`, () => {
      beforeEach(() => {
        createComponent();
        mockWideWrapperWidth();
      });

      it('should not display collapsed list expander', () => {
        expect(findOverflowDropdown().exists()).toBe(false);
      });

      it('should display all items visible', () => {
        expect(findVisibleBreadcrumbItems()).toHaveLength(items.length);
      });
    });

    describe(`when there is NOT enough room to fit all items`, () => {
      beforeEach(async () => {
        createComponent();
        mockSmallWrapperWidth();
        mockItemsWidths();
        await wrapper.vm.$nextTick();
      });

      it('should display overflow dropdown', () => {
        expect(findOverflowDropdown().exists()).toBe(true);
      });

      it('moves the overflowing items into the dropdown', () => {
        const fittingItems = findBreadcrumbItems().length;
        const overflowingItems = wrapper.findAllComponents(GlDisclosureDropdownItem).length;
        expect(fittingItems + overflowingItems).toEqual(items.length);
      });
    });
  });
});
