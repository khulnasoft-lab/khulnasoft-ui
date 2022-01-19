import { GlLink } from '../../../index';
import { targetOptions } from '../../../utils/constants';
import readme from './link.md';

const generateProps = ({ href = '#', target = null } = {}) => ({
  href,
  target,
});

const makeStory =
  (options) =>
  (args, { argTypes }) => ({
    components: {
      GlLink,
    },
    props: Object.keys(argTypes),
    ...options,
  });

export const DefaultLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
        This is a link
    </gl-link>`,
});
DefaultLink.args = generateProps();

export default {
  title: 'base/link',
  component: GlLink,
  parameters: {
    bootstrapComponent: 'b-link',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    target: {
      control: {
        type: 'select',
        options: targetOptions,
      },
    },
  },
};
