import { shallowMount } from '@vue/test-utils';
import GlDuoChatContextItemMenuSearchItemsLoading from './duo_chat_context_item_menu_search_items_loading.vue';

describe('GlDuoChatContextItemMenuSearchItemsLoading', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuSearchItemsLoading);
  };

  it('should render the accessible loading text', () => {
    createWrapper();
    expect(wrapper.text()).toContain('Loading...');
  });
});
