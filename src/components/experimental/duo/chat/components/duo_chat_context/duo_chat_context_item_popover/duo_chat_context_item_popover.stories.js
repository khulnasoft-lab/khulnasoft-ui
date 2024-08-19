import { generateSampleContextItems } from '../duo_chat_context_items_sample_data';
import GlDuoChatContextItemPopover from './duo_chat_context_item_popover.vue';

const sampleContextItems = generateSampleContextItems(10);

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-popover',
  component: GlDuoChatContextItemPopover,
  argTypes: {
    placement: {
      control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemPopover },
  data() {
    return {
      items: sampleContextItems,
    };
  },
  template: `
    <div class="gl-display-flex gl-flex-direction-column gl-align-items-center">
      <div v-for="(item, index) in items" :key="item.id" class="gl-mb-5">
        <button v-if="item.isEnabled" :id="'popover-target-' + index">
          Hover me ({{ item.type }})
        </button>
        <button v-else :id="'popover-target-' + index">
          Hover me ({{ item.type }}) (item is disabled)
        </button>
        <gl-duo-chat-context-item-popover
          :item="item"
          :target="'popover-target-' + index"
          :placement="placement"
        />
      </div>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  placement: 'right',
};
