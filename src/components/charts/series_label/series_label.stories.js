import { withKnobs, text } from '@storybook/addon-knobs';
import { GlChartSeriesLabel } from '../../../charts';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { colorPaletteDefault } from '../../../utils/charts/theme';
import {
  SERIES_NAME,
  SERIES_NAME_SHORT,
  SERIES_NAME_LONG,
  SERIES_NAME_LONG_WITHOUT_SPACES,
} from '../../../utils/stories_utils';
import readme from './series_label.md';

const components = {
  GlChartSeriesLabel,
};

const generateProps = ({ color = colorPaletteDefault[0], type = 'solid' } = {}) => ({
  color: {
    default: text('Color', color),
  },
  type: {
    default: text('Series Type', type),
  },
});

const template = `<gl-chart-series-label
    :color="color"
    :type="type"
  >
    {{$options.text}}
  </gl-chart-series-label>`;

documentedStoriesOf('charts/chart-series-label', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components,
    props: generateProps({ color: '' }),
    template,
    text: SERIES_NAME[SERIES_NAME_SHORT],
  }))
  .add('with long name', () => ({
    components,
    props: generateProps({ color: '' }),
    template,
    text: SERIES_NAME[SERIES_NAME_LONG],
  }))
  .add('with long name with no spaces', () => ({
    components,
    props: generateProps({ color: '' }),
    template,
    text: SERIES_NAME[SERIES_NAME_LONG_WITHOUT_SPACES],
  }))
  .add('with color dashed', () => ({
    components,
    props: generateProps({ type: 'dashed' }),
    template,
    text: SERIES_NAME[SERIES_NAME_SHORT],
  }))
  .add('with color', () => ({
    components,
    props: generateProps(),
    template,
    text: SERIES_NAME[SERIES_NAME_SHORT],
  }))
  .add('with color and long name', () => ({
    components,
    props: generateProps(),
    template,
    text: SERIES_NAME[SERIES_NAME_LONG],
  }))
  .add('with color and long name with no spaces', () => ({
    components,
    props: generateProps(),
    template,
    text: SERIES_NAME[SERIES_NAME_LONG_WITHOUT_SPACES],
  }));
