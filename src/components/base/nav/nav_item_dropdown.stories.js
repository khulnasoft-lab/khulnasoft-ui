import { withKnobs } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlNav, GlNavItemDropdown, GlDropdownItem, GlDropdownDivider } from '../../../../index';
import readme from './nav_item_dropdown.md';

const components = {
  GlNav,
  GlNavItemDropdown,
  GlDropdownItem,
};

documentedStoriesOf('base/nav/nav-item-dropdown', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <gl-dropdown-item>One</gl-dropdown-item>
          <gl-dropdown-item>Two</gl-dropdown-item>
          <gl-dropdown-item>Three</gl-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }))
  .add('with divider', () => ({
    components: { ...components, GlDropdownDivider },
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <gl-dropdown-item>Above divider</gl-dropdown-item>
          <gl-dropdown-divider />
          <gl-dropdown-item>Below divider</gl-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }))
  .add('custom button', () => ({
    components,
    template: `
      <gl-nav>
        <gl-nav-item-dropdown text="Dropdown">
          <template #button-content>
            <gl-icon name="question" />
            <gl-icon name="angle-down" />
          </template>
          <gl-dropdown-item>One</gl-dropdown-item>
          <gl-dropdown-item>Two</gl-dropdown-item>
        </gl-nav-item-dropdown>
      </gl-nav>
    `,
  }));
