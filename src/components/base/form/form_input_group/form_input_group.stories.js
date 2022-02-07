import { withKnobs, boolean, object, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormInputGroup, GlInputGroupText } from '../../../../index';
import readme from './form_input_group.md';

const components = {
  GlFormInputGroup,
  GlInputGroupText,
};
const predefinedOptions = [
  { name: 'Embed', value: 'https://embed.com' },
  { name: 'Share', value: 'https://share.org' },
];

documentedStoriesOf('base/form/form-input-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: {
      prepend: {
        default: text('Prepend text', 'Username'),
      },
      append: {
        default: text('Append text', 'Add'),
      },
      readonly: {
        default: boolean('Readonly', false),
      },
      select: {
        default: boolean('Select text on click', false),
      },
    },
    template: `
      <gl-form-input-group :readonly="readonly" :select-on-click="select">
        <template #prepend v-if="prepend">
          <gl-input-group-text>{{prepend}}</gl-input-group-text>
        </template>
        <template #append v-if="append">
          <gl-input-group-text>{{append}}</gl-input-group-text>
        </template>
      </gl-form-input-group>
    `,
  }))
  .add('with predefined options', () => ({
    components,
    props: {
      prepend: {
        default: text('Prepend text', ''),
      },
      append: {
        default: text('Append text', 'Add'),
      },
      readonly: {
        default: boolean('Readonly', false),
      },
      select: {
        default: boolean('Select text on click', false),
      },
      options: {
        default: object('Predefined options', predefinedOptions),
      },
    },
    template: `
      <gl-form-input-group :readonly="readonly" :select-on-click="select" :predefined-options="options">
        <template #prepend v-if="prepend">
          <gl-input-group-text>{{prepend}}</gl-input-group-text>
        </template>
        <template #append v-if="append">
          <gl-input-group-text>{{append}}</gl-input-group-text>
        </template>
      </gl-form-input-group>
    `,
  }));
