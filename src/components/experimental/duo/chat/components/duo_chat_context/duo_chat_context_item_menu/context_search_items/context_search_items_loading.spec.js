import { shallowMount } from '@vue/test-utils';
import GlDuoChatContextItemMenuContextSearchItemsLoading from './context_search_items_loading.vue';

describe('GlDuoChatContextItemMenuContextSearchItemsLoading', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuContextSearchItemsLoading);
  };

  it('should render the accessible loading text', () => {
    createWrapper();
    expect(wrapper.text()).toContain('Loading...');
  });
});
