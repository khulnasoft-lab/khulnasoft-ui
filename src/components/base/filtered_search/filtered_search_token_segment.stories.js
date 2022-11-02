import PortalVue from 'portal-vue';
import Vue from 'vue';
import { GlFilteredSearchSuggestion } from '../../../index';
import { provide } from './common_story_options';
import readme from './filtered_search_token_segment.md';
import GlFilteredSearchTokenSegment from './filtered_search_token_segment.vue';

Vue.use(PortalVue);

const staticOptions = [
  { icon: 'eye-slash', value: true, title: 'Yes' },
  { icon: 'eye', value: false, title: 'No' },
];

const generateProps = ({ active = true } = {}) => ({
  active,
});

// eslint-disable-next-line no-unused-vars
export const Default = (args, { argTypes }) => ({
  components: {
    GlFilteredSearchTokenSegment,
    GlFilteredSearchSuggestion,
  },
  provide,
  props: ['active'],
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
});
Default.args = generateProps();

// eslint-disable-next-line no-unused-vars
export const WithStaticOptions = (args, { argTypes }) => ({
  components: {
    GlFilteredSearchTokenSegment,
  },
  provide,
  props: ['active'],
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
});
WithStaticOptions.args = generateProps();

export default {
  title: 'base/filtered-search/token-segment',
  component: GlFilteredSearchTokenSegment,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
