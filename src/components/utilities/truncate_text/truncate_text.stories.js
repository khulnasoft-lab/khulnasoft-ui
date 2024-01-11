import GlTruncateText from './truncate_text.vue';
import readme from './truncate_text.md';

const generateProps = ({
  showMoreText = 'Show more',
  showLessText = 'Show less',
  lines = 3,
  mobileLines = 10,
  toggleButtonProps = {},
} = {}) => ({
  showMoreText,
  showLessText,
  lines,
  mobileLines,
  toggleButtonProps,
});

const content = () => [...Array(15)].map((_, i) => `line ${i + 1}`).join('\n');

const template = `
  <gl-truncate-text v-bind="$props">
    <div class="gl-white-space-pre-line">${content()}</div>
  </gl-truncate-text>`;

const Template = (args, { argTypes }) => ({
  components: { GlTruncateText },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'utilities/truncate-text',
  component: GlTruncateText,
  tags: ['skip-visual-test'],
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
