import GlLineChart from '../../charts/line/line.vue';
import GlIcon from '../../base/icon/icon.vue';
import GlPopover from '../../base/popover/popover.vue';
import GlLink from '../../base/link/link.vue';
import GlDashboardPanel from './panel.vue';
import readme from './panel.md';

export default {
  title: 'dashboards/panel',
  component: GlDashboardPanel,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};

const chartProps = {
  chartData: [
    {
      name: 'Created MRs',
      data: [
        ['Mon', 1184],
        ['Tue', 1346],
        ['Wed', 1035],
        ['Thu', 1226],
        ['Fri', 1421],
        ['Sat', 1347],
        ['Sun', 1035],
      ],
    },
    {
      name: 'Closed MRs',
      data: [
        ['Mon', 1509],
        ['Tue', 1275],
        ['Wed', 1187],
        ['Thu', 1287],
        ['Fri', 1098],
        ['Sat', 1457],
        ['Sun', 1452],
      ],
    },
    {
      name: 'Predicted closed MRs',
      data: [
        ['Mon', 1041],
        ['Tue', 1468],
        ['Wed', 1273],
        ['Thu', 1503],
        ['Fri', 1209],
        ['Sat', 1416],
        ['Sun', 1213],
      ],
    },
  ],
  chartOptions: {
    animation: false,
    xAxis: {
      name: 'Time',
      type: 'category',
    },
  },
};

const bodySlot = `
  <template #body>
    <gl-line-chart :data="$options.chartData" :option="$options.chartOptions" />
  </template>
`;

const alertMessageSlot = `
<template #alert-message="{ panelId }">
  <gl-popover
    triggers="hover focus"
    title="Alert message"
    :show-close-button="false"
    placement="top"
    :css-classes="['gl-max-w-1/2']"
    :target="panelId"
    :delay="{ hide: 500 }"
    boundary="viewport"
    >
      Alert message to show users. <gl-link href="#">Learn more</gl-link>.
  </gl-popover>
</template>
`;

const wrap = (template) => `
  <!-- Margin top added to give space for the popover -->
  <div style="margin-top: 100px;" class="gl-text-base">
    <gl-dashboard-panel v-bind="$props" style="min-height: 7rem;">
      ${template}
    </gl-dashboard-panel>
  </div>
`;

const Template = (args, { argTypes }) => ({
  components: { GlDashboardPanel, GlLineChart, GlIcon, GlPopover, GlLink },
  props: Object.keys(argTypes),
  ...chartProps,
  template: wrap(bodySlot),
});

export const Default = Template.bind({});
Default.args = {
  containerClass: null,
  borderColorClass: null,
  title: 'Dashboard panel',
  tooltip: null,
  loading: false,
  loadingDelayed: false,
  loadingDelayedText: 'Still loading...',
  actions: [],
  actionsToggleText: 'Actions',
  editing: false,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...Default.args,
  tooltip: {
    description: 'Find out %{linkStart}more%{linkEnd}',
    descriptionLink: 'http://test.com',
  },
};

export const WithLoading = Template.bind({});
WithLoading.args = {
  ...Default.args,
  loading: true,
};

export const WithLoadingAndLoadingDelayed = Template.bind({});
WithLoadingAndLoadingDelayed.args = {
  ...Default.args,
  loading: true,
  loadingDelayed: true,
};

export const WithEditingAndEditingActions = Template.bind({});
WithEditingAndEditingActions.args = {
  ...Default.args,
  editing: true,
  actions: [
    {
      text: 'Delete',
      icon: 'remove',
      action: () => {},
    },
  ],
};

export const WithBorderColor = Template.bind({});
WithBorderColor.args = {
  ...Default.args,
  borderColorClass: 'gl-border-t-blue-500',
};

export const WithTitleIcon = Template.bind({});
WithTitleIcon.args = {
  ...Default.args,
  titleIcon: 'error',
  titleIconClass: 'gl-text-red-500',
};

export const WithAlertMessage = (args, { argTypes }) => ({
  components: { GlDashboardPanel, GlLineChart, GlIcon, GlPopover, GlLink },
  props: Object.keys(argTypes),
  ...chartProps,
  template: wrap(`
    <template #body>
      <span data-testid="alert-body" class="gl-text-subtle">
        Something went wrong.
      </span>
    </template>
    ${alertMessageSlot}`),
});
WithAlertMessage.args = {
  ...Default.args,
  borderColorClass: 'gl-border-t-red-500',
  titleIcon: 'error',
  titleIconClass: 'gl-text-red-500',
};
