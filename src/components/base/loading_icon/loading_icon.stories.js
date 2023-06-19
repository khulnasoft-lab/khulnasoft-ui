import { viewModeOptions, loadingIconSizes, loadingIconVariants } from '../../../utils/constants';
import GlLoadingIcon from './loading_icon.vue';
import readme from './loading_icon.md';

const template = `
  <div :class="['gl-p-3', 'gl-rounded-base', 'gl-text-center', { 'bg-dark' : color === 'light' } ]" >
    <gl-loading-icon
      :label="label"
      :size="size"
      :inline="inline"
      :color="color"
      :variant="variant"
    />Loading
  </div>
`;

const defaultValue = (prop) => GlLoadingIcon.props[prop].default;

const generateProps = () => ({
  label: defaultValue('label'),
  size: defaultValue('size'),
  color: defaultValue('color'),
  inline: defaultValue('inline'),
  variant: defaultValue('variant'),
});

const Template = (args) => ({
  components: { GlLoadingIcon },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/loading icon',
  component: GlLoadingIcon,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    color: {
      options: viewModeOptions,
      control: 'select',
    },
    size: {
      options: loadingIconSizes,
      control: 'select',
    },
    variant: {
      options: loadingIconVariants,
      control: 'select',
    },
  },
};
