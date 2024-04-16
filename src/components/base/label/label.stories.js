import { tooltipPlacements } from '../../../utils/constants';
import GlLabel from './label.vue';
import readme from './label.md';

const template = `
  <div class="gl-display-flex">
    <gl-label
      :background-color="backgroundColor"
      :title="title"
      :description="description"
      :tooltip-placement="tooltipPlacement"
      :target="target"
      :scoped="scoped"
      :show-close-button="showCloseButton"
      :disabled="disabled"
    />
  </div>`;

const Template = (args, { argTypes }) => ({
  components: { GlLabel },
  props: Object.keys(argTypes),
  template,
});

const generateProps = ({
  title = 'Label title',
  tooltipPlacement = tooltipPlacements.top,
  scoped = false,
  description = '',
  target = '#',
  backgroundColor = '#D9C2EE',
  showCloseButton = false,
  disabled = false,
} = {}) => ({
  backgroundColor,
  title,
  description,
  tooltipPlacement,
  target,
  scoped,
  showCloseButton,
  disabled,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Scoped = Template.bind({});
Scoped.args = generateProps({ title: 'scoped::label', scoped: true });

export const WithCloseButton = Template.bind({});
WithCloseButton.args = generateProps({ showCloseButton: true });

export const WithoutTarget = Template.bind({});
WithoutTarget.args = generateProps({ target: '' });

export default {
  title: 'base/label',
  component: GlLabel,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
    tooltipPlacement: {
      options: tooltipPlacements,
      control: 'select',
    },
  },
};
