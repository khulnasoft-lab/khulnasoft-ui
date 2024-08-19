import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import { categories, generateSampleContextItems } from '../duo_chat_context_items_sample_data';
import GlDuoChatContextItemMenu from './duo_chat_context_item_menu.vue';

const eventBus = new Vue();
let sampleCategories = categories
let sampleContextItems = generateSampleContextItems()

export default {
  title: 'experimental/duo/chat/components/duo_chat_context/duo_chat_context_item_menu',
  component: GlDuoChatContextItemMenu,
  argTypes: {
    cursorPosition: { control: { type: 'number', min: 0, max: 1000, step: 10 } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemMenu },
  data() {
    return {
      localEventBus: eventBus,
      contextCategories: sampleCategories,
      contextItems: sampleContextItems,
    };
  },
  mounted() {
    this.localEventBus.$on('context_item_search_query', this.handleSearch);
    this.localEventBus.$on('context_item_added', this.handleItemAdded);
  },
  beforeDestroy() {
    this.localEventBus.$off('context_item_search_query', this.handleSearch);
    this.localEventBus.$off('context_item_added', this.handleItemAdded);
  },
  methods: {
    handleSearch({ category, query }) {
      action('Search initiated')({ category, query });
      const filteredResults = this.contextItems
        .filter(item => item.type === category)
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setTimeout(() => {
        this.localEventBus.$emit('context_item_search_result', filteredResults);
      }, 300);
    },
    handleItemAdded(item) {
      action('Item added')(JSON.parse(JSON.stringify(item)));
    },
    toggleMenu() {
      this.localEventBus.$emit('toggle_context_menu', true);
    },
  },
  template: `
    <div style="padding-top: 400px;">
      <button @click="toggleMenu">Toggle Context Menu</button>
      <gl-duo-chat-context-item-menu
        :event-bus="localEventBus"
        :cursor-position="cursorPosition"
        :categories="contextCategories"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  cursorPosition: 100,
};