import { shallowMount } from '@vue/test-utils';
import GlDisclosureDropdownGroup, {
  GROUP_TOP_BORDER_CLASSES,
} from './disclosure_dropdown_group.vue';
import GlDisclosureDropdownItem from './disclosure_dropdown_item.vue';
import { mockGroups, mockProfileGroups } from './mock_data';

describe('GlDisclosureDropdownGroup', () => {
  let wrapper;

  const buildWrapper = ({ propsData, slots } = {}) => {
    wrapper = shallowMount(GlDisclosureDropdownGroup, {
      propsData: {
        group: mockGroups[0],
        ...propsData,
      },
      slots,
    });
  };

  const findGroup = () => wrapper.find('ul[role="group"]');
  const findItems = () => wrapper.findAllComponents(GlDisclosureDropdownItem);
  const findByTestId = (testid, root = wrapper) => root.find(`[data-testid="${testid}"]`);
  const findLabelElement = () => {
    const labelElementId = findGroup().attributes('aria-labelledby');
    return wrapper.find(`#${labelElementId}`);
  };

  it('renders default slot content', () => {
    buildWrapper({ slots: { default: '<li data-testid="default-slot-content"></li>' } });

    expect(findByTestId('default-slot-content').exists()).toBe(true);
  });

  it('renders list of items if default content was not provided', () => {
    buildWrapper();

    expect(findItems()).toHaveLength(mockGroups[0].items.length);
  });

  it('renders `list-item` content in a default slot of `GlDisclosureDropdownItem`', () => {
    buildWrapper({
      slots: { 'list-item': '<li data-testid="list-item-content"></li>' },
    });

    expect(findItems()).toHaveLength(mockGroups[0].items.length);

    expect(findItems().at(0).find('[data-testid="list-item-content"]').exists()).toBe(true);
  });

  describe('label', () => {
    it('labels the group when label provided', () => {
      buildWrapper();
      expect(findLabelElement().text()).toBe(mockGroups[0].name);
    });

    it('does not label the group when label is not provided', () => {
      buildWrapper({ propsData: { group: mockProfileGroups[0] } });
      expect(findLabelElement().exists()).toBe(false);
    });

    it('allows arbitrary content for group label', () => {
      buildWrapper({ slots: { 'group-label': '<i data-testid="custom-name"></i>' } });

      expect(findByTestId('custom-name', findLabelElement()).exists()).toBe(true);
    });
  });

  describe('separator', () => {
    const topBorderClasses = GROUP_TOP_BORDER_CLASSES.split(' ');

    it('should not add top border by default', () => {
      buildWrapper();
      expect(wrapper.classes()).not.toEqual(expect.arrayContaining(topBorderClasses));
    });

    it('should add top border classes when `bordered` props is set to `true`', () => {
      buildWrapper({ propsData: { bordered: true } });
      expect(wrapper.classes()).toEqual(expect.arrayContaining(topBorderClasses));
    });
  });
});
