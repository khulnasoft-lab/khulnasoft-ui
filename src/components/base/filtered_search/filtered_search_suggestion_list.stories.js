import { userEvent, within } from '@storybook/test';
import GlFilteredSearchSuggestionList from './filtered_search_suggestion_list.vue';
import GlFilteredSearchSuggestion from './filtered_search_suggestion.vue';
import { provide } from './common_story_options';
import readme from './filtered_search_suggestion_list.md';

export const Default = () => ({
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
});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button', { name: 'next' });
  await userEvent.click(button);
};

export default {
  title: 'base/filtered-search/suggestion-list',
  component: GlFilteredSearchSuggestionList,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
