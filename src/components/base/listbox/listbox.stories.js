import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
  dropdownVariantOptions,
} from '../../../utils/constants';
import readme from './listbox.md';
import GlListbox from './listbox_base.vue';

const defaultValue = (prop) => GlListbox.props[prop].default;

function openDropdown(component) {
  component.$nextTick(() => component.$el.querySelector('.dropdown-toggle').click());
}

const generateProps = ({
  text = defaultValue('text'),
  textSrOnly = defaultValue('textSrOnly'),
  split = defaultValue('split'),
  category = defaultValue('category'),
  variant = defaultValue('variant'),
  size = defaultValue('size'),
  icon = defaultValue('icon'),
  block = defaultValue('block'),
  disabled = defaultValue('disabled'),
  loading = defaultValue('loading'),
  toggleClass = defaultValue('toggleClass'),
  right = defaultValue('right'),
} = {}) => ({
  text,
  textSrOnly,
  split,
  category,
  variant,
  size,
  icon,
  block,
  disabled,
  loading,
  toggleClass,
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
  mounted() {
    openDropdown(this);
  },
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
  >
    Dropdown Content
    <template #button-content>
      Dropdown Button
    </template>
  </gl-listbox>
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
  argTypes: {
    category: {
      options: Object.keys(buttonCategoryOptions),
      control: {
        type: 'select',
        labels: buttonCategoryOptions,
      },
    },
    variant: {
      options: Object.keys(dropdownVariantOptions),
      control: {
        type: 'select',
        labels: buttonVariantOptions,
      },
    },
    size: {
      options: Object.keys(buttonSizeOptions),
      control: {
        type: 'select',
        labels: buttonSizeOptions,
      },
    },
  },
};
