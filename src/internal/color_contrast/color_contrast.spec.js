import { shallowMount } from '@vue/test-utils';
import ColorContrast from './color_contrast.vue';

describe('color contrast component', () => {
  let wrapper;

  const createComponent = (props) => {
    wrapper = shallowMount(ColorContrast, {
      propsData: {
        ...props,
      },
    });
  };

  it('renders AAA level and score', () => {
    createComponent({ foreground: '#000', background: '#fff' });
    expect(wrapper.text()).toBe('AAA 21.0');
  });

  it('renders AA level and score', () => {
    createComponent({ foreground: '#666', background: '#fff' });
    expect(wrapper.text()).toBe('AA 5.7');
  });

  it('renders AA+ level and score', () => {
    createComponent({ foreground: '#888', background: '#fff' });
    expect(wrapper.text()).toBe('AA+ 3.5');
  });

  it('renders F level and score', () => {
    createComponent({ foreground: '#999', background: '#fff' });
    expect(wrapper.text()).toBe('F 2.8');
  });
});
