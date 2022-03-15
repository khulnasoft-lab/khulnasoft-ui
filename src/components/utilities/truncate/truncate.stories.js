import { GlIcon, GlTruncate } from '../../../index';
import { POSITION } from './constants';
import readme from './truncate.md';

const template = '<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip" />';
const beforeTextTemplate = `
<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip">
  <template #before-text><gl-icon name="container-image" /></template>
</gl-truncate>`;
const afterTextTemplate = `
<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip">
  <template #after-text><gl-icon name="abuse" /></template>
</gl-truncate>`;
const bothSlotsTemplate = `
<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip">
  <template #before-text><gl-icon name="rocket" /></template>
  <template #after-text><gl-icon name="requirements" /></template>
</gl-truncate>`;

const generateProps = ({
  text = 'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue',
  position = 'middle',
  withTooltip = false,
} = {}) => ({
  text,
  position,
  withTooltip,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlTruncate,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

const BeforeTextTemplate = (args, { argTypes }) => ({
  components: { GlIcon, GlTruncate },
  props: Object.keys(argTypes),
  template: beforeTextTemplate,
});
export const BeforeText = BeforeTextTemplate.bind({});
BeforeText.args = generateProps({ position: 'start' });
BeforeText.parameters = {
  docs: {
    source: {
      code: beforeTextTemplate,
    },
  },
};

const AfterTextTemplate = (args, { argTypes }) => ({
  components: { GlIcon, GlTruncate },
  props: Object.keys(argTypes),
  template: afterTextTemplate,
});
export const AfterText = AfterTextTemplate.bind({});
AfterText.args = generateProps({ position: 'end' });
AfterText.parameters = {
  docs: {
    source: {
      code: afterTextTemplate,
    },
  },
};

const BothSlotsTemplate = (args, { argTypes }) => ({
  components: { GlIcon, GlTruncate },
  props: Object.keys(argTypes),
  template: bothSlotsTemplate,
});
export const BothSlots = BothSlotsTemplate.bind({});
BothSlots.args = generateProps();
BothSlots.parameters = {
  docs: {
    source: {
      code: bothSlotsTemplate,
    },
  },
};

export default {
  title: 'utilities/truncate',
  component: GlTruncate,
  parameters: {
    knobs: { disable: true },
    storyshots: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
    },
    position: {
      options: Object.values(POSITION),
      control: 'select',
    },
    withTooltip: {
      control: 'boolean',
    },
  },
};
