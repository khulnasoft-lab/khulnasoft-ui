import { GlProgressBar } from '../../../index';
import { variantOptions } from '../../../utils/constants';

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
    knobs: { disable: true },
    bootstrapComponent: 'b-progress',
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: variantOptions,
      },
    },
  },
};
