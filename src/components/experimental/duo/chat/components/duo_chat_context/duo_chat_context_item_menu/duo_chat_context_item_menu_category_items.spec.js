import { shallowMount } from '@vue/test-utils';
import GlDropdownItem from '../../../../../../base/dropdown/dropdown_item.vue';
import GlIcon from '../../../../../../base/icon/icon.vue';
import { MOCK_CATEGORIES } from '../mock_context_data';
import GlDuoChatContextItemMenuCategoryItems from './duo_chat_context_item_menu_category_items.vue';

describe('GlDuoChatContextItemMenuCategoryItems', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuCategoryItems, {
      propsData: {
        categories: MOCK_CATEGORIES,
        activeIndex: 0,
      },
    });
  };

  const findActiveItem = () => wrapper.find('.active-command');
  const findDropdownItems = () => wrapper.findAllComponents(GlDropdownItem);

  beforeEach(() => createWrapper());

  it('selects the category when clicked', async () => {
    await findActiveItem().vm.$emit('click');

    expect(wrapper.emitted('select').at(0)).toEqual([MOCK_CATEGORIES.at(0)]);
  });

  it('updates active index when hovering over item', () => {
    findDropdownItems().wrappers.at(1).find('div').trigger('mouseenter');

    expect(wrapper.emitted('active-index-change').at(0)).toEqual([1]);
  });

  it('renders the category details', () => {
    const dropdownItems = findDropdownItems();

    expect(dropdownItems).toHaveLength(MOCK_CATEGORIES.length);

    dropdownItems.wrappers.forEach((dropdownItem, index) => {
      const expectedCategory = MOCK_CATEGORIES.at(index);
      expect(dropdownItem.text()).toEqual(expectedCategory.label);
      expect(dropdownItem.findComponent(GlIcon).props('name')).toEqual(expectedCategory.icon);
    });
  });

  it('marks the correct category as active', async () => {
    expect(findActiveItem().text()).toBe(MOCK_CATEGORIES.at(0).label);

    await wrapper.setProps({ activeIndex: 1 });
    expect(findActiveItem().text()).toBe(MOCK_CATEGORIES.at(1).label);

    await wrapper.setProps({ activeIndex: 2 });
    expect(findActiveItem().text()).toBe(MOCK_CATEGORIES.at(2).label);
  });
});
