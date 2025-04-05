import BVueReadme from '../../../vendor/bootstrap-vue/src/components/table/README.md';
import { makeContainer } from '../../../utils/story_decorators/container';
import readme from './table_lite.md';
import GlTableLite from './table_lite.vue';

const fieldsMock = [
  {
    key: 'column_one',
    label: 'First column',
    thClass: 'w-60p',
  },
  {
    key: 'column_two',
    label: 'Second column',
    thClass: 'w-60p',
  },
];

const tableItemsMock = [
  {
    column_one: 'test',
    column_two: 1234,
  },
  {
    column_one: 'test2',
    column_two: 5678,
  },
  {
    column_one: 'test3',
    column_two: 9101,
  },
];

const generateProps = ({
  stickyHeader = false,
  stacked = false,
  items = tableItemsMock,
  fields = fieldsMock,
} = {}) => ({
  stickyHeader,
  stacked,
  items,
  fields,
});

const Template = (args, { argTypes }) => ({
  components: { GlTableLite },
  props: Object.keys(argTypes),
  template: `
    <gl-table-lite
    :sticky-header="stickyHeader"
    :stacked="stacked"
    :items="items"
    :fields="fields" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const Stacked = Template.bind({});
Stacked.args = generateProps({
  items: [
    ...tableItemsMock.slice(0, 2),
    {
      column_one: 'wrapping text',
      column_two: 'supercalifragilisticexpialidocious',
    },
  ],
  stacked: true,
});
Stacked.decorators = [makeContainer({ width: '300px' })];

export default {
  title: 'base/table/table_lite',
  component: GlTableLite,
  parameters: {
    bootstrapDocs: BVueReadme,
    bootstrapComponent: 'b-table-lite',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    stickyHeader: {
      options: [false, true],
      control: 'boolean',
    },
  },
};
