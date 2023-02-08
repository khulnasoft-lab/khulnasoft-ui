import { GlFormGroup, GlFormInput, GlFormTextarea } from '../../../../index';
import { disableControls } from '../../../../utils/stories_utils';
import readme from './form_group.md';

const components = {
  GlFormGroup,
};

const generateProps = ({
  id = 'group-1',
  label = 'Label Name',
  description = '',
  helpText = 'form group help text',
  labelDescription = '',
  optional = GlFormGroup.props.optional.default,
  optionalText = GlFormGroup.props.optionalText.default,
} = {}) => ({
  id,
  label,
  labelDescription,
  optional,
  optionalText,
  description,
  helpText,
});

const wrap = (template, bindings = '') => `
  <gl-form-group
    :id="id +  '_group'"
    :label="label"
    :label-description="labelDescription"
    :optional="optional"
    :optional-text="optionalText"
    :description="description"
    :help-text="helpText"
    ${bindings}
    :label-for="id">
    ${template}
  </gl-form-group>
`;

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id" />'),
});

Default.args = generateProps();

export const Disabled = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id"  type="text" value="Disabled" disabled />'),
});
Disabled.args = generateProps({ description: 'This feature is disabled' });

export const WithTextarea = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormTextarea },
  template: wrap('<gl-form-textarea :id="id" placeholder="Enter something" />'),
});
WithTextarea.args = generateProps({
  id: 'textarea2',
  optional: true,
  description: '',
});

export const WithLabelDescription = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: wrap('<gl-form-input :id="id" />'),
});
WithLabelDescription.args = generateProps({
  optional: true,
  labelDescription: 'form label description',
});

export const WithValidations = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ...components, GlFormInput },
  template: `
    <div>
      ${wrap(
        '<gl-form-input :id="id" :state="false" />',
        'invalid-feedback="This field is required."'
      )}
      ${wrap(
        '<gl-form-input :id="id" :state="true" value="Sidney Jones" />',
        'valid-feedback="This field is valid."'
      )}
    </div>
  `,
});
WithValidations.args = generateProps({
  label: 'Name',
  description: 'Enter a first and last name.',
});

export default {
  title: 'base/form/form-group',
  component: GlFormGroup,
  parameters: {
    bootstrapComponent: 'b-form-group',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    ...disableControls(['labelClass']),
    label: {
      control: 'text',
    },
  },
};
