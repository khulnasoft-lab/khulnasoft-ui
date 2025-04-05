import { alignOptions } from '../../../utils/constants';
import readme from './pagination.md';
import GlPagination from './pagination.vue';

const components = { GlPagination };

const defaultValue = (name) => GlPagination.props[name].default;

const generateProps = ({
  value = 3,
  align = defaultValue('align'),
  disabled = defaultValue('disabled'),
  linkGen = defaultValue('linkGen'),
  nextPage = defaultValue('nextPage'),
  nextText = defaultValue('nextText'),
  perPage = 10, // Existing stories/shots used this value instead of the default
  prevPage = defaultValue('prevPage'),
  prevText = defaultValue('prevText'),
  totalItems = 200, // The component's default value of 0 is for compact pagination, which most stories here do not use.
} = {}) => ({
  value,
  align,
  disabled,
  linkGen,
  nextPage,
  nextText,
  perPage,
  prevPage,
  prevText,
  totalItems,
});

const template = `
  <gl-pagination
    v-model="currentPage"
    :align="align"
    :disabled="disabled"
    :link-gen="linkGen"
    :next-page="nextPage"
    :next-text="nextText"
    :per-page="perPage"
    :prev-page="prevPage"
    :prev-text="prevText"
    :total-items="totalItems"
  />
`;

const defaults = (args) => ({
  data() {
    return {
      currentPage: args.value,
      alignOptions,
    };
  },
  watch: {
    initialPage(value) {
      this.value = value;
    },
  },
});

export const Default = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults(args),
  template,
});
Default.args = generateProps();

export const LinkBased = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults(args),
  template,
});
LinkBased.args = generateProps({ linkGen: (page) => `/page/${page}` });

export const AlignCenter = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults(args),
  template,
});
AlignCenter.args = generateProps({ align: alignOptions.center });

export const AlignRight = (args, { argTypes }) => ({
  components,
  props: Object.keys(argTypes),
  ...defaults(args),
  template,
});
AlignRight.args = generateProps({ align: alignOptions.right });

export default {
  title: 'base/pagination',
  component: GlPagination,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    align: {
      options: Object.values(alignOptions),
      control: 'select',
    },
  },
};
