import readme from './markdown.md';
import GlMarkdown from './markdown.vue';
import markdownTypescaleDemoContent from './markdown_typescale_demo.html';

const template = `
  <gl-markdown :compact="compact">${markdownTypescaleDemoContent}</gl-markdown> 
  `;

const generateProps = ({ compact = false } = {}) => ({ compact });

const Template = (args, { argTypes }) => ({
  components: { GlMarkdown },
  props: Object.keys(argTypes),
  template,
});

export const Typescale = Template.bind({});
Typescale.args = generateProps();

export default {
  title: 'base/markdown',
  component: GlMarkdown,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: { disabled: true },
  },
};
