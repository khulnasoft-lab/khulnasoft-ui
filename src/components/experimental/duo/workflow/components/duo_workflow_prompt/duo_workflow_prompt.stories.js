import GlDuoWorkflowPrompt from './duo_workflow_prompt.vue';
import readme from './duo_workflow_prompt.md';

const defaultValue = (prop) => GlDuoWorkflowPrompt.props[prop].default;

const generateProps = ({
  header = defaultValue('header'),
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
  header,
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
      :header="header"
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
