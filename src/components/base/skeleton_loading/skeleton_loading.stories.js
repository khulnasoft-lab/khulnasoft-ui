import GlDeprecatedSkeletonLoading from './skeleton_loading.vue';
import readme from './skeleton_loading.md';

const components = {
  GlDeprecatedSkeletonLoading,
};

const template = '<gl-deprecated-skeleton-loading :lines="lines" />';

function generateProps() {
  return {
    lines: 3,
  };
}

const Template = (args) => ({
  components,
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/skeleton loading',
  component: GlDeprecatedSkeletonLoading,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    lines: {
      options: [1, 2, 3],
      control: 'select',
    },
  },
};
