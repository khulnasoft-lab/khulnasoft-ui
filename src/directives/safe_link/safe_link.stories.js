import { SafeLinkDirective as SafeLink } from './safe_link';
import readme from './safe_link.md';

const directives = {
  SafeLink,
};

// eslint-disable-next-line no-script-url
const generateProps = ({ href = 'javascript:alert(1)', target = '_blank' } = {}) => ({
  href,
  target,
});

export const Default = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  directives,
  template: `
    <a
      :href="href"
      :target="target"
      v-safe-link
    >
      This is a secure link
    </a>`,
});
Default.args = generateProps();

export default {
  title: 'directives/safe-link-directive',
  component: SafeLink,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
