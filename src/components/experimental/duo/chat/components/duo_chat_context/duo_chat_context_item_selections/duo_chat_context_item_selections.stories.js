import { makeContainer } from '../../../../../../../utils/story_decorators/container';
import { getMockContextItems } from '../mock_context_data';
import GlDuoChatContextItemSelections from './duo_chat_context_item_selections.vue';

const sampleContextItems = getMockContextItems();

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-selections',
  component: GlDuoChatContextItemSelections,
  argTypes: {
    defaultCollapsed: { control: 'boolean' },
    title: { control: 'text' },
    selections: { control: 'object' },
  },
  tags: ['skip-visual-test'],
  decorators: [makeContainer({ height: '300px' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemSelections },
  template: `
    <div>
      <gl-duo-chat-context-item-selections
        v-if="selections.length"
        :title="title"
        :default-collapsed="defaultCollapsed"
        :selections="selections"
        v-bind="$props"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  title: 'Included references',
  defaultCollapsed: true,
  selections: sampleContextItems,
};
