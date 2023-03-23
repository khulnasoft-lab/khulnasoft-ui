import GlButton from '../button/button.vue';
import GlDropdown from '../dropdown/dropdown.vue';
import GlDropdownItem from '../dropdown/dropdown_item.vue';
import GlButtonGroup from './button_group.vue';
import readme from './button_group.md';

const generateProps = ({ vertical = false } = {}) => ({ vertical });

const template = `
  <gl-button-group :vertical="vertical">
    <gl-button>Button 1</gl-button>
    <gl-button>Button 2</gl-button>
    <gl-dropdown text="Some dropdown">
      <gl-dropdown-item>First item</gl-dropdown-item>
      <gl-dropdown-item>Second item</gl-dropdown-item>
      <gl-dropdown-item>Last item</gl-dropdown-item>
    </gl-dropdown>
  </gl-button-group>`;

const Template = (args, { argTypes }) => ({
  components: { GlButton, GlButtonGroup, GlDropdown, GlDropdownItem },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/button group',
  component: GlButtonGroup,
  parameters: {
    bootstrapComponent: 'b-button-group',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
