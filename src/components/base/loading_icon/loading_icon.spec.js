import { shallowMount } from '@vue/test-utils';
import LoadingIcon from './loading_icon.vue';

describe('loading icon component', () => {
  let wrapper;
  const createComponent = ({ attrs, ...propsData } = {}) => {
    wrapper = shallowMount(LoadingIcon, { propsData, attrs });
  };

  const baseCssClass = 'gl-spinner';
  const findSpinnerEl = () => wrapper.find(`.${baseCssClass}`);
  const getSpinnerClasses = () => findSpinnerEl().classes();

  describe('display', () => {
    it('should render as a block by default', () => {
      createComponent();
      expect(wrapper.element.tagName).toBe('DIV');
    });

    it('should render inline using prop', () => {
      createComponent({ inline: true });
      expect(wrapper.element.tagName).toBe('SPAN');
    });
  });

  describe('css class', () => {
    const supportedSizes = ['sm', 'md', 'lg'];
    const supportedColors = ['dark', 'light'];
    const sizeColorCombinations = supportedSizes.reduce(
      (combinations, size) => combinations.concat(supportedColors.map((color) => [size, color])),
      []
    );

    it('should render the spinner css class by default', () => {
      createComponent();
      const spinnerClasses = getSpinnerClasses();

      expect(spinnerClasses).toContain(baseCssClass);
    });

    it.each(supportedSizes)('should render spinner properly for size %s', (size) => {
      createComponent({ size });
      const spinnerClasses = getSpinnerClasses();

      expect(spinnerClasses).toContain(baseCssClass);
      expect(spinnerClasses).toContain(`${baseCssClass}-${size}`);
    });

    it.each(supportedColors)('should render spinner properly for color %s', (color) => {
      createComponent({ color });
      const spinnerClasses = getSpinnerClasses();

      expect(spinnerClasses).toContain(baseCssClass);
      expect(spinnerClasses).toContain(`${baseCssClass}-${color}`);
    });

    it.each(sizeColorCombinations)(
      'should render spinner properly for combination of size: "%s" and color: "%s"',
      (size, color) => {
        createComponent({ size, color });
        const spinnerClasses = getSpinnerClasses();

        expect(spinnerClasses).toContain(baseCssClass);
        expect(spinnerClasses).toContain(`${baseCssClass}-${size}`);
        expect(spinnerClasses).toContain(`${baseCssClass}-${color}`);
      }
    );
  });

  describe('aria label', () => {
    it('should default to loading', () => {
      createComponent();
      const spinnerEl = findSpinnerEl();

      expect(spinnerEl.attributes('aria-label')).toBe('Loading');
    });

    it('should change using prop', () => {
      const label = 'label';
      createComponent({ label });
      const spinnerEl = findSpinnerEl();

      expect(spinnerEl.attributes('aria-label')).toBe(label);
    });
  });

  describe('role', () => {
    it('should have default role value as status', () => {
      createComponent();

      expect(wrapper.attributes('role')).toBe('status');
    });

    it('should have role value as custom value passed', () => {
      const role = 'dialog';
      createComponent({ attrs: { role } });

      expect(wrapper.attributes('role')).toBe(role);
    });
  });
});
