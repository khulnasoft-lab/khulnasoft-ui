import Vue from 'vue';
import { action } from '@storybook/addon-actions';
import GlDuoChatContextItemMenu from './duo_chat_context_item_menu.vue';

const eventBus = new Vue();

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
    console.log('angelo testing', eventBus)
    return {
      localEventBus: eventBus, // Use the global event bus
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
      action('Search initiated')(category, query);
      const mockResults = [
        { id: '1', name: 'Item 1', isEnabled: true, info: { iid: 1 }, type: category },
        { id: '2', name: 'Item 2', isEnabled: false, info: { iid: 2 }, type: category },
        { id: '3', name: 'Item 3', isEnabled: true, info: { iid: 3 }, type: category },
      ];
      setTimeout(() => {
        this.localEventBus.$emit('context_item_search_result', mockResults);
      }, 300);
    },
    handleItemAdded(item) {
      action('Item added')(item);
    },
    toggleMenu() {
      this.localEventBus.$emit('toggle_context_menu', true);
    },
  },
  template: `
    <div style="padding-top: 200px;"> <!-- Add padding to the top -->
      <button @click="toggleMenu">Toggle Context Menu</button>
      <gl-duo-chat-context-item-menu
        :event-bus="localEventBus"
        :cursor-position="cursorPosition"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  cursorPosition: 100,
};