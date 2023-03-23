import GlButton from '../button/button.vue';
import GlPaginatedList from './paginated_list.vue';
import readme from './paginated_list.md';

const sampleList = [
  { id: 'foo' },
  { id: 'bar' },
  { id: 'baz' },
  { id: 'qux' },
  { id: 'quux' },
  { id: 'corge' },
  { id: 'grault' },
  { id: 'garply' },
  { id: 'waldo' },
  { id: 'fred' },
  { id: 'xyzzy' },
  { id: 'plugh' },
  { id: 'thud' },
];

const emptyList = [];

const template = `
  <gl-paginated-list
  :list="list"
  :perPage="perPage"
  :page="page"
  :filterable="filterable"
  :filter="filter"
  :item-key="itemKey"
  :emptyMessage="emptyMessage"
  :emptySearchMessage="emptySearchMessage"
  />
`;

const generateProps = ({
  list = [...sampleList],
  perPage = 10,
  page = 1,
  filterable = true,
  filter = 'id',
  itemKey = 'id',
  emptyMessage = 'There are currently no items in this list.',
  emptySearchMessage = 'Sorry, your filter produced no results.',
} = {}) => ({
  list,
  perPage,
  page,
  filterable,
  filter,
  itemKey,
  emptyMessage,
  emptySearchMessage,
});

const Template = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export const NoFilter = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template,
});
NoFilter.args = generateProps({
  filterable: false,
});

export const WithEmptyList = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template,
});
WithEmptyList.args = generateProps({
  list: emptyList,
});

export const WithHeaderSlot = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-paginated-list
    :list="list"
    :perPage="perPage"
    :page="page"
    :filterable="filterable"
    :filter="filter"
    :item-key="itemKey"
    :emptyMessage="emptyMessage"
    :emptySearchMessage="emptySearchMessage"
    >

      <template #header>
        <gl-button
          variant="success"
          class="order-1"
          @click="alert"
        >
          Foo Button
        </gl-button>
      </template>

    </gl-paginated-list>
    `,
  methods: {
    alert() {
      // eslint-disable-next-line no-alert
      window.alert('clicked');
    },
  },
});
WithHeaderSlot.args = generateProps();

export const WithSubheaderSlot = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-paginated-list
    :list="list"
    :perPage="perPage"
    :page="page"
    :filterable="filterable"
    :filter="filter"
    :item-key="itemKey"
    :emptyMessage="emptyMessage"
    :emptySearchMessage="emptySearchMessage"
    >

    <template #subheader>
      Dropdown content can go here when like when an action button is clicked 
    </template>
    
    </gl-paginated-list>
  `,
});
WithSubheaderSlot.args = generateProps();

export const WithRowSlot = (args, { argTypes }) => ({
  components: {
    GlPaginatedList,
    GlButton,
  },
  props: Object.keys(argTypes),
  template: `
    <gl-paginated-list
    :list="list"
    :perPage="perPage"
    :page="page"
    :filterable="filterable"
    :filter="filter"
    :item-key="itemKey"
    :emptyMessage="emptyMessage"
    :emptySearchMessage="emptySearchMessage"
    >
    
      <template slot-scope="{ listItem }"  >
        <gl-button
        variant="success"
        class="order-1"
        @click="alert"
        >
          {{ listItem.id }}
        </gl-button>
      </template>
    
    </gl-paginated-list>
    `,
  methods: {
    alert() {
      // eslint-disable-next-line no-alert
      window.alert('clicked');
    },
  },
});
WithRowSlot.args = generateProps();

export default {
  title: 'base/paginated-list',
  component: GlPaginatedList,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
