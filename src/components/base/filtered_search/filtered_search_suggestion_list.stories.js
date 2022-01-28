import { withKnobs } from '@storybook/addon-knobs';
import { GlFilteredSearchSuggestionList, GlFilteredSearchSuggestion } from '../../../../index';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { provide } from './common_story_options';
import readme from './filtered_search_suggestion_list.md';

documentedStoriesOf('base/filtered-search/suggestion-list', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: { GlFilteredSearchSuggestionList, GlFilteredSearchSuggestion },
    data() {
      return {
        iteration: 1,
        items: Array.from({ length: 5 }).map((_, idx) => `item-${idx}-iteration-1`),
      };
    },
    provide,
    methods: {
      change() {
        this.iteration += 1;
        this.items = Array.from({ length: 3 + Math.floor(Math.random() * 5) }).map(
          (_, idx) => `item-${idx}-iteration-${this.iteration}`
        );
      },
    },
    mounted() {
      this.$refs.suggestions.nextItem();
    },
    template: `
      <div>
        <button @click="$refs.suggestions.prevItem()">prev</button>
        <button @click="$refs.suggestions.nextItem()">next</button>
        <button @click="change">replace suggestions in list</button>
        <gl-filtered-search-suggestion-list ref="suggestions" style="float: none; position: relative;">
          <gl-filtered-search-suggestion v-for="item in items" :key="item" :value="item">
            {{item}}
          </gl-filtered-search-suggestion>
        </gl-filtered-search-suggestion-list>
      </div>
    `,
  }));
