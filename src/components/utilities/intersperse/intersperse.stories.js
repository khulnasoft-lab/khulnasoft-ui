import { GlIntersperse } from '../../../../index';
import readme from './intersperse.md';

const template = `
  <div>
    <gl-intersperse :separator="separator" :lastSeparator="lastSeparator">
      <span v-for="item in items">{{ item }}</span>
    </gl-intersperse>
  </div>
  `;

const generateProps = ({
  separator = ', ',
  lastSeparator = '',
  items = ['Foo', 'Bar', 'Baz', 'Qaz'],
} = {}) => ({
  separator,
  lastSeparator,
  items,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlIntersperse,
  },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'utilities/intersperse',
  component: GlIntersperse,
  parameters: {
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    separator: {
      control: 'text',
    },
    lastSeparator: {
      control: 'text',
    },
  },
};

export const CustomSeperator = Template.bind({});
CustomSeperator.args = generateProps({
  separator: '-',
});

export const CustomLastSeparator = Template.bind({});
CustomLastSeparator.args = generateProps({
  lastSeparator: ' and ',
});
