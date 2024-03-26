import { targetOptions } from '../../../utils/constants';
import GlLink from './link.vue';
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

export const LongLink = makeStory({
  components: { GlLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Quamquam tu hanc copiosiorem etiam soles dicere.
    Ergo illi intellegunt quid Epicurus dicat, ego non intellego? Claudii libidini, qui tum erat summo ne imperio, dederetur.
    Si quicquam extra virtutem habeatur in bonis. Nunc omni virtuti vitium contrario nomine opponitur. Duo Reges: constructio interrete.
    </gl-link>`,
});
LongLink.args = generateProps();

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
      options: targetOptions,
      control: 'select',
    },
  },
};
