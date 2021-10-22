import { GlToggle } from '../../../../index';
import { toggleLabelPosition } from '../../../utils/constants';
import readme from './toggle.md';

const defaultValue = (prop) => GlToggle.props[prop].default;

const generateProps = ({
  value = true,
  disabled = defaultValue('disabled'),
  isLoading = defaultValue('isLoading'),
  label = 'Dark mode',
  labelId = 'dark-mode-toggle',
  help = 'Toggle dark mode for the website',
  labelPosition = defaultValue('labelPosition'),
} = {}) => ({
  value,
  disabled,
  isLoading,
  label,
  labelId,
  help,
  labelPosition,
});

const Template = (args, { argTypes }) => ({
  components: { GlToggle },
  props: Object.keys(argTypes),
  template: `
  <div class="gl-font-base">
    <gl-toggle
      v-model="value"
      :disabled="disabled"
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
    labelPosition: {
      control: {
        type: 'select',
        options: toggleLabelPosition,
      },
    },
    label: {
      control: {
        type: 'text',
      },
    },
    help: {
      control: {
        type: 'text',
      },
    },
    name: {
      control: { disable: true },
    },
  },
};
