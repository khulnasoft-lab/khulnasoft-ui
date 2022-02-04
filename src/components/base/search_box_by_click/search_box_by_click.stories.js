import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlSearchBoxByClick } from '../../../index';
import readme from './search_box_by_click.md';

const components = {
  GlSearchBoxByClick,
};

function generateProps({ disabled = false, value = '', placeholder = 'Search' } = {}) {
  return {
    disabled: {
      type: Boolean,
      default: boolean('disabled', disabled),
    },
    value: {
      type: String,
      default: text('value', value),
    },
    placeholder: {
      type: String,
      default: text('placeholder', placeholder),
    },
  };
}

documentedStoriesOf('base/search-box-by-click', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-search-box-by-click
        :value="value"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    `,
  }))
  .add('with history', () => ({
    props: {
      ...generateProps(),
      history: {
        type: Array,
        default: ['author:@admin', 'assignee:@admin milestone:%12.5', 'label:~test'],
      },
    },
    components,
    template: `
      <gl-search-box-by-click
        :value="value"
        :disabled="disabled"
        :placeholder="placeholder"
        :history-items="history"
      />
    `,
  }));
