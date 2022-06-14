import { tokenList, labelText } from './constants';
import readme from './form_combobox.md';
import GlFormCombobox from './form_combobox.vue';

const getProps = () => ({
  tokenList,
  labelText,
});

const Template = (args) => ({
  components: { GlFormCombobox },
  data: () => {
    return {
      value: '',
    };
  },
  props: Object.keys(args),
  template: `
      <gl-form-combobox
        v-model="value"
        :token-list="tokenList"
        :labelText="labelText"
      />
    `,
});

export const Default = Template.bind({});
Default.args = getProps();

export default {
  title: 'base/form/form-combobox',
  component: GlFormCombobox,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
