import Vue from 'vue';
import { generateSampleContextItems } from '../duo_chat_context_items_sample_data';
import { EVENT_BUS_TYPES } from '../duo_chat_context_event_bus';
import GlDuoChatContextItemSelections from './duo_chat_context_item_selections.vue';

const eventBus = new Vue();
const sampleContextItems = generateSampleContextItems(5);

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-selections',
  component: GlDuoChatContextItemSelections,
  argTypes: {
    title: { control: 'text' },
    collapsable: { control: 'boolean' },
    showClose: { control: 'boolean' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemSelections },
  data() {
    return {
      localEventBus: eventBus,
      itemSelections: [...sampleContextItems],
    };
  },
  mounted() {
    this.localEventBus.$on(EVENT_BUS_TYPES.CONTEXT_ITEM_REMOVED, this.handleRemoveItem);
  },
  beforeDestroy() {
    this.localEventBus.$off(EVENT_BUS_TYPES.CONTEXT_ITEM_REMOVED, this.handleRemoveItem);
  },
  methods: {
    handleRemoveItem(item) {
      const index = this.itemSelections.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.itemSelections.splice(index, 1);
      }
    },
  },
  template: `
    <div>
      <gl-duo-chat-context-item-selections
        :event-bus="localEventBus"
        :context-item-selections="itemSelections"
        v-bind="$props"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Added Context',
  collapsable: false,
  showClose: true,
};

export const Collapsable = Template.bind({});
Collapsable.args = {
  ...Default.args,
  collapsable: true,
};

export const NoCloseButton = Template.bind({});
NoCloseButton.args = {
  ...Default.args,
  showClose: false,
};

export const CustomTitle = Template.bind({});
CustomTitle.args = {
  ...Default.args,
  title: 'Selected Items',
};

export const EmptySelection = Template.bind({});
EmptySelection.args = {
  ...Default.args,
};
EmptySelection.decorators = [
  () => ({
    template: '<story />',
    data() {
      return {
        contextItemSelections: [],
      };
    },
  }),
];
