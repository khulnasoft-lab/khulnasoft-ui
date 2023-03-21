import { variantOptions } from '../../../utils/constants';
import GlProgressBar from './progress_bar.vue';

const generateProps = ({ value = 30, variant = variantOptions.primary } = {}) => ({
  value,
  variant,
});

const Template = (args, { argTypes }) => ({
  components: { GlProgressBar },
  props: Object.keys(argTypes),
  template: '<gl-progress-bar :value="value" :variant="variant" />',
});

export const Default = Template.bind({});
Default.args = generateProps();

export const SuccessVariant = Template.bind({});
SuccessVariant.args = generateProps({ variant: variantOptions.success });
SuccessVariant.parameters = { controls: { disabled: true } };

export default {
  title: 'base/progress-bar',
  component: GlProgressBar,
  parameters: {
    bootstrapComponent: 'b-progress',
  },
  argTypes: {
    variant: {
      options: variantOptions,
      control: 'select',
    },
  },
};
