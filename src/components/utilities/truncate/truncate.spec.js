import { shallowMount } from '@vue/test-utils';
import { POSITION } from './constants';
import Truncate from './truncate.vue';
import { createMockDirective, getBinding } from '~helpers/vue_mock_directive';

const removeSpecialChar = (text) => {
  return text.replace(/&lrm;|\u200E/gi, '');
};

const positionOptions = Object.values(POSITION);

describe('Truncate component', () => {
  let wrapper;

  const defaultProps = {
    text: 'ee/app/assets/javascripts/vue_shared/src/utils_reports/components/utils/index.js',
  };

  const findByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);

  const createComponent = (props, slots = {}) => {
    wrapper = shallowMount(
      { extends: Truncate, directives: { GlTooltip: createMockDirective('gl-tooltip') } },
      { propsData: { ...defaultProps, ...props }, slots }
    );
  };

  describe('All', () => {
    beforeEach(() => {
      createComponent();
    });

    it.each(positionOptions)(
      '%s truncation: should have title, class, original text',
      (position) => {
        createComponent({ position });
        const element = wrapper.find('span');
        expect(element.attributes('title')).toBe(defaultProps.text);
        expect(element.attributes('class')).toBe('gl-truncate');
        expect(removeSpecialChar(wrapper.text())).toBe(defaultProps.text);
      }
    );

    it('should have the default position', () => {
      expect(wrapper.props('position')).toBe('end');
    });

    it('disables the tooltip by default', () => {
      expect(getBinding(wrapper.find('.gl-truncate').element, 'gl-tooltip').value.disabled).toBe(
        true
      );
    });
  });

  describe('start truncation', () => {
    beforeEach(() => {
      createComponent({ position: 'start' });
    });

    it('should have the truncate-start class on the text span', () => {
      const textSpan = wrapper.findComponent({ ref: 'text' });
      expect(textSpan.classes('gl-truncate-start')).toBe(true);
    });

    it('should have the special char surrounded', () => {
      const spanTag = wrapper.findComponent({ ref: 'text' }).text();

      expect(spanTag.charAt(0)).toBe('\u200E');
      expect(spanTag.charAt(spanTag.length - 1)).toBe('\u200E');
    });
  });

  describe('middle truncation', () => {
    let firstTextSpan;
    let secondTextSpan;

    beforeEach(() => {
      createComponent({ position: 'middle' });
      firstTextSpan = findByTestId('text-beginning');
      secondTextSpan = findByTestId('text-ending');
    });

    it('should have appropriate classes applied', () => {
      expect(firstTextSpan.classes('gl-truncate-end')).toBe(true);
      expect(secondTextSpan.classes('gl-truncate-start')).toBe(true);
    });

    it('should have the spans positioned correctly', () => {
      expect(firstTextSpan.text()).toBe('ee/app/assets/javascripts/vue_shared/src');
      expect(secondTextSpan.text()).toBe('‎/utils_reports/components/utils/index.js‎');
    });

    it('last part should have the special char surrounded', () => {
      const lastPart = secondTextSpan.text();

      expect(lastPart.charAt(0)).toBe('\u200E');
      expect(lastPart.charAt(lastPart.length - 1)).toBe('\u200E');
    });
  });

  describe('end truncation', () => {
    beforeEach(() => {
      createComponent();
    });

    it('should not have the special char', () => {
      expect(wrapper.text()).not.toContain('\u200E');
    });

    it('should have the truncate-end class', () => {
      expect(wrapper.find('.gl-truncate-end').exists()).toBe(true);
    });
  });

  describe('slots', () => {
    const beforeText = 'Before Text Slot';
    const afterText = 'After Text Slot';
    const slotOptions = {
      'before-text': {
        slot: `<span id="before-text">${beforeText}</span>`,
        text: beforeText,
      },
      'after-text': {
        slot: `<span id="after-text">${afterText}</span>`,
        text: afterText,
      },
    };

    it.each`
      position    | slotType
      ${'start'}  | ${'before-text'}
      ${'start'}  | ${'after-text'}
      ${'middle'} | ${'before-text'}
      ${'middle'} | ${'after-text'}
      ${'end'}    | ${'before-text'}
      ${'end'}    | ${'after-text'}
    `('$position truncation $slot slot', ({ position, slotType }) => {
      const slot = { [slotType]: slotOptions[slotType].slot };

      createComponent({ position }, slot);

      const slotComponent = wrapper.find(`#${slotType}`);
      expect(slotComponent.text()).toBe(slotOptions[slotType].text);
    });
  });
});
