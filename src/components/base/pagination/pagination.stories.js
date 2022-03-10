import { alignOptions } from '../../../utils/constants';
import readme from './pagination.md';
import GlPagination from './pagination.vue';

const components = { GlPagination };

const generateBaseProps = ({
  prevText = 'Previous',
  nextText = 'Next',
  disabled = false,
} = {}) => ({
  prevText,
  nextText,
  disabled,
});

const generateFullProps = ({ page = 3, perPage = 10, totalItems = 200 } = {}) => ({
  initialPage: page,
  perPage,
  totalItems,
  ...generateBaseProps(),
});

const defaults = {
  data() {
    return {
      page: 3,
      alignOptions,
    };
  },
  watch: {
    initialPage(page) {
      this.page = page;
    },
  },
};

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults,
  template: `<gl-pagination
      v-model="page"
      :per-page="perPage"
      :total-items="totalItems"
      :prev-text="prevText"
      :next-text="nextText"
      :disabled="disabled"
      />`,
});
Default.args = generateFullProps();

export const Compact = () => ({
  components,
  ...defaults,
  props: generateFullProps(),
  data() {
    return {
      page: 1,
      alignOptions,
    };
  },
  computed: {
    prevPage() {
      return Math.max(this.page - 1, 0);
    },
    nextPage() {
      const nextPage = this.page + 1;
      return nextPage > 3 ? 0 : nextPage;
    },
  },
  template: `
      <div class="text-center gl-font-base">
        <gl-pagination
          v-model="page"
          :prev-page="prevPage"
          :next-page="nextPage"
          :prev-text="prevText"
          :next-text="nextText"
          :disabled="disabled"
          :align="alignOptions.center"
        />
        Page {{ page }} of 3
      </div>`,
});

export const LinkBased = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults,
  methods: {
    linkGen(page) {
      return `/page/${page}`;
    },
  },
  template: `<gl-pagination
    v-model="page"
    :per-page="perPage"
    :total-items="totalItems"
    :prev-text="prevText"
    :next-text="nextText"
    :disabled="disabled"
    :link-gen="linkGen"
    />`,
});
LinkBased.args = generateFullProps();

export const AlignCenter = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults,
  template: `<gl-pagination
    v-model="page"
    :per-page="perPage"
    :total-items="totalItems"
    :prev-text="prevText"
    :next-text="nextText"
    :disabled="disabled"
    :align="alignOptions.center"
    />`,
});
AlignCenter.args = generateFullProps();

export const AlignRight = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults,
  template: `<gl-pagination
    v-model="page"
    :per-page="perPage"
    :total-items="totalItems"
    :prev-text="prevText"
    :next-text="nextText"
    :disabled="disabled"
    :align="alignOptions.right"
    />`,
});
AlignRight.args = generateFullProps();

export default {
  title: 'base/pagination',
  component: GlPagination,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
