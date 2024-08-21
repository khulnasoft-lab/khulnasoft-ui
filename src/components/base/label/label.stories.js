import { tooltipPlacements } from '../../../utils/constants';
import GlLabel from './label.vue';
import readme from './label.md';

const template = `
  <div class="gl-flex">
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

const labelVariantOptions = [
  {
    title: 'UX',
    scoped: false,
    target: '#',
    backgroundColor: '#D10069',
  },
  {
    title: 'accessibility',
    scoped: false,
    target: '#',
    backgroundColor: '#0000FF',
    showCloseButton: true,
  },
  {
    title: 'UX scorecard',
    scoped: false,
    target: '#',
    backgroundColor: '#A8D695',
    showCloseButton: true,
  },
  {
    title: 'devops::secure',
    scoped: true,
    target: '#',
    backgroundColor: '#E44D2A',
    showCloseButton: true,
  },
  {
    title: 'severity::3',
    scoped: true,
    target: '#',
    backgroundColor: '#FFF600',
  },
  {
    title: 'type::maintenance',
    scoped: true,
    target: '#',
    backgroundColor: '#330066',
  },
  {
    title: 'workflow::design',
    scoped: true,
    target: '#',
    backgroundColor: '#428BCA',
  },
  {
    title: 'white',
    scoped: false,
    target: '#',
    backgroundColor: '#ffffff',
    showCloseButton: true,
  },
  {
    title: 'Light grey',
    scoped: false,
    target: '#',
    backgroundColor: '#dddddd',
  },
  {
    title: 'Grey',
    scoped: false,
    target: '#',
    backgroundColor: '#555555',
  },
  {
    title: 'Dark grey',
    scoped: false,
    target: '#',
    backgroundColor: '#111111',
  },
  {
    title: 'black',
    scoped: false,
    target: '#',
    backgroundColor: '#000000',
  },
];

export const Variants = (args, { argTypes }) => ({
  components: { GlLabel },
  props: Object.keys(argTypes),
  template: `
    <div class="gl-flex gl-flex-wrap gl-gap-2">
      <gl-label
        v-for="variant in $options.labelVariantOptions"
        :background-color="variant.backgroundColor"
        :title="variant.title"
        :target="variant.target"
        :scoped="variant.scoped"
        :show-close-button="variant.showCloseButton"
      />
    </div>
  `,
  labelVariantOptions,
});

export const Temp = () => ({
  components: { GlLabel },
  template: `
    <div>
      <div class="gl-display-flex gl-gap-2 gl-mb-3">
        <gl-label
          background-color="#92D4A8"
          title="label"
        />
        <gl-label
          background-color="#92D4A8"
          title="label"
          target="#"
          :show-close-button="true"
        />
        <gl-label
          background-color="#92D4A8"
          title="scoped::label"
          target="#"
          :scoped="true"
          :show-close-button="true"
        />
        <gl-label
          background-color="#0C532A"
          title="label"
        />
        <gl-label
          background-color="#0C532A"
          title="label"
          target="#"
          :show-close-button="true"
        />
        <gl-label
          background-color="#0C532A"
          title="scoped::label"
          target="#"
          :scoped="true"
          :show-close-button="true"
        />
      </div>
      <div class="gl-display-flex gl-gap-2">
        <gl-label
          background-color="#92D4A8"
          :disabled="true"
          title="label"
        />
        <gl-label
          background-color="#92D4A8"
          :disabled="true"
          title="label"
          target="#"
          :show-close-button="true"
        />
        <gl-label
          background-color="#92D4A8"
          :disabled="true"
          title="scoped::label"
          target="#"
          :scoped="true"
          :show-close-button="true"
        />
        <gl-label
          background-color="#0C532A"
          :disabled="true"
          title="label"
        />
        <gl-label
          background-color="#0C532A"
          :disabled="true"
          title="label"
          target="#"
          :show-close-button="true"
        />
        <gl-label
          background-color="#0C532A"
          :disabled="true"
          title="scoped::label"
          target="#"
          :scoped="true"
          :show-close-button="true"
        />
      </div>
    </div>
  `,
});
Temp.tags = ['skip-visual-test'];

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
