import { setStoryTimeout } from '../../../utils/test_utils';
import { GlInfiniteScroll } from '../../../index';
import readme from './infinite_scroll.md';

const ITEMS_BATCH_SIZE = 20;

const template = `
  <gl-infinite-scroll
    :max-list-height="285"
    :fetched-items="fetchedItems"
    @bottomReached="bottomReached"
    >
    <template #items>
      <ul class="list-group list-group-flushed list-unstyled">
        <li v-for="item in fetchedItems" :key="item" class="list-group-item">Item #{{ item }}</li>
      </ul>
    </template>

    <template #default>
      <div class="gl-mt-3">
        <gl-loading-icon v-if="isLoading" />
        <span v-else>{{ fetchedItems }} items loaded</span>
      </div>
    </template>
  </gl-infinite-scroll>
`;

const generateProps = ({ isLoading = false, fetchedItems = ITEMS_BATCH_SIZE } = {}) => ({
  isLoading,
  fetchedItems,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlInfiniteScroll,
  },
  props: Object.keys(argTypes),
  data() {
    return {
      loadTimer: null,
    };
  },
  methods: {
    bottomReached() {
      clearTimeout(this.loadTimer);
      this.isLoading = true;
      this.loadTimer = setStoryTimeout(() => {
        this.fetchedItems += ITEMS_BATCH_SIZE;
        this.isLoading = false;
      }, 500);
    },
  },
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/infinite-scroll',
  component: GlInfiniteScroll,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
