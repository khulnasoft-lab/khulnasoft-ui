import Vue from 'vue';
import { categories, generateSampleContextItems } from '../duo_chat_context_items_sample_data';
import { setStoryTimeout } from '../../../../../../../utils/test_utils';
import { EVENT_BUS_TYPES } from '../duo_chat_context_event_bus';
import GlDuoChatContextItemMenu from './duo_chat_context_item_menu.vue';

const eventBus = new Vue();
const sampleCategories = categories
const sampleContextItems = generateSampleContextItems()

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-menu',
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
      addedItemJson: null
    };
  },
  mounted() {
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_QUERY, this.handleSearch);
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_ADDED, this.handleItemAdded);
  },
  beforeDestroy() {
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_QUERY, this.handleSearch);
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_ADDED, this.handleItemAdded);
  },
  methods: {
    handleSearch({ category, query }) {
      const filteredResults = this.contextItems
        .filter(item => item.type === category)
        .filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setStoryTimeout(() => {
        this.localEventBus.$emit(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_RESULT, filteredResults);
      }, 300);
    },
    handleItemAdded(item) {
      this.addedItemJson = JSON.stringify(item, null, 2); 
    },
    toggleMenu() {
      this.localEventBus.$emit(EVENT_BUS_TYPES.TOGGLE_CONTEXT_MENU, true);
    },
  },
  template: `
    <div style="padding-top: 300px;">
      <button @click="toggleMenu">Toggle Context Menu</button>
      <gl-duo-chat-context-item-menu
        :event-bus="localEventBus"
        :cursor-position="cursorPosition"
        :categories="contextCategories"
      />
       <pre class="gl-text-sm gl-mt-3">{{ addedItemJson }}</pre>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  cursorPosition: 100,
};

const errorEventBus = new Vue();

// create an error template
const ErrorTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemMenu },
  data() {
    return {
      localEventBus: errorEventBus,
      contextCategories: sampleCategories,
    };
  },
  mounted() {
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_QUERY, this.handleSearch);
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_ADDED, this.handleItemAdded);
  },
  beforeDestroy() {
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_QUERY, this.handleSearch);
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_ADDED, this.handleItemAdded);
  },
  methods: {
    handleSearch() {
      setStoryTimeout(() => {
        this.localEventBus.$emit(EVENT_BUS_TYPES.CONTEXT_ITEM_SEARCH_ERROR, args.searchError);
      }, 300);
    },
    toggleMenu() {
      this.localEventBus.$emit(EVENT_BUS_TYPES.TOGGLE_CONTEXT_MENU, true);
    },
  },
  template: `
    <div style="padding-top: 100px;">
      <button @click="toggleMenu">Toggle Context Menu</button>
      <gl-duo-chat-context-item-menu
        :event-bus="localEventBus"
        :cursor-position="cursorPosition"
        :categories="contextCategories"
      />
    </div>
  `,
});



export const WithError = ErrorTemplate.bind({});
WithError.args = {
  cursorPosition: 100,
  searchError: 'Something went wrong',
};