import readme from './table_lite.md';
import GlTableLite from './table_lite.vue';

const fieldsMock = [
  {
    key: 'column_one',
    label: 'First column',
    thClass: 'w-60p',
    tdClass: 'table-col',
  },
  {
    key: 'column_two',
    label: 'Second column',
    thClass: 'w-60p',
    tdClass: 'table-col',
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
  items = tableItemsMock,
  fields = fieldsMock,
} = {}) => ({
  stickyHeader,
  items,
  fields,
});

const Template = (args, { argTypes }) => ({
  components: { GlTableLite },
  props: Object.keys(argTypes),
  template: `
    <gl-table-lite
    :sticky-header="stickyHeader"
    :items="items"
    :fields="fields" />
  `,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/table/table_lite',
  component: GlTableLite,
  parameters: {
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
