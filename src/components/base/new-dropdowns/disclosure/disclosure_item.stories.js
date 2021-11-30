import { GlDisclosureItem } from '../../../../../index';
import readme from './disclosure_item.md';

const components = {
  GlDisclosureItem,
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
          <gl-disclosure-item :icon-color="iconColor" 
                              :icon-name="iconName" 
                              :secondary-text="secondaryText"
                              :href="href"
                              target="_blank">
              View user Sid Sijbrandij profile
          </gl-disclosure-item>
      </ul>`,
});
Default.args = generateProps({});

export default {
  title: 'base/new-dropdowns/disclosure/disclosure-item',
  component: GlDisclosureItem,
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
