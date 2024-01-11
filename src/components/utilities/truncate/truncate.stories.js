import GlTruncate from './truncate.vue';
import { POSITION } from './constants';
import readme from './truncate.md';

const template = '<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip" />';

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

export default {
  title: 'utilities/truncate',
  component: GlTruncate,
  tags: ['skip-visual-test'],
  parameters: {
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
