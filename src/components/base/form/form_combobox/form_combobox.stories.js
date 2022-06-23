import { stringTokenList, labelText, objectTokenList, actionsList } from './constants';
import readme from './form_combobox.md';
import GlFormCombobox from './form_combobox.vue';

const template = `
  <gl-form-combobox
    v-model="value"
    ref="combobox"
    :token-list="tokenList"
    :label-text="labelText"
    :match-value-to-attr="matchValueToAttr"
    :action-list="actionList"
  />`;

const generateProps = ({
  tokenList = stringTokenList,
  matchValueToAttr = undefined,
  actionList = undefined,
} = {}) => ({
  tokenList,
  labelText,
  matchValueToAttr,
  actionList,
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
    this.$nextTick(() => this.$refs.combobox.openSuggestions(objectTokenList));
  },
  data: () => {
    return {
      value: ' ',
    };
  },
  template: `
    <gl-form-combobox
      v-model="value"
      ref="combobox"
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

export const WithActions = (args, { argTypes }) => ({
  components: { GlFormCombobox },
  props: Object.keys(argTypes),
  mounted() {
    this.$nextTick(() => this.$refs.combobox.openSuggestions(['dog']));
  },
  data: () => {
    return {
      value: 'dog',
    };
  },
  template,
});
WithActions.args = generateProps({
  tokenList: stringTokenList,
  actionList: actionsList,
});

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
