import { makeContainer } from '../../../utils/story_decorators/container';
import GlSortingItem from './sorting_item.vue';
import GlSorting from './sorting.vue';
import readme from './sorting_item.md';

const components = {
  GlSorting,
  GlSortingItem,
};

const generateProps = ({ href = null, active = false } = {}) => ({
  href,
  active,
});

const template = `
  <gl-sorting text="Sorting options">
    <gl-sorting-item :href="href" :active="active">Some item</gl-sorting-item>
  </gl-sorting>`;

const Template = (args) => ({
  components,
  props: Object.keys(args),
  mounted() {
    this.$nextTick(() => this.$el.querySelector('.gl-dropdown-toggle').click());
  },
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const WithHref = Template.bind({});
WithHref.args = generateProps({ href: 'https://about.gitlab.com/' });

export const WithActive = Template.bind({});
WithActive.args = generateProps({ active: true });

export default {
  title: 'base/sorting/sorting-item',
  component: GlSortingItem,
  decorators: [makeContainer({ height: '50px', paddingLeft: '100px' })],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
