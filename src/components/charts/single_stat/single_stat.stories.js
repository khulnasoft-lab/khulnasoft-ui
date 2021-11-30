import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { GlSingleStat } from '../../../charts';
import { badgeVariantOptions } from '../../../utils/constants';
import readme from './single_stat.md';

const template = `
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
    />
  `;

const generateProps = ({
  variant = GlSingleStat.props.variant.default,
  title = 'Single stat',
  value = '100',
  unit = null,
  metaText = null,
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

const Template = (args, { argTypes }) => ({
  components: {
    GlSingleStat,
  },
  props: Object.keys(argTypes),
  template,
});
export const Default = Template.bind({});
Default.args = generateProps();

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
      control: {
        type: 'select',
      },
    },
    title: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    metaIcon: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
    titleIcon: {
      options: iconSpriteInfo.icons,
      control: 'select',
    },
    shouldAnimate: {
      control: 'boolean',
    },
    metaText: {
      control: 'string',
    },
    unit: {
      control: 'string',
    },
    animationDecimalPlaces: {
      control: 'number',
    },
  },
};
