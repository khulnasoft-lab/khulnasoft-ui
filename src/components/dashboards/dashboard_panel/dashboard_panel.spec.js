import { shallowMount, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GlDisclosureDropdown from '~/components/base/new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlDisclosureDropdownItem from '~/components/base/new_dropdowns/disclosure/disclosure_dropdown_item.vue';
import GlIcon from '~/components/base/icon/icon.vue';
import GlLoadingIcon from '~/components/base/loading_icon/loading_icon.vue';
import GlSprintf from '~/components/utilities/sprintf/sprintf.vue';
import GlLink from '~/components/base/link/link.vue';
import GlDashboardPanel from './dashboard_panel.vue';

describe('GlDashboardPanel', () => {
  let wrapper;

  const createWrapper = ({
    props = {},
    scopedSlots = {},
    slots = {},
    mountFn = shallowMount,
  } = {}) => {
    wrapper = mountFn(GlDashboardPanel, {
      propsData: {
        ...props,
      },
      slots,
      scopedSlots,
      stubs: { GlSprintf },
    });
  };

  const findPanelTitle = () => wrapper.find('[data-testid="panel-title"]');
  const findPanelTitleIcon = () => wrapper.find('[data-testid="panel-title-icon"]');
  const findLoadingIcon = () => wrapper.findComponent(GlLoadingIcon);
  const findLoadingDelayedIndicator = () =>
    wrapper.find('[data-testid="panel-loading-delayed-indicator"]');
  const findPanelTitlePopoverIcon = () => wrapper.find('[data-testid="panel-title-popover-icon"]');
  const findPanelTitlePopover = () => wrapper.find('[data-testid="panel-title-popover"]');
  const findPanelTitlePopoverLink = () => findPanelTitlePopover().findComponent(GlLink);
  const findPanelActionsDropdown = () => wrapper.findComponent(GlDisclosureDropdown);
  const findDropdownItemByText = (text) =>
    findPanelActionsDropdown()
      .findAllComponents(GlDisclosureDropdownItem)
      .filter((w) => w.text() === text)
      .at(0);

  describe('default behaviour', () => {
    beforeEach(() => {
      createWrapper();
    });

    it('does not have a colored border', () => {
      expect(wrapper.classes()).not.toContain('gl-border-t-2');
    });

    it('does not render a title icon', () => {
      expect(findPanelTitleIcon().exists()).toBe(false);
    });

    it('does not render a title', () => {
      expect(findPanelTitle().text()).toBe('');
    });

    it('does not render a loading icon', () => {
      expect(findLoadingIcon().exists()).toBe(false);
      expect(findLoadingDelayedIndicator().exists()).toBe(false);
    });

    it('does not render the actions dropdown', () => {
      expect(findPanelActionsDropdown().exists()).toBe(false);
    });

    it('does not render the title popover icon', () => {
      expect(findPanelTitlePopoverIcon().exists()).toBe(false);
    });
  });

  describe('with a container class', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          containerClass: 'panel-container',
        },
      });
    });

    it('renders the border color classes', () => {
      expect(wrapper.classes()).toContain('panel-container');
    });
  });

  describe('with a border color class', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          borderColorClass: 'gl-border-t-red-500',
        },
      });
    });

    it('renders the border color classes', () => {
      expect(wrapper.classes()).toContain('gl-border-t-2');
      expect(wrapper.classes()).toContain('gl-border-t-solid');
      expect(wrapper.classes()).toContain('gl-border-t-red-500');
    });
  });

  describe('with a title icon', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          titleIcon: 'error',
          titleIconClass: 'gl-text-red-500',
        },
      });
    });

    it('renders the panel title icon', () => {
      expect(findPanelTitleIcon().props('name')).toBe('error');
      expect(findPanelTitleIcon().classes()).toContain('gl-text-red-500');
    });
  });

  describe('with a body slot', () => {
    beforeEach(() => {
      createWrapper({
        slots: {
          body: '<div data-testid="panel-body-slot"></div>',
        },
      });
    });

    it('renders the panel body', () => {
      expect(wrapper.find('[data-testid="panel-body-slot"]').exists()).toBe(true);
    });
  });

  describe('with an alert message slot', () => {
    beforeEach(() => {
      createWrapper({
        scopedSlots: {
          'alert-message': '<div data-testid="panel-alert-message-slot">{{ props.panelId }}</div>',
        },
      });
    });

    it('renders the panel alert message', () => {
      expect(wrapper.find('[data-testid="panel-alert-message-slot"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="panel-alert-message-slot"]').text()).toContain(
        'gl-dashboard-panel-id-'
      );
    });
  });

  describe('when loading', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          loading: true,
        },
      });
    });

    it('renders a loading icon', () => {
      expect(findLoadingIcon().exists()).toBe(true);
      expect(findLoadingDelayedIndicator().exists()).toBe(false);
    });

    it('renders the additional "Still loading" indicator if the data source is slow', async () => {
      await wrapper.setProps({
        loadingDelayed: true,
        loadingDelayedText: 'Still loading...',
      });
      await nextTick();

      expect(findLoadingIcon().exists()).toBe(true);
      expect(findLoadingDelayedIndicator().text()).toBe('Still loading...');
    });
  });

  describe('when loading with a body slot', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          loading: true,
        },
        slots: {
          body: '<div data-testid="panel-body-slot"></div>',
        },
      });
    });

    it('does not render the panel body', () => {
      expect(wrapper.find('[data-testid="panel-body-slot"]').exists()).toBe(false);
    });
  });

  describe('when there is a title', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          title: 'Panel Title',
        },
      });
    });

    it('renders the panel title', () => {
      expect(findPanelTitle().text()).toBe('Panel Title');
    });
  });

  describe('when there is a title with a popover', () => {
    describe('with description and link', () => {
      beforeEach(() => {
        createWrapper({
          props: {
            title: 'Panel Title',
            titlePopover: {
              description: 'This is just information, %{linkStart}learn more%{linkEnd}',
              descriptionLink: '/foo',
            },
          },
        });
      });

      it('renders the panel title popover icon with special content', () => {
        expect(findPanelTitlePopoverIcon().exists()).toBe(true);
        expect(findPanelTitlePopover().text()).toBe('This is just information, learn more');
        expect(findPanelTitlePopoverLink().attributes('href')).toBe('/foo');
      });
    });

    describe('without description link', () => {
      beforeEach(() => {
        createWrapper({
          props: {
            title: 'Panel Title',
            titlePopover: {
              description: 'This is just information.',
            },
          },
        });
      });

      it('renders the panel title popover icon with description only', () => {
        expect(findPanelTitlePopoverIcon().exists()).toBe(true);
        expect(findPanelTitlePopoverLink().exists()).toBe(false);
        expect(findPanelTitlePopover().text()).toBe('This is just information.');
      });
    });

    describe('without description', () => {
      beforeEach(() => {
        createWrapper({
          props: {
            title: 'Panel Title',
            titlePopover: {
              descriptionLink: '/foo',
            },
          },
        });
      });

      it('does not render the panel title popover icon', () => {
        expect(findPanelTitlePopoverIcon().exists()).toBe(false);
      });
    });
  });

  describe('when editing and there are no actions', () => {
    beforeEach(() => {
      createWrapper({
        props: {
          editing: true,
        },
        mountFn: mount,
      });
    });

    it('does not render the panel actions dropdown', () => {
      expect(findPanelActionsDropdown().exists()).toBe(false);
    });
  });

  describe('when editing and there are actions', () => {
    const actions = [
      {
        icon: 'pencil',
        text: 'Edit',
        action: () => {},
      },
    ];

    beforeEach(() => {
      createWrapper({
        props: {
          editing: true,
          actions,
          actionsToggleText: 'Actions',
        },
        mountFn: mount,
      });
    });

    it('renders the panel actions dropdown', () => {
      expect(findPanelActionsDropdown().props('items')).toStrictEqual(actions);
      expect(findPanelActionsDropdown().props('toggleText')).toContain('Actions');
    });

    it('renders the panel action dropdown item and icon', () => {
      const dropdownItem = findDropdownItemByText(actions[0].text);

      expect(dropdownItem.exists()).toBe(true);
      expect(dropdownItem.findComponent(GlIcon).props('name')).toBe(actions[0].icon);
    });
  });
});
