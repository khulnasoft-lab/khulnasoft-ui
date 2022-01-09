import readme from './listbox.md';
import GlListbox from './listbox.vue';

const defaultValue = (prop) => GlListbox.props[prop].default;

const generateProps = ({
  split = defaultValue('split'),
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  block = defaultValue('block'),
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  right = defaultValue('right'),
} = {}) => ({
  split,
  category,
  variant,
  size,
  block,
  disabled,
  loading,
  right,
});

const Template = (template, props) => ({
  components: { GlListbox },
  props: Object.keys(props),
  data() {
    return {};
  },
  watch: {},
  template,
});

const defaultTemplate = `
  <gl-listbox
    :split="split"
    :category="category"
    :variant="variant"
    :size="size"
    :block="block"
    :disabled="disabled"
    :loading="loading"
    :right="right"
  />
`;
export const Default = Template.bind({}, defaultTemplate);
Default.args = generateProps();

export default {
  followsDesignSystem: true,
  title: 'base/listbox',
  component: GlListbox,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
