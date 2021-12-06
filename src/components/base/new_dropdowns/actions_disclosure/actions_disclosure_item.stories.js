import { GlActionsDisclosureItem } from '../../../../../index';
import readme from './actions_disclosure_item.md';

const components = {
  GlActionsDisclosureItem,
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
          <gl-actions-disclosure-item :icon-color="iconColor" 
                              :icon-name="iconName" 
                              :secondary-text="secondaryText"
                              :href="href"
                              target="_blank">
              View user Sid Sijbrandij profile
          </gl-actions-disclosure-item>
      </ul>`,
});
Default.args = generateProps({});

export default {
  title: 'base/new-dropdowns/action-disclosure/actions-disclosure-item',
  component: GlActionsDisclosureItem,
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
