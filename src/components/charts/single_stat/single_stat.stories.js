import iconSpriteInfo from '@gitlab/svgs/dist/icons.json';
import { withKnobs, text, select, boolean, number } from '@storybook/addon-knobs';
import { GlSingleStat } from '../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { badgeVariantOptions } from '../../../utils/constants';
import readme from './single_stat.md';

const components = {
  GlSingleStat,
};

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
  variant: {
    type: String,
    default: select('variant', Object.values(badgeVariantOptions), variant),
  },
  title: {
    type: String,
    default: text('title', title),
  },
  value: {
    type: String,
    default: text('value', value),
  },
  unit: {
    type: [String, Number],
    default: text('unit', unit),
  },
  metaText: {
    type: String,
    default: text('metaText', metaText),
  },
  metaIcon: {
    type: String,
    default: select('metaIcon', ['', ...iconSpriteInfo.icons], metaIcon),
  },
  titleIcon: {
    type: String,
    default: select('titleIcon', ['', ...iconSpriteInfo.icons], titleIcon),
  },
  shouldAnimate: {
    type: Boolean,
    default: boolean('shouldAnimate', shouldAnimate),
  },
  animationDecimalPlaces: {
    type: Number,
    default: number('animationDecimalPlaces', animationDecimalPlaces),
  },
});

const metaText = 'Super fast';
const metaIcon = 'check-circle';
const titleIcon = 'hourglass';

documentedStoriesOf('charts/single-stat', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps(),
    template,
  }))
  .add('with badge', () => ({
    components,
    props: generateProps({ metaText, metaIcon }),
    template,
  }))
  .add('with meta icon', () => ({
    components,
    props: generateProps({ metaIcon }),
    template,
  }))
  .add('with title icon', () => ({
    components,
    props: generateProps({ titleIcon }),
    template,
  }));
