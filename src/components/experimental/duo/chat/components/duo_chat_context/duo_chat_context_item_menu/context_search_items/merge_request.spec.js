import { shallowMount } from '@vue/test-utils';
import { MOCK_CATEGORIES, MOCK_CONTEXT_ITEM_MERGE_REQUEST } from '../../mock_context_data';
import { CONTEXT_ITEM_TYPE_MERGE_REQUEST } from '../../constants';
import GlDuoChatContextItemMenuContextSearchItemMergeRequest from './merge_request.vue';

describe('GlDuoChatContextItemMenuContextSearchItemMergeRequest', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuContextSearchItemMergeRequest, {
      propsData: {
        category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_MERGE_REQUEST),
        item: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
      },
    });
  };

  it('should render the merge request ID', () => {
    createWrapper();

    expect(wrapper.text()).toContain('!1122');
  });
});
