import { shallowMount, createLocalVue } from '@vue/test-utils';
import resizeObserver from './resize_observer';
import { useMockResizeObserver } from '~helpers/mock_dom_observer';

describe('resize observer directive', () => {
  const { trigger, observersCount, observesElement } = useMockResizeObserver();

  const mockHandleResize = jest.fn();

  const localVue = createLocalVue();
  let wrapper;

  const createComponent = ({ template } = {}) => {
    const defaultTemplate = `<div v-resize-observer="handleResize"></div>`;

    const component = {
      directives: {
        resizeObserver,
      },
      methods: {
        handleResize: mockHandleResize,
      },
      template: template || defaultTemplate,
    };

    wrapper = shallowMount(component, { localVue });
  };

  afterEach(() => {
    wrapper.destroy();
  });

  it('shares one observer between multiple directive instances', () => {
    createComponent({
      template: `<div>
          <span v-resize-observer="handleResize"></span>
          <span v-resize-observer="handleResize"></span>
          <span v-resize-observer="handleResize"></span>
        </div>`,
    });

    expect(ResizeObserver).toHaveBeenCalledTimes(1);
    expect(ResizeObserver.mock.instances).toHaveLength(1);
  });

  it('subscribes the given DOM element to be observed', () => {
    expect(observersCount()).toBe(0);

    createComponent();

    expect(observersCount()).toBe(1);
    expect(observesElement(wrapper.element)).toBe(true);
  });

  it('passes the first entries "contentRect" and "target" to the given handler', () => {
    createComponent();

    trigger(wrapper.element, { entry: { contentRect: {} } });

    expect(mockHandleResize).toHaveBeenCalledTimes(1);
    expect(mockHandleResize).toHaveBeenCalledWith({ contentRect: {}, target: wrapper.element });
  });

  it('does a clean up when the component is destroyed', () => {
    createComponent();

    const { element } = wrapper;

    expect(element.glResizeHandler).not.toBeFalsy();

    wrapper.destroy();

    expect(element.glResizeHandler).toBeFalsy();
  });

  describe('check directive value', () => {
    afterEach(() => {
      // we are going to throw, so we need to suppress Vue error messages in jest output
      global.console.error.mockReset();
    });

    it.each([3, '', undefined, null, false, {}, []])(
      'throws if the handler is %p instead of a function',
      (directiveValue) => {
        const testComponentWithoutHandler = {
          directives: {
            resizeObserver,
          },
          data() {
            return {
              directiveValue,
            };
          },
          template: `<div v-resize-observer="directiveValue"></div>`,
        };

        expect(() => {
          wrapper = shallowMount(testComponentWithoutHandler, { localVue });
        }).toThrow(TypeError);
      }
    );
  });
});
