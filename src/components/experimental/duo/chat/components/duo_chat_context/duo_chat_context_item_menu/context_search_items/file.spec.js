import { shallowMount } from '@vue/test-utils';
import { MOCK_CATEGORIES, MOCK_CONTEXT_ITEM_FILE } from '../../mock_context_data';
import { CONTEXT_ITEM_TYPE_PROJECT_FILE } from '../../constants';
import GlDuoChatContextItemMenuContextSearchItemFile from './file.vue';

describe('GlDuoChatContextItemMenuContextSearchItemFile', () => {
  let wrapper;

  const createWrapper = () => {
    wrapper = shallowMount(GlDuoChatContextItemMenuContextSearchItemFile, {
      propsData: {
        category: MOCK_CATEGORIES.find((cat) => cat.value === CONTEXT_ITEM_TYPE_PROJECT_FILE),
        item: MOCK_CONTEXT_ITEM_FILE,
      },
    });
  };

  it('should render the file relative path', () => {
    createWrapper();
    expect(wrapper.text()).toContain('src/plants/strawberry.ts');
  });
});
