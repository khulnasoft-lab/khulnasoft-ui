import { mount } from '@vue/test-utils';
import { GlMarkdown } from '../../index';
import { generateStaticContent } from '../../utils/static_content';
import { GlScrimDirective as Scrim, SCRIM_POSITION } from './scrim';

describe('scrim directive', () => {
  let wrapper;

  const createComponent = (options = { scrimPosition: SCRIM_POSITION.BOTTOM }) => {
    const component = {
      directives: {
        Scrim,
      },
      components: { GlMarkdown },
      template:
        options?.template ||
        `
            <div v-scrim:${[
              options.scrimPosition || SCRIM_POSITION.BOTTOM,
            ]} style="height: 300px; overflow-y: auto">${generateStaticContent(2)}</div>
        `,
    };

    wrapper = mount(component);
  };

  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  );

  /**
   * Mock scrollHeight and scrollTop as by default mount set it to 0
   * And scrim can appear only on scrollables container
   */
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
      configurable: true,
      value: 500,
    });
    Object.defineProperty(HTMLElement.prototype, 'scrollTop', { value: 10, writable: true });
  });

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollHeight', originalOffsetHeight);
  });

  it('should render scrim for bottom option class', () => {
    createComponent();
    expect(wrapper.classes()).toContain('gl-scrim-after');
  });

  it('should render scrim for top option class', async () => {
    createComponent({ scrimPosition: SCRIM_POSITION.TOP });
    wrapper.element.dispatchEvent(new Event('scroll'));

    expect(wrapper.classes()).toContain('gl-scrim-before');
  });
});
