import { shallowMount } from '@vue/test-utils';
import GlPagination from '../pagination/pagination.vue';
import GlSearchBoxByType from '../search_box_by_type/search_box_by_type.vue';
import PaginatedList from './paginated_list.vue';

describe('Paginated List', () => {
  let wrapper;
  let template;

  beforeAll(() => {
    template = `
      <div class="slot" slot-scope="{ listItem }">
        <span class="item">Item Name: {{listItem.id}}</span>
      </div>
    `;
  });

  const createComponent = (props = {}) => {
    wrapper = shallowMount(PaginatedList, {
      scopedSlots: {
        default: template,
      },
      propsData: {
        list: [],
        ...props,
      },
    });
  };

  describe('Searchless states', () => {
    it('renders the list in an empty state, when no items are provided', () => {
      createComponent();

      expect(wrapper.findAll('.item').length).toEqual(0);
      expect(wrapper.findAll('.empty-message').length).toEqual(1);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the list in an empty state with a custom empty message, when one is provided', () => {
      const msg = 'List is passed in empty';

      createComponent({ emptyMessage: msg });

      expect(wrapper.findAll('.item').length).toEqual(0);
      expect(wrapper.find('.empty-message').text()).toEqual(msg);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the list with nested items, when an array of items is provided', () => {
      createComponent({
        list: [{ id: 'foo' }, { id: 'bar' }],
      });

      expect(wrapper.findAll('.item').length).toEqual(2);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Search states', () => {
    const list = [{ id: 'foo' }, { id: 'bar' }, { id: 'baz' }];

    it('renders the list filtered by search results', async () => {
      createComponent({ list });

      const search = wrapper.findComponent(GlSearchBoxByType);
      search.vm.$emit('input', 'ba');

      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('.item').length).toBe(2);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the default empty search message when there are no search results', async () => {
      createComponent({ list });

      const search = wrapper.findComponent(GlSearchBoxByType);
      search.vm.$emit('input', 'qux');

      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('.item').length).toEqual(0);
      expect(wrapper.findAll('.empty-search').length).toEqual(1);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the custom empty search message when there are no search results', async () => {
      const msg = 'Custom empty message';

      createComponent({ list, emptySearchMessage: msg });

      const search = wrapper.findComponent(GlSearchBoxByType);
      search.vm.$emit('input', 'qux');

      await wrapper.vm.$nextTick();
      expect(wrapper.findAll('.item').length).toEqual(0);
      expect(wrapper.find('.empty-search').text()).toEqual(msg);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Pagination', () => {
    const list = [
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

    it('renders 10 items for a default page size of 10, 13 total', () => {
      createComponent({ list });

      expect(wrapper.findAll('.item').length).toEqual(10);
      expect(wrapper.findComponent(GlPagination).props('totalItems')).toEqual(13);
      expect(wrapper.findComponent(GlPagination).props('perPage')).toEqual(10);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders 13 items for a default page size of 20', () => {
      createComponent({ list, perPage: 20 });

      expect(wrapper.findAll('.item').length).toEqual(13);
      expect(wrapper.findComponent(GlPagination).props('totalItems')).toEqual(13);
      expect(wrapper.findComponent(GlPagination).props('perPage')).toEqual(20);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders 5 items on page 1 for a page size of 5, 13 total itmes and renders pagination', () => {
      createComponent({ list, perPage: 5 });

      expect(wrapper.findAll('.item').length).toEqual(5);
      expect(wrapper.findComponent(GlPagination).props('totalItems')).toEqual(13);
      expect(wrapper.findComponent(GlPagination).props('perPage')).toEqual(5);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders 3 items on page 2 with default page size of 10 and 13 total items', () => {
      createComponent({ list, page: 2 });

      expect(wrapper.findAll('.item').length).toEqual(3);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders 1 item on page 7 with page size of 2 and 13 total items', () => {
      createComponent({ list, page: 7, perPage: 2 });

      expect(wrapper.findAll('.item').length).toEqual(1);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('props', () => {
    describe('filterable', () => {
      it('has search enabled by default', () => {
        createComponent();

        expect(wrapper.findComponent(GlSearchBoxByType).exists()).toBe(true);
      });

      it('has search disabled when filterable prop set to false', () => {
        createComponent({ filterable: false });

        expect(wrapper.findAll('[aria-label="Search"]').length).toEqual(0);
      });
    });

    describe('filter', () => {
      const list = [{ id: 'foo' }, { id: 'bar' }];

      it('filters on default "id" key', async () => {
        createComponent({ list });

        wrapper.setData({ queryStr: 'ba' });

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('.item').length).toEqual(1);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('filters on provided "myKey" key', async () => {
        createComponent({ list: [{ myKey: 'foo' }, { myKey: 'bar' }], filter: 'myKey' });

        wrapper.setData({ queryStr: 'ba' });

        await wrapper.vm.$nextTick();
        expect(wrapper.findAll('.item').length).toEqual(1);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('filters with provided filter function', async () => {
        const filter = (item, queryStr) => item.id.includes(queryStr);

        createComponent({ list, filter });

        wrapper.setData({ queryStr: 'ba' });

        await wrapper.vm.$nextTick();
        const elem = wrapper.findAll('.item');
        expect(elem.length).toEqual(1);
        expect(elem.at(0).text()).toBe('Item Name: bar');
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
