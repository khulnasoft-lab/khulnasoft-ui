import { makeContainer } from '../../../../../../../utils/story_decorators/container';
import { setStoryTimeout } from '../../../../../../../utils/test_utils';
import {
  getMockContextItems,
  MOCK_CATEGORIES,
  MOCK_CONTEXT_FILE_CONTENT,
  MOCK_CONTEXT_FILE_DIFF_CONTENT,
} from '../mock_context_data';
import { CONTEXT_ITEM_CATEGORY_LOCAL_GIT } from '../constants';
import GlDuoChatContextItemMenu from './duo_chat_context_item_menu.vue';

const sampleCategories = MOCK_CATEGORIES;
const sampleContextItems = getMockContextItems();

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-menu',
  component: GlDuoChatContextItemMenu,
  decorators: [makeContainer({ height: '300px' })],
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: `Allows selecting and removing context items for the conversation.

Note that keyboard events don't work properly in this story (independently of the main GlDuoChat component), test in the GlDuoChat interactive story with the /include command.`,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { GlDuoChatContextItemMenu },
  props: Object.keys(argTypes),
  data() {
    return {
      isOpen: this.open,
      isLoading: this.loading,
      errorMessage: this.error,
      searchResults: this.results,
      selectedItems: this.selections,
    };
  },
  methods: {
    handleContextItemsSearch({ category, query }) {
      this.isLoading = true;
      this.errorMessage = null;
      setStoryTimeout(() => {
        this.isLoading = false;
        this.searchResults = sampleContextItems
          .filter((item) => item.type === category)
          .filter(
            (item) => !query || item.metadata.name.toLowerCase().includes(query.toLowerCase())
          )
          .filter((item) => !this.selectedItems.some((contextItem) => contextItem.id === item.id));
      }, 300);
    },
    handleContextItemSelect(item) {
      if (!this.selectedItems.some((i) => i.id === item.id)) {
        this.selectedItems.push(item);
      }
    },
    handleContextItemRemove(item) {
      const index = this.selectedItems.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    },
    handleGetContent(contextItem) {
      this.selectedItems = this.selectedItems.map((item) => {
        if (item.id === contextItem.id) {
          return {
            ...contextItem,
            content:
              contextItem.category === CONTEXT_ITEM_CATEGORY_LOCAL_GIT
                ? MOCK_CONTEXT_FILE_DIFF_CONTENT
                : MOCK_CONTEXT_FILE_CONTENT,
          };
        }
        return item;
      });
    },
  },
  template: `
    <div class="gl-h-full gl-flex gl-flex-col gl-justify-end">
      <div class="gl-relative gl-max-w-full">
        <gl-duo-chat-context-item-menu
          :open="isOpen"
          :selections="selectedItems"
          :categories="categories"
          :loading="isLoading"
          :error="errorMessage"
          :results="searchResults"
          @search="handleContextItemsSearch"
          @select="handleContextItemSelect"
          @remove="handleContextItemRemove"
          @get-context-item-content="handleGetContent"
          @close="isOpen = false"
        />
      </div>
      <button @click="isOpen = !isOpen">Toggle Context Menu</button>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  open: false,
  loading: false,
  error: null,
  categories: sampleCategories,
  results: [],
  selections: [],
};
