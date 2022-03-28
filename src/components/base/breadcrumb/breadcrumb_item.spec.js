import { shallowMount } from '@vue/test-utils';
import { BLink } from 'bootstrap-vue';
import BreadcrumbItem from './breadcrumb_item.vue';

describe('Breadcrumb Item Component', () => {
  let wrapper;

  const item = { href: 'http://about.gitlab.com', to: { name: 'about' }, ariaCurrent: 'page' };

  const findBLink = () => wrapper.findComponent(BLink);
  const findDefaultSlot = () => wrapper.find('[data-testid="default-slot"]');

  const createComponent = () => {
    wrapper = shallowMount(BreadcrumbItem, {
      propsData: {
        href: item.href,
        to: item.to,
        ariaCurrent: item.ariaCurrent,
      },
      slots: {
        default: '<div data-testid="default-slot"></div>',
      },
    });
  };

  describe('slots', () => {
    it('renders provided content to default slot', () => {
      createComponent();

      expect(findDefaultSlot().exists()).toBe(true);
    });
  });

  describe('bindings', () => {
    it('passes provided props down to BLink', () => {
      createComponent();

      const bLink = findBLink();

      expect(bLink.props('to')).toMatchObject(item.to);
      expect(bLink.props('href')).toBe(item.href);
      expect(bLink.attributes('aria-current')).toBe(item.ariaCurrent);
    });
  });
});
