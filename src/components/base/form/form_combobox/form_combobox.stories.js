import { stringTokenList, labelText, objectTokenList } from './constants';
import readme from './form_combobox.md';
import GlFormCombobox from './form_combobox.vue';

const template = `
  <gl-form-combobox
    v-model="value"
    :token-list="tokenList"
    :label-text="labelText"
    :match-value-to-attr="matchValueToAttr"
  />`;

const generateProps = ({ tokenList = stringTokenList, matchValueToAttr = undefined } = {}) => ({
  tokenList,
  labelText,
  matchValueToAttr,
});

const Template = (args) => ({
  components: { GlFormCombobox },
  data: () => {
    return {
      value: '',
    };
  },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithObjectValue = (args, { argTypes }) => ({
  components: { GlFormCombobox },
  props: Object.keys(argTypes),
  mounted() {
    document.querySelector('.gl-form-input').focus();
  },
  data: () => {
    return {
      value: '',
    };
  },
  template: `
    <gl-form-combobox
      v-model="value"
      :token-list="tokenList"
      :label-text="labelText"
      :match-value-to-attr="matchValueToAttr"
    >
      <template #result="{ item }">
        <div class="gl-display-flex">
          <div class="gl-text-gray-400 gl-mr-4">{{ item.id }}</div>
          <div>{{ item.title }}</div>
        </div>
      </template>
    </gl-form-combobox>
  `,
});
WithObjectValue.args = generateProps({ tokenList: objectTokenList, matchValueToAttr: 'title' });

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
