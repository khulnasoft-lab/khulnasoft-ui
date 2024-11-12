/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDuoWorkflowPrompt from './duo_workflow_prompt.vue';
import readme from './duo_workflow_prompt.md';

const defaultValue = (prop) => GlDuoWorkflowPrompt.props[prop].default;

const generateProps = ({
  title = defaultValue('title'),
  prompt = defaultValue('prompt'),
  loading = defaultValue('loading'),
  promptLabel = defaultValue('promptLabel'),
  promptLabelDescription = defaultValue('promptLabelDescription'),
  promptDescription = defaultValue('promptDescription'),
  promptId = defaultValue('promptId'),
  confirmButtonText = defaultValue('confirmButtonText'),
  cancelButtonText = defaultValue('cancelButtonText'),
  summary = 'Fix my pipeline',
} = {}) => ({
  title,
  promptLabel,
  promptLabelDescription,
  promptDescription,
  promptId,
  confirmButtonText,
  cancelButtonText,
  prompt,
  loading,
  summary,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoWorkflowPrompt },
  props: Object.keys(argTypes),
  template: `
    <gl-duo-workflow-prompt
      :title="title"
      :promptLabel="promptLabel"
      :promptLabelDescription="promptLabelDescription"
      :promptDescription="promptDescription"
      :promptId="promptId"
      :confirmButtonText="confirmButtonText"
      :cancelButtonText="cancelButtonText"
      :summary="summary"
    />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'experimental/duo/workflow/duo-workflow-prompt',
  component: GlDuoWorkflowPrompt,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
