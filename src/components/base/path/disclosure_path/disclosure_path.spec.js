import { shallowMount } from '@vue/test-utils';
import { mockDisclosurePathItems } from '../mock_data';
import GlDisclosureDropdown from '../../new_dropdowns/disclosure/disclosure_dropdown.vue';
import GlTooltip from '../../tooltip/tooltip.vue';
import GlDisclosurePath from './disclosure_path.vue';
import GlDisclosurePathItem from './disclosure_path_item.vue';

describe('DisclosurePath', () => {
  let wrapper;

  const createComponent = (props = {}, options = {}) => {
    return shallowMount(GlDisclosurePath, {
      propsData: {
        items: mockDisclosurePathItems,
        ...props,
      },
      ...options,
    });
  };

  const listItems = () => wrapper.findAllComponents(GlDisclosurePathItem);
  const pathItemAt = (index) => listItems().at(index);
  const pathItemTextAt = (index) => pathItemAt(index).props('item').title;

  beforeEach(() => {
    wrapper = createComponent();
  });

  describe('renders the list of items', () => {
    it('renders the correct number of items', () => {
      expect(listItems().length).toBe(mockDisclosurePathItems.length);
    });

    it('renders the items in the correct order', () => {
      expect(pathItemTextAt(0)).toContain(mockDisclosurePathItems[0].title);
      expect(pathItemTextAt(4)).toContain(mockDisclosurePathItems[4].title);
      expect(pathItemTextAt(9)).toContain(mockDisclosurePathItems[9].title);
    });
  });

  describe('slots', () => {
    beforeEach(() => {
      wrapper = createComponent(null, {
        scopedSlots: {
          default: `
            <div
              :data-pathid="props.pathId"
              data-testid="path-item-slot-content">
              {{ props.pathItem.title }}
            </div>
          `,
        },
      });
    });

    it('contains all elements passed into the default slot', () => {
      mockDisclosurePathItems.forEach((item, index) => {
        const pathItem = wrapper.findAll('[data-testid="path-item-slot-content"]').at(index);

        expect(pathItem.text()).toBe(item.title);
        expect(pathItem.attributes('data-pathid')).toContain('path-');
      });
    });
  });

  describe('with ellipsis', () => {
    const findDropdown = () => wrapper.findComponent(GlDisclosureDropdown);
    const findTooltip = () => wrapper.findComponent(GlTooltip);
    const findTooltipText = () => findTooltip().text();
    const tooltipText = 'Display more items';

    beforeEach(() => {
      wrapper = createComponent({ withEllipsis: true, ellipsisTooltipLabel: tooltipText });
    });

    describe('renders items and dropdown', () => {
      it('renders 2 items', () => {
        expect(listItems().length).toBe(2);
      });

      it('renders first and last items', () => {
        expect(pathItemTextAt(0)).toContain(mockDisclosurePathItems[0].title);
        expect(pathItemTextAt(1)).toContain(
          mockDisclosurePathItems[mockDisclosurePathItems.length - 1].title
        );
      });

      it('renders dropdown with the rest of the items passed down', () => {
        expect(findDropdown().exists()).toBe(true);
        expect(findDropdown().props('items').length).toBe(mockDisclosurePathItems.length - 2);
      });

      it('renders tooltip with text passed as prop', () => {
        expect(findTooltip().exists()).toBe(true);
        expect(findTooltipText()).toBe(tooltipText);
      });
    });
  });
});
