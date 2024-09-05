import { shallowMount } from '@vue/test-utils';
import GlDuoChatContextItemMenuSearchItemsLoading from './duo_chat_context_item_menu_search_items_loading.vue';

describe('GlDuoChatContextItemMenuSearchItemsLoading', () => {
  let wrapper;

  const createWrapper = (props = {}) => {
    wrapper = shallowMount(GlDuoChatContextItemMenuSearchItemsLoading, {
      propsData: {
        rows: 3,
        ...props,
      },
    });
  };

  const findAllByTestId = (testId) => wrapper.findAll(`[data-testid="${testId}"]`);
  const findLoadingRows = () => findAllByTestId('search-results-loading');

  it('should render the accessible loading text', () => {
    createWrapper();
    expect(wrapper.text()).toContain('Loading...');
  });

  it.each([1, 2, 3, 4, 5])('renders %s rows', (rows) => {
    createWrapper({ rows });
    expect(findLoadingRows()).toHaveLength(rows);
  });
});
