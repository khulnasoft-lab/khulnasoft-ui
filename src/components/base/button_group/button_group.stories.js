import GlButton from '../button/button.vue';
import GlDisclosureDropdown from '../new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlCollapsibleListbox from '../new_dropdowns/listbox/listbox.vue';
import {
  buttonCategoryOptions,
  buttonSizeOptions,
  buttonVariantOptions,
} from '../../../utils/constants';
import GlButtonGroup from './button_group.vue';
import readme from './button_group.md';

const defaultValue = (prop) => GlButton.props[prop].default;

const generateProps = ({
  vertical = false,
  category = buttonCategoryOptions.primary,
  size = defaultValue('size'),
  variant = 'default',
} = {}) => ({
  vertical,
  category,
  size,
  variant,
});

const template = `
  <gl-button-group :vertical="vertical">
    <gl-button :category="category" :size="size" :variant="variant">Button 1</gl-button>
    <gl-button :category="category" :size="size" :variant="variant">Button 2</gl-button>
    <gl-button :category="category" :size="size" :variant="variant">Button 3</gl-button>
  </gl-button-group>`;

const Template = (args, { argTypes }) => ({
  components: { GlButton, GlButtonGroup },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const SplitDropdowns = (args, { argTypes }) => ({
  components: { GlButton, GlButtonGroup, GlCollapsibleListbox, GlDisclosureDropdown },
  props: Object.keys(argTypes),
  data() {
    return {
      firstListboxValue: 1,
      secondListboxValue: 1,
      items: [
        { text: 'One', value: 1 },
        { text: 'Two', value: 2 },
      ],
    };
  },
  template: `
    <div class="gl-display-flex gl-flex-direction-column gl-gap-6 gl-align-items-flex-start">
      <gl-button-group>
        <gl-button
          :disabled="disabled"
          :category="category"
          :size="size"
          :variant="variant"
        >Split disclosure</gl-button>

        <gl-disclosure-dropdown
          :disabled="disabled"
          :items="items"
          toggle-text="Other actions"
          text-sr-only
          :category="category"
          :size="size"
          :variant="variant"
        />
      </gl-button-group>

      <gl-button-group>
        <gl-button
          :disabled="disabled"
          :category="category"
          :size="size"
          :variant="variant"
        >Split listbox</gl-button>

        <gl-collapsible-listbox
          v-model="secondListboxValue"
          :disabled="disabled"
          :items="items"
          toggle-text="Choose button action"
          text-sr-only
          :category="category"
          :size="size"
          :variant="variant"
        />
      </gl-button-group>
    </div>
  `,
});
Object.assign(SplitDropdowns, {
  args: { ...generateProps({ variant: 'confirm' }), disabled: false },
  parameters: {
    controls: {
      include: ['category', 'disabled', 'size', 'variant'],
    },
  },
});

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
  argTypes: {
    category: {
      options: Object.keys(buttonCategoryOptions),
      control: 'select',
    },
    size: {
      options: Object.keys(buttonSizeOptions),
      control: 'select',
    },
    variant: {
      options: Object.keys(buttonVariantOptions),
      control: 'select',
    },
  },
};
