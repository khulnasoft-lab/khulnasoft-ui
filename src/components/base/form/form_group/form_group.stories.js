import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../../documentation/documented_stories';
import { GlFormGroup } from '../../../../../index';
import { sizeOptions } from '../../../../utils/constants';
import readme from './form_group.md';

const components = {
  GlFormGroup,
};

function generateProps({
  id = 'group-1',
  label = 'Label Name',
  description = 'form group description',
  labelDescription = 'form label description',
  horizontal = false,
} = {}) {
  return {
    id: {
      type: String,
      default: text('id', id),
    },
    label: {
      type: String,
      default: text('label', label),
    },
    labelSize: {
      type: String,
      default: select('label-size', sizeOptions, sizeOptions.sm),
    },
    description: {
      type: String,
      default: text('description', description),
    },
    labelDescription: {
      type: String,
      default: text('label-description', labelDescription),
    },
    horizontal: {
      type: Boolean,
      default: boolean('horizontal', horizontal),
    },
  };
}

documentedStoriesOf('base/form/form-group', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-form-group
        :id="id"
        :label="label"
        :label-size="labelSize"
        :description="description"
        :horizontal="horizontal"
        label-for="label1"
      >
        <gl-form-input id="input1" />
      </gl-form-group>
    `,
  }))
  .add('disabled', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-form-group
        id="group-id"
        label="Label Name"
        label-size="sm"
        description="This feature is disabled"
        label-for="input1"
      >
        <gl-form-input id="input1"  type="text" :disabled="true" value="Disabled" />
      </gl-form-group>
    `,
  }))
  .add('with textarea', () => ({
    template: `
      <gl-form-group id="group-id-textarea2" label="Label Name" label-for="textarea2">
        <gl-form-textarea id="textarea2" placeholder="Enter something" />
      </gl-form-group>
    `,
  }))
  .add('with label description', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-form-group
        :id="id"
        :label="label"
        :label-size="labelSize"
        :description="description"
        :label-description="labelDescription"
        :horizontal="horizontal"
        label-for="label1"
      >
        <gl-form-input id="input1" />
      </gl-form-group>
    `,
  }))
  .add('with validations', () => ({
    props: generateProps({ label: 'Name', description: 'Enter a first and last name.' }),
    components,
    computed: {
      state() {
        return this.name.length >= 4;
      },
      invalidFeedback() {
        let feedbackText = 'This field is required.';

        if (this.name.length > 4) {
          feedbackText = '';
        } else if (this.name.length > 0) {
          feedbackText = 'Enter at least 4 characters.';
        }

        return feedbackText;
      },
    },
    data() {
      return {
        name: '',
      };
    },
    template: `
    <gl-form-group
      :id="id"
      :label="label"
      :label-size="labelSize"
      :description="description"
      :invalid-feedback="invalidFeedback"
      :state="state"
      label-for="label1"
    >
      <gl-form-input id="input1" :state="state" v-model.trim="name" />
    </gl-form-group>
    `,
  }));
