/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */
import { makeContainer } from '../../../../../../../utils/story_decorators/container';
import { getMockContextItems } from '../mock_context_data';
import GlDuoChatContextItemSelections from './duo_chat_context_item_selections.vue';

const sampleContextItems = getMockContextItems();

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-selections',
  component: GlDuoChatContextItemSelections,
  argTypes: {
    defaultCollapsed: { control: 'boolean' },
    removable: { control: 'boolean' },
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
        :removable="removable"
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
  removable: true,
  selections: sampleContextItems,
};
