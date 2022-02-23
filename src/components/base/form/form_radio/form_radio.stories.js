import { GlFormRadio } from '../../../../index';
import readme from './form_radio.md';

const defaultOptions = [
  { value: 'Pizza', text: 'Pizza' },
  { value: 'Tacos', text: 'Tacos' },
  { value: 'Burger', text: 'Burger', disabled: true },
];

const generateProps = ({ name = 'radio-group-name', checked = defaultOptions[0].value } = {}) => ({
  name,
  checked,
});

const Template = (args) => ({
  components: { GlFormRadio },
  props: Object.keys(args),
  template: `
      <div>
        <gl-form-radio
          v-for="option in options"
          :key="option.value"
          :checked="checked"
          :value="option.value"
          :disabled="option.disabled"
          :name="name"
          @change="handleEvent('change', $event)"
          @input="handleEvent('input', $event)"
        >{{ option.text }}</gl-form-radio>
        <h3 class="mt-5">Events log:</h3>
        <p v-if="!events.length">nothing happened yet</p>
        <ul v-else>
          <li v-for="event in events">{{ event }}</li>
        </ul>
      </div>
    `,
  data() {
    return {
      options: defaultOptions,
      events: [],
    };
  },
  methods: {
    handleEvent(type, value) {
      this.events.push({ [type]: value });
    },
  },
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/form/form-radio',
  component: GlFormRadio,
  parameters: {
    bootstrapComponent: 'b-form-radio',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    checked: {
      options: defaultOptions.map(({ value }) => value),
      control: {
        type: 'select',
      },
    },
  },
};
