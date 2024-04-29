import { toggleLabelPosition } from '../../../utils/constants';
import { disableControls } from '../../../utils/stories_utils';
import GlToggle from './toggle.vue';
import readme from './toggle.md';

const defaultValue = (prop) => GlToggle.props[prop].default;

const withDescription = 'A dark color theme that is easier on the eyes.';

const longHelp = `This is a toggle component with a long help message.
  You can notice how the text wraps when the width of the container
  is not enough to fix the entire text.`;

const generateProps = ({
  value = true,
  disabled = defaultValue('disabled'),
  isLoading = defaultValue('isLoading'),
  label = 'Dark mode',
  labelId = 'dark-mode-toggle',
  description = '',
  help = 'Toggle dark mode for the website.',
  labelPosition = defaultValue('labelPosition'),
} = {}) => ({
  value,
  disabled,
  isLoading,
  label,
  labelId,
  description,
  help,
  labelPosition,
});

const Template = (args, { argTypes }) => ({
  components: { GlToggle },
  props: Object.keys(argTypes),
  data() {
    return {
      localValue: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.localValue = newValue;
    },
  },
  template: `
  <div class="gl-font-base">
    <gl-toggle
      v-model="localValue"
      :disabled="disabled"
      :description="description"
      :help="help"
      :label-id="labelId"
      :is-loading="isLoading"
      :label="label"
      :label-position="labelPosition"
    />
  </div>`,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithDescription = Template.bind({});
WithDescription.args = generateProps({
  description: withDescription,
});

export const WithLongHelp = Template.bind({});
WithLongHelp.args = generateProps({
  help: longHelp,
});

export const LabelPositionLeft = Template.bind({});
LabelPositionLeft.args = generateProps({
  labelPosition: 'left',
});

export default {
  title: 'base/toggle',
  component: GlToggle,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls(['name']),
    labelPosition: {
      options: Object.keys(toggleLabelPosition),
      control: 'select',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    help: {
      control: 'text',
    },
  },
};
