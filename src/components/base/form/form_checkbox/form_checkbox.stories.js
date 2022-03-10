import { GlFormCheckbox, GlFormCheckboxGroup } from '../../../../index';
import readme from './form_checkbox.md';

const components = {
  GlFormCheckbox,
  GlFormCheckboxGroup,
};

const template = `
  <gl-form-checkbox-group>
    <template #first>
      <gl-form-checkbox value="Slot option">
        Slot option with help text
        <template #help>
          Help text
        </template>
      </gl-form-checkbox>
    </template>
    <gl-form-checkbox value="Last option">Last option</gl-form-checkbox>
  </gl-form-checkbox-group>
`;

const Template = () => ({
  components,
  template,
});

export const Default = Template.bind({});

export default {
  title: 'base/form/form checkbox',
  component: GlFormCheckbox,
  parameters: {
    knobs: { disable: true },
    bootstrapComponent: 'b-form-checkbox',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
