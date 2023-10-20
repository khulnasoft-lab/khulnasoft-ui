import { shallowMount } from '@vue/test-utils';
import { mockDisclosurePathItems } from '../mock_data';
import GlDisclosurePathItem from './disclosure_path_item.vue';

describe('DisclosurePathItem', () => {
  let wrapper;

  const createComponent = (props = {}, options = {}) => {
    return shallowMount(GlDisclosurePathItem, {
      propsData: {
        item: mockDisclosurePathItems[0],
        ...props,
      },
      ...options,
    });
  };

  beforeEach(() => {
    wrapper = createComponent();
  });

  describe('renders the item', () => {
    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('renders the inline icon', () => {
      const icon = wrapper.find('[data-testid="gl-disclosure-path-item-icon"]');

      expect(icon.exists()).toBe(true);
      expect(icon.props('name')).toBe(mockDisclosurePathItems[0].icon);
    });
  });

  describe('item slot', () => {
    beforeEach(() => {
      wrapper = createComponent(null, {
        scopedSlots: {
          default: `
            <div
              data-testid="path-item-slot-content">
              {{ props.pathItem.title }}
            </div>
          `,
        },
      });
    });

    it('contains all elements passed into the additional slot', () => {
      const pathItem = wrapper.find('[data-testid="path-item-slot-content"]');

      expect(pathItem.text()).toBe(mockDisclosurePathItems[0].title);
    });
  });
});
