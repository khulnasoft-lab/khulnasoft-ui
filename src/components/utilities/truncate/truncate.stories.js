import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlTruncate } from '../../../../index';
import { POSITION } from './constants';
import readme from './truncate.md';

const components = {
  GlTruncate,
};

const template = '<gl-truncate :text="text" :position="position" :with-tooltip="withTooltip" />';

function generateProps({
  longText = 'src/thisIs/AVeryLongFilePath/that/needs/to/be/smartly/truncated/from/the/middle/so/we/dont/lose/important/information/here.vue',
  position = 'middle',
  withTooltip = false,
} = {}) {
  return {
    text: {
      type: String,
      default: text('text', longText),
    },
    position: {
      type: String,
      default: select('position', Object.values(POSITION), position),
    },
    withTooltip: {
      default: boolean('withTooltip', withTooltip),
    },
  };
}

documentedStoriesOf('utilities/truncate', readme)
  .addParameters({ storyshots: false })
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template,
  }));
