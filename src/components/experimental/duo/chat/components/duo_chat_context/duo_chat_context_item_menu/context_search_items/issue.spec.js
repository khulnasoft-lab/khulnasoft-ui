import { shallowMount } from '@vue/test-utils';
import { MOCK_CATEGORIES, MOCK_CONTEXT_ITEM_ISSUE } from '../../mock_context_data';
import { CONTEXT_ITEM_TYPE_ISSUE } from '../../constants';
import GlDuoChatContextItemMenuContextSearchItemIssue from './issue.vue';

describe('GlDuoChatContextItemMenuContextSearchItemIssue', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuContextSearchItemIssue, {
      propsData: {
        category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_ISSUE),
        item: MOCK_CONTEXT_ITEM_ISSUE,
      },
    });
  };

  it('should render the issue ID', () => {
    createWrapper();
    expect(wrapper.text()).toContain('#1234');
  });
});
