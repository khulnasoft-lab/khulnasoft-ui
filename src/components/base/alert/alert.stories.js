import GlToggle from '../toggle/toggle.vue';
import { alertVariantOptions } from '../../../utils/constants';
import GlAlert from './alert.vue';
import readme from './alert.md';

const template = `
  <gl-alert
    :title="title"
    :dismissible="dismissible"
    :show-icon="showIcon"
    :dismiss-label="dismissLabel"
    :variant="variant"
    :primary-button-text="primaryButtonText"
    :secondary-button-text="secondaryButtonText"
    :primary-button-link="primaryButtonLink"
    :secondary-button-link="secondaryButtonLink"
    :sticky="sticky"
  >{{ message }}</gl-alert>`;

const defaultValue = (prop) => GlAlert.props[prop].default;

const generateProps = ({
  title = defaultValue('title'),
  variant = defaultValue('variant'),
  dismissible = defaultValue('dismissible'),
  showIcon = defaultValue('showIcon'),
  dismissLabel = defaultValue('dismissLabel'),
  primaryButtonText = defaultValue('primaryButtonText'),
  primaryButtonLink = defaultValue('primaryButtonLink'),
  secondaryButtonText = defaultValue('secondaryButtonText'),
  secondaryButtonLink = defaultValue('secondaryButtonLink'),
  sticky = defaultValue('sticky'),
} = {}) => ({
  title,
  message: 'Lorem ipsum dolor sit amet',
  variant,
  dismissible,
  showIcon,
  dismissLabel,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  sticky,
});

const Template = (args, { argTypes }) => ({
  components: { GlAlert },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const TitledWarning = Template.bind({});
TitledWarning.args = generateProps({
  title: 'A warning',
  variant: alertVariantOptions.warning,
});

export const UndismissibleDangerWithActions = Template.bind({});
UndismissibleDangerWithActions.args = generateProps({
  variant: alertVariantOptions.danger,
  dismissible: false,
  primaryButtonText: 'Primary action',
  secondaryButtonText: 'Secondary action',
  secondaryButtonLink: '#',
});

export const CustomActions = () => ({
  components: { GlAlert, GlToggle },
  data: () => ({
    toggle: false,
  }),
  template: `
    <gl-alert>
      Lorem ipsum dolor sit amet
      <template #actions>
        <gl-toggle v-model="toggle" label="label-name" label-position="hidden" />
      </template>
    </gl-alert>`,
});
CustomActions.tags = ['skip-visual-test'];

export const TextLinks = () => ({
  components: { GlAlert },
  template: `
    <gl-alert>
      Lorem ipsum dolor sit <a class="gl-link" href="#">text link</a> amet
    </gl-alert>`,
});
TextLinks.tags = ['skip-visual-test'];

export const NoIcon = () => ({
  components: { GlAlert },
  template: `
    <gl-alert :show-icon="false">
      Lorem ipsum dolor sit amet
    </gl-alert>`,
});
NoIcon.tags = ['skip-visual-test'];

export const Variants = () => ({
  components: { GlAlert },
  variants: alertVariantOptions,
  template: `
  <div>
    <gl-alert
      v-for="variant in $options.variants"
      :key="variant"
      :variant="variant"
      title="Alert title"
      primary-button-text="Primary"
      secondary-button-text="Secondary"
      class="mb-2"
    >
      <span class="text-capitalize">{{ variant }}</span> lorem ipsum dolor sit
      <gl-link href="#">text link</gl-link> amet
    </gl-alert>
  </div>`,
});
Variants.tags = ['skip-visual-test'];

export const Sticky = () => ({
  components: { GlAlert },
  variants: alertVariantOptions,
  data: () => generateProps({ sticky: true }),
  template: `
  <div style="max-height: 200px; overflow-y: auto;">
    ${template}
    <div style="height: 200px;" class="gl-bg-red-100 gl-my-3"><p>Scrolling content…</p></div>
    <div style="height: 200px;" class="gl-bg-green-100 gl-my-3"><p>Scrolling content…</p></div>
    <div style="height: 200px;" class="gl-bg-blue-100 gl-my-3"><p>Scrolling content…</p></div>
  </div>`,
});

export const IncreasedSpacing = (args, { argTypes }) => ({
  components: { GlAlert },
  props: Object.keys(argTypes),
  template: `
    <div style="--gl-alert-padding-x: 0.5rem;">
      <gl-alert>
        Lorem ipsum dolor sit <a class="gl-link" href="#">text link</a> amet
      </gl-alert>
    </div>`,
});
IncreasedSpacing.args = generateProps();

export default {
  title: 'base/alert',
  component: GlAlert,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: alertVariantOptions,
      control: 'select',
    },
  },
};
