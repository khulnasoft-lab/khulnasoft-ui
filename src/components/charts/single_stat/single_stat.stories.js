import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlSingleStat } from '../../../charts';
import { badgeVariantOptions } from '../../../utils/constants';
import readme from './single_stat.md';

const generateProps = ({
  variant = GlSingleStat.props.variant.default,
  title = 'Single stat',
  value = '100',
  unit = '',
  metaText = '',
  metaIcon = null,
  titleIcon = null,
  shouldAnimate = false,
  animationDecimalPlaces = 0,
} = {}) => ({
  variant,
  title,
  value,
  unit,
  metaText,
  metaIcon,
  titleIcon,
  shouldAnimate,
  animationDecimalPlaces,
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
      :variant="variant"
      :meta-text="metaText"
      :meta-icon="metaIcon"
      :title-icon="titleIcon"
      :should-animate="shouldAnimate"
      :animation-decimal-places="animationDecimalPlaces"
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

export default {
  title: 'charts/single-stat',
  component: GlSingleStat,
  parameters: {
    knobs: { disable: true },
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
  },
};
