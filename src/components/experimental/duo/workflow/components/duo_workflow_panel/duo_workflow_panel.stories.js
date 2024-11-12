/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import GlDuoWorkflowPanel from './duo_workflow_panel.vue';
import readme from './duo_workflow_panel.md';

const defaultValue = (prop) => GlDuoWorkflowPanel.props[prop].default;

const generateProps = ({
  headerIcon = 'tanuki',
  expandPanelButtonTitle = defaultValue('expandPanelButtonTitle'),
  collapsePanelButtonTitle = defaultValue('collapsePanelButtonTitle'),
  expanded = true,
} = {}) => ({
  headerIcon,
  expandPanelButtonTitle,
  collapsePanelButtonTitle,
  expanded,
});

const Template = (args, { argTypes }) => ({
  components: { GlDuoWorkflowPanel },
  props: Object.keys(argTypes),
  template: `
    <gl-duo-workflow-panel
      :headerIcon="headerIcon"
      :expandPanelButtonTitle="expandPanelButtonTitle"
      :collapsePanelButtonTitle="collapsePanelButtonTitle"
      :expanded="expanded"
    >
      <template #title>Title</template>
      <template #subtitle>Subtitle</template>
      <template #content>Content</template>
    </gl-duo-workflow-panel>
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'experimental/duo/workflow/duo-workflow-panel',
  component: GlDuoWorkflowPanel,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
