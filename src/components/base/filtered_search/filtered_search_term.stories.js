import PortalVue from 'portal-vue';
import Vue from 'vue';
import { provide } from './common_story_options';
import readme from './filtered_search_term.md';
import GlFilteredSearchTerm from './filtered_search_term.vue';

Vue.use(PortalVue);

const availableTokens = [
  { title: 'Demo1', type: 'demo1', icon: 'label', token: {} },
  { title: 'Demo2', type: 'demo2', icon: 'rocket', token: {} },
];

const generateProps = ({ active = true } = {}) => ({ active });

// eslint-disable-next-line no-unused-vars
export const Default = (_args, { argTypes }) => ({
  props: ['active'],
  components: {
    GlFilteredSearchTerm,
  },
  provide,
  data() {
    return {
      value: { data: 'demo' },
      availableTokens,
    };
  },
  mounted() {
    this.$nextTick(() => document.activeElement.blur());
  },
  template: `
      <div>
        <div> {{ value.data }} </div>
        <div class="gl-border-1 gl-border-solid gl-border-gray-200">
          <gl-filtered-search-term
            v-model="value"
            class="gl-h-full"
            :active="active"
            :available-tokens="availableTokens"
          />
        </div>
        <div>
          <portal-target name="portal" class="gl-relative" />
        </div>
      </div>
    `,
});
Default.args = generateProps();

export default {
  title: 'base/filtered-search/term',
  component: GlFilteredSearchTerm,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
