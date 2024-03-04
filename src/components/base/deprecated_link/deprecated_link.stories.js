import { targetOptions } from '../../../utils/constants';
import GlDeprecatedLink from './deprecated_link.vue';
import readme from './deprecated_link.md';

const generateProps = ({ href = '#', target = null } = {}) => ({
  href,
  target,
});

const makeStory =
  (options) =>
  (args, { argTypes }) => ({
    components: {
      GlDeprecatedLink,
    },
    props: Object.keys(argTypes),
    ...options,
  });

export const DefaultDeprecatedLink = makeStory({
  components: { GlDeprecatedLink },
  template: `
    <gl-link
      :href="href"
      :target="target"
    >
        This is a link
    </gl-link>`,
});
DefaultDeprecatedLink.args = generateProps();

export const LongDeprecatedLink = makeStory({
  components: { GlDeprecatedLink },
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
LongDeprecatedLink.args = generateProps();

export default {
  title: 'base/link-deprecated',
  component: GlDeprecatedLink,
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
