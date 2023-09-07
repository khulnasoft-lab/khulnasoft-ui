import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlSingleStat } from '../../../charts';
import { badgeVariantOptions } from '../../../utils/constants';
import readme from './single_stat.md';

const generateProps = ({
  variant = GlSingleStat.props.variant.default,
  title = 'Single stat',
  value = '100',
  unit = '',
  useDelimiters = false,
  metaText = '',
  metaIcon = null,
  titleIcon = null,
  shouldAnimate = false,
  animationDecimalPlaces = 0,
  titleIconClass = '',
} = {}) => ({
  variant,
  title,
  value,
  unit,
  useDelimiters,
  metaText,
  metaIcon,
  titleIcon,
  shouldAnimate,
  animationDecimalPlaces,
  titleIconClass,
});

const metaText = 'Super fast';
const metaIcon = 'check-circle';
const titleIcon = 'hourglass';

const Template = (args, { argTypes }) => ({
  components: {
    GlSingleStat,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-single-stat
      :title="title"
      :value="value"
      :unit="unit"
      :use-delimiters="useDelimiters"
      :variant="variant"
      :meta-text="metaText"
      :meta-icon="metaIcon"
      :title-icon="titleIcon"
      :should-animate="shouldAnimate"
      :animation-decimal-places="animationDecimalPlaces"
      :title-icon-class="titleIconClass"
    />`,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithBadge = Template.bind({});
WithBadge.args = generateProps({ metaText, metaIcon });

export const WithMetaIcon = Template.bind({});
WithMetaIcon.args = generateProps({ metaIcon });

export const WithTitleIcon = Template.bind({});
WithTitleIcon.args = generateProps({ titleIcon });

export const WithDelimiters = Template.bind({});
WithDelimiters.args = generateProps({ value: '10000', useDelimiters: true });

export default {
  title: 'charts/single-stat',
  component: GlSingleStat,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    variant: {
      options: Object.values(badgeVariantOptions),
      control: 'select',
    },
    metaIcon: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
    titleIcon: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
    unit: {
      control: 'text',
    },
    useDelimiters: {
      control: 'boolean',
      description: 'Requires the `value` property to be a valid Number or convertable to one',
    },
  },
};
