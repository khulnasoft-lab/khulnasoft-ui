import GlFormTextarea from './form_textarea.vue';
import readme from './form_textarea.md';

const template = `
  <gl-form-textarea
    :value="value"
    :placeholder="placeholder"
    :rows="5"
    :no-resize="noResize"
    :character-count="characterCount"
    @input="onInput"
  >
    <template #character-count-text="{ count }">{{ characterCountText(count) }}</template>
    <template #character-count-over-limit-text="{ count }">{{ characterCountOverLimitText(count) }}</template>
  </gl-form-textarea>
`;

const generateProps = ({
  value = 'We take inspiration from other companies, and we always go for the boring solutions. Just like the rest of our work, we continually adjust our values and strive always to make them better. We used to have more values, but it was difficult to remember them all, so we condensed them and gave sub-values and created an acronym. Everyone is welcome to suggest improvements.',
  placeholder = 'hello',
  noResize = GlFormTextarea.props.noResize.default,
  characterCount = null,
} = {}) => ({
  value,
  placeholder,
  noResize,
  characterCount,
});

const Template = (args, { updateArgs }) => ({
  components: { GlFormTextarea },
  props: Object.keys(args),
  methods: {
    onInput(value) {
      updateArgs({ ...args, value });
    },
    characterCountText(count) {
      return count === 1 ? `${count} character remaining` : `${count} characters remaining`;
    },
    characterCountOverLimitText(count) {
      return count === 1 ? `${count} character over limit` : `${count} characters over limit`;
    },
  },
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = generateProps({
  value: '',
  placeholder: 'hello',
  characterCount: 100,
});

export default {
  title: 'base/form/form-textarea',
  component: GlFormTextarea,
  parameters: {
    bootstrapComponent: 'b-form-textarea',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
