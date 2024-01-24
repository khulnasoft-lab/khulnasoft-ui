import GlColorContrast from './color_contrast.vue';
import readme from './color_contrast.md';

const components = { GlColorContrast };

const generateProps = ({ foreground = '#ffffff', background = '#1f75cb' } = {}) => ({
  foreground,
  background,
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
    <gl-color-contrast
      :foreground="foreground"
      :background="background"
    />
  `,
});
Default.args = generateProps();

export default {
  title: 'internal/color_contrast',
  component: GlColorContrast,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    foreground: {
      control: 'color',
    },
    background: {
      control: 'color',
    },
  },
};
