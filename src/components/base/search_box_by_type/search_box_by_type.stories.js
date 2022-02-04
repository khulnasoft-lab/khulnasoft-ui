import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { GlSearchBoxByType } from '../../../index';
import readme from './search_box_by_type.md';

const components = {
  GlSearchBoxByType,
};

function generateProps({
  disabled = false,
  value = '',
  placeholder = 'Search',
  isLoading = false,
} = {}) {
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
    isLoading: {
      type: Boolean,
      default: boolean('isLoading', isLoading),
    },
  };
}

documentedStoriesOf('base/search-box-by-type', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    props: generateProps(),
    components,
    template: `
      <gl-search-box-by-type
        :value="value" 
        :disabled="disabled"
        :is-loading="isLoading"
        :placeholder="placeholder"
      />
    `,
  }));
