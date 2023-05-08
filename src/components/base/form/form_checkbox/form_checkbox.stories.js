import GlFormCheckbox from './form_checkbox.vue';
import GlFormCheckboxGroup from './form_checkbox_group.vue';
import readme from './form_checkbox.md';

const components = {
  GlFormCheckbox,
  GlFormCheckboxGroup,
};

const data = () => ({
  selected: ['checked-option', 'checked-disabled-option'],
  indeterminate: true,
});

const template = `
<div>
  <gl-form-checkbox-group v-model="selected">
    <gl-form-checkbox value="option">Option</gl-form-checkbox>
    <gl-form-checkbox value="slot-option">
      Slot option
      <template #help> With help text </template>
    </gl-form-checkbox>
    <gl-form-checkbox value="checked-option">Checked option</gl-form-checkbox>
    <gl-form-checkbox value="checked-disabled-option" :disabled="true">Checked disabled option</gl-form-checkbox>
    <gl-form-checkbox value="disabled-option" :disabled="true">Disabled option</gl-form-checkbox>
    <template #first>
      <gl-form-checkbox value="first">First</gl-form-checkbox>
    </template>
  </gl-form-checkbox-group>
  <gl-form-checkbox value="indeterminate-option" :indeterminate="indeterminate">Indeterminate option</gl-form-checkbox>
  <gl-form-checkbox value="indeterminate-disabled-option" :indeterminate="indeterminate" :disabled="true">Indeterminate disabled option</gl-form-checkbox>
</div>
`;

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components,
  data,
  template,
});

export const Default = Template.bind({});

export default {
  title: 'base/form/form checkbox',
  component: GlFormCheckbox,
  parameters: {
    bootstrapComponent: 'b-form-checkbox',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
