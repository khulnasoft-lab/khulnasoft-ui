import { withKnobs, boolean } from '@storybook/addon-knobs';
import PortalVue from 'portal-vue';
import Vue from 'vue';
import { documentedStoriesOf } from '../../../../documentation/documented_stories';
import { provide } from './common_story_options';
import readme from './filtered_search_term.md';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';

Vue.use(PortalVue);

const staticOptions = [
  { icon: 'eye-slash', value: true, title: 'Yes' },
  { icon: 'eye', value: false, title: 'No' },
];

documentedStoriesOf('base/filtered-search/token-segment', readme)
  .addDecorator(withKnobs)
  .add('default', () => ({
    components: {
      GlFilteredSearchTokenSegment,
    },
    provide,
    props: {
      active: {
        type: Boolean,
        default: boolean('active', true),
      },
    },
    data() {
      return {
        value: 'demo1',
      };
    },
    mounted() {
      this.$nextTick(() => document.activeElement.blur());
    },
    template: `
      <div>
        <div>v-model value: {{ value }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-200">
          <gl-filtered-search-token-segment
            v-model="value"
            class="gl-h-full"
            :active="active"
          >
            <template #suggestions>
              <gl-filtered-search-suggestion value="demo1">Static suggestion 1</gl-filtered-search-suggestion>
              <gl-filtered-search-suggestion value="demo2">Static suggestion 2</gl-filtered-search-suggestion>
            </template>
          </gl-filtered-search-token-segment>
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
  }))
  .add('with static options', () => ({
    components: {
      GlFilteredSearchTokenSegment,
    },
    provide,
    props: {
      active: {
        type: Boolean,
        default: boolean('active', true),
      },
    },
    data() {
      return {
        value: true,
        staticOptions,
      };
    },
    mounted() {
      this.$nextTick(() => document.activeElement.blur());
    },
    template: `
      <div>
        <div>v-model value: {{ value }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-200">
          <gl-filtered-search-token-segment
            v-model="value"
            class="gl-h-full"
            :active="active"
            :options="staticOptions"
            option-text-field="title"
          />
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
  }));
