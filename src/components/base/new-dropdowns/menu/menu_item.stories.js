import { GlMenuItem } from '../../../../../index';
import readme from './menu_item.md';

const components = {
  GlMenuItem,
};

const generateProps = ({
  iconColor,
  iconName,
  secondaryText,
  href = 'https://gitlab.com/sytses',
}) => ({
  iconColor,
  iconName,
  secondaryText,
  href,
});

export const Default = (args, { argTypes = {} }) => ({
  components,
  props: Object.keys(argTypes),
  template: `
      <ul class="list-unstyled">
          <gl-menu-item :icon-color="iconColor" 
                              :icon-name="iconName" 
                              :secondary-text="secondaryText"
                              :href="href"
                              target="_blank">
              View user Sid Sijbrandij profile
          </gl-menu-item>
      </ul>`,
});
Default.args = generateProps({});

export default {
  title: 'base/new-dropdowns/menu/menu-item',
  component: GlMenuItem,
  parameters: {
    bootstrapComponent: 'b-dropdown-item',
    docs: {
      description: {
        component: readme,
      },
    },
    knobs: {
      disable: true,
    },
  },
};
