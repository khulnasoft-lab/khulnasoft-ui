import {
  GlNav,
  GlNavItem,
  GlNavItemDropdown,
  GlDropdownItem,
  GlDropdownDivider,
  GlIcon,
} from '../../../../index';
import readme from './nav.md';

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    GlNav,
    GlNavItem,
    GlNavItemDropdown,
    GlDropdownItem,
    GlDropdownDivider,
    GlIcon,
  },
  template: `
    <div style="height: 150px">
      <gl-nav>
        <gl-nav-item active>Active</gl-nav-item>
        <gl-nav-item>Link</gl-nav-item>
        <gl-nav-item-dropdown text="Dropdown">
          <gl-dropdown-item>Above divider</gl-dropdown-item>
          <gl-dropdown-divider />
          <gl-dropdown-item>Below divider</gl-dropdown-item>
        </gl-nav-item-dropdown>
        <gl-nav-item-dropdown text="Dropdown">
          <template #button-content>
            <gl-icon name="question" />
            <gl-icon name="angle-down" />
          </template>
          <gl-dropdown-item>One</gl-dropdown-item>
          <gl-dropdown-item>Two</gl-dropdown-item>
        </gl-nav-item-dropdown>
        <gl-nav-item disabled>Disabled</gl-nav-item>
      </gl-nav>
    </div>`,
});

export default {
  title: 'base/nav',
  component: GlNav,
  subcomponents: {
    GlNavItem,
    GlNavItemDropdown,
  },
  parameters: {
    bootstrapComponent: 'b-nav',
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
