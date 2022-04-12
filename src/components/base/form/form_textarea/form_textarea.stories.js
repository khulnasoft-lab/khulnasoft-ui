import { GlFormTextarea } from '../../../../index';
import { textareaCountOptions } from '../../../../utils/constants';
import readme from './form_textarea.md';

const template = `
  <gl-form-textarea
    v-model="model"
    :placeholder="placeholder"
    :rows="5"
    :no-resize="noResize"
    :count="count"
    :countType="countType"
    :character-count-text="characterCountText"
    :character-count-over-limit-text="characterCountOverLimitText"
  />
`;

const generateProps = ({
  model = 'We take inspiration from other companies, and we always go for the boring solutions. Just like the rest of our work, we continually adjust our values and strive always to make them better. We used to have more values, but it was difficult to remember them all, so we condensed them and gave sub-values and created an acronym. Everyone is welcome to suggest improvements.',
  placeholder = 'hello',
  noResize = GlFormTextarea.props.noResize.default,
  count = 400,
  countType = textareaCountOptions.max,
  characterCountText = '%{count} characters left',
  characterCountOverLimitText = '%{count} characters over limit',
} = {}) => ({
  model,
  placeholder,
  noResize,
  count,
  countType,
  characterCountText,
  characterCountOverLimitText,
});

const Template = (args) => ({
  components: { GlFormTextarea },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/form/form-textarea',
  component: GlFormTextarea,
  parameters: {
    bootstrapComponent: 'b-form-textarea',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    countType: {
      control: {
        type: 'select',
        options: textareaCountOptions,
      },
    },
  },
};
