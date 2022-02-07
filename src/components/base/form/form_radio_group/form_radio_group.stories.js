import { withKnobs, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormRadioGroup, GlFormRadio } from '../../../../index';
import readme from './form_radio_group.md';

const components = {
  GlFormRadioGroup,
  GlFormRadio,
};

const defaultOptions = [
  { value: 'pizza', text: 'Pizza' },
  { value: 'tacos', text: 'Tacos' },
  { value: 'burger', text: 'Burger', disabled: true },
];

function generateProps({ name = 'radio-group-name', options = defaultOptions } = {}) {
  return {
    name: {
      type: String,
      default: text('name', name),
    },
    options: {
      default: object('options', options),
    },
  };
}

const template = `
  <div>
    <gl-form-radio-group
      v-model="selected"
      :options="options"
      :name="name"
    >
      <template #first>
        <gl-form-radio value="slot-option">
          Slot option with help text
          <template #help>
            Help text
          </template>
        </gl-form-radio>
      </template>
      <gl-form-radio value="Last option">Last option</gl-form-radio>
    </gl-form-radio-group>
  </div>`;

const data = () => ({ selected: 'slot-option' });

documentedStoriesOf('base/form/form-radio-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    data,
    template,
  }));
