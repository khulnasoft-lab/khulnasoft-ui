import { makeContainer } from '../../../../../../../utils/story_decorators/container';
import {
  MOCK_CONTEXT_ITEM_FILE,
  MOCK_CONTEXT_ITEM_FILE_DISABLED,
  MOCK_CONTEXT_ITEM_ISSUE,
  MOCK_CONTEXT_ITEM_ISSUE_DISABLED,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST,
  MOCK_CONTEXT_ITEM_MERGE_REQUEST_DISABLED,
} from '../mock_context_data';
import GlDuoChatContextItemPopover from './duo_chat_context_item_popover.vue';

export default {
  title: 'experimental/duo/chat/components/duo-chat-context/duo-chat-context-item-popover',
  component: GlDuoChatContextItemPopover,
  tags: ['skip-visual-test'],
  decorators: [makeContainer({ height: '300px' })],
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { GlDuoChatContextItemPopover },
  template: `
    <div class="gl-flex gl-flex-col gl-items-center">
      <button :id="item.id">
        Hover me ({{ item.type }}){{ item.isEnabled ? '' : ' (item is disabled)' }}
      </button>
      <gl-duo-chat-context-item-popover
        :item="item"
        :target="item.id"
      />
    </div>
  `,
});

export const File = Template.bind({});
File.args = {
  item: MOCK_CONTEXT_ITEM_FILE,
};

export const DisabledFile = Template.bind({});
DisabledFile.args = {
  item: MOCK_CONTEXT_ITEM_FILE_DISABLED,
};

export const Issue = Template.bind({});
Issue.args = {
  item: MOCK_CONTEXT_ITEM_ISSUE,
};

export const DisabledIssue = Template.bind({});
DisabledIssue.args = {
  item: MOCK_CONTEXT_ITEM_ISSUE_DISABLED,
};

export const MergeRequest = Template.bind({});
MergeRequest.args = {
  item: MOCK_CONTEXT_ITEM_MERGE_REQUEST,
};

export const DisabledMergeRequest = Template.bind({});
DisabledMergeRequest.args = {
  item: MOCK_CONTEXT_ITEM_MERGE_REQUEST_DISABLED,
};
