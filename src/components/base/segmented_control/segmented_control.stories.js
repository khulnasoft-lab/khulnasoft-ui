import GlSegmentedControl from './segmented_control.vue';
import readme from './segmented_control.md';

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

const generateProps = ({ options = defaultOptions, initSelected = 'Tacos' } = {}) => ({
  options,
  initSelected,
});

export const Default = (args, { argTypes }) => ({
  components: { GlSegmentedControl },
  props: Object.keys(argTypes),
  data() {
    return {
      selected: this.initSelected,
    };
  },
  watch: {
    initSelected(val) {
      this.selected = val;
    },
  },
  template: `
     <gl-segmented-control
      :options="options"
      v-model="selected"
     />
    `,
});
Default.args = generateProps();

export default {
  title: 'base/segmented control',
  component: GlSegmentedControl,
  parameters: {
    bootstrapComponent: 'b-form-radio-group',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    initSelected: {
      options: Object.values(defaultOptions)
        .filter(({ disabled }) => !disabled)
        .map(({ value }) => value),
      control: 'radio',
      table: {
        disable: true,
      },
    },
  },
};
