import { shallowMount } from '@vue/test-utils';
import { BCarousel } from '../../../vendor/bootstrap-vue/src/components/carousel/carousel';
import Carousel from './carousel.vue';

describe('Carousel component', () => {
  const collapseId = 'collapse-id';
  let wrapper;

  const createWrapper = (propsData) => {
    wrapper = shallowMount(Carousel, { propsData });
  };

  describe('default', () => {
    beforeEach(() => {
      createWrapper({
        id: collapseId,
      });
    });

    it('renders a BCarousel component', () => {
      expect(wrapper.findComponent(BCarousel).exists()).toBe(true);
    });
  });
});
