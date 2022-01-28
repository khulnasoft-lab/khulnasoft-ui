import { withKnobs } from '@storybook/addon-knobs';
import { GlFilteredSearchSuggestion } from '../../../../index';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import readme from './filtered_search_suggestion.md';

const noop = () => {};

documentedStoriesOf('base/filtered-search/suggestion', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { GlFilteredSearchSuggestion },
    provide: {
      filteredSearchSuggestionListInstance: {
        register: noop,
        unregister: noop,
        $emit: noop,
        activeItem: null,
      },
    },
    template: `
      <ul>
        <gl-filtered-search-suggestion value="demo">Demo suggestion</gl-filtered-search-suggestion>
      </ul>
    `,
  }));
