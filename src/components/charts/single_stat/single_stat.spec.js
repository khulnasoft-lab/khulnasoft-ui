import { shallowMount } from '@vue/test-utils';
import { variantCssColorMap } from '../../../utils/constants';
import GlAnimatedNumber from '../../utilities/animated_number/animated_number.vue';
import GlSingleStat from './single_stat.vue';

const title = 'Singe stat title';
const value = '100';
const unit = '%';
const titleIcon = 'hourglass';
const titleIconClass = 'title-icon-class';
const metaIcon = 'heart';
const metaText = 'Success';
const variant = 'info';

describe('GlSingleStat', () => {
  let wrapper;

  const createWrapper = (props = {}) => {
    wrapper = shallowMount(GlSingleStat, {
      propsData: {
        title,
        value,
        ...props,
      },
    });
  };

  const findItemByTestId = (testId) => wrapper.find(`[data-testid="${testId}"]`);
  const findAnimatedNumber = () => wrapper.findComponent(GlAnimatedNumber);

  describe('displays the correct default data', () => {
    beforeEach(() => createWrapper());

    describe.each`
      element                 | testId                  | shouldDisplay | expected
      ${'metric value'}       | ${'displayValue'}       | ${true}       | ${value}
      ${'non animated value'} | ${'non-animated-value'} | ${true}       | ${value}
      ${'metric title'}       | ${'title-text'}         | ${true}       | ${title}
      ${'metric value units'} | ${'unit'}               | ${false}      | ${null}
      ${'metric title icon'}  | ${'title-icon'}         | ${false}      | ${null}
      ${'meta icon'}          | ${'meta-icon'}          | ${false}      | ${null}
      ${'meta badge'}         | ${'meta-badge'}         | ${false}      | ${null}
    `('for the $element', ({ shouldDisplay, testId, expected, element }) => {
      it(`${shouldDisplay ? 'displays' : "doesn't display"} the ${element}`, () => {
        const el = findItemByTestId(testId);

        expect(el.exists()).toBe(shouldDisplay);

        if (shouldDisplay) expect(el.text()).toBe(expected);
      });
    });
  });

  describe('shouldAnimate', () => {
    it.each`
      propValue | shouldUseAnimatedComponent
      ${'abc'}  | ${false}
      ${'123'}  | ${true}
    `(
      'renders the correct display type for $propValue',
      ({ propValue, shouldUseAnimatedComponent }) => {
        createWrapper({ value: propValue, shouldAnimate: true });

        const el = findAnimatedNumber();
        expect(el.exists()).toBe(shouldUseAnimatedComponent);
      }
    );

    describe('units visibility', () => {
      it.each`
        display    | event          | expected
        ${'hides'} | ${'animating'} | ${true}
        ${'shows'} | ${'animated'}  | ${false}
      `('$display the units when $event', async ({ event, expected }) => {
        createWrapper({ unit, shouldAnimate: true });

        findAnimatedNumber().vm.$emit(event);

        await wrapper.vm.$nextTick();

        expect(findItemByTestId('unit').classes('gl-opacity-0!')).toBe(expected);
      });
    });
  });

  describe('optional data', () => {
    describe('meta information', () => {
      describe.each`
        scenario                                    | mockData
        ${'with only a meta icon specified'}        | ${{ metaIcon }}
        ${'with a meta icon and variant specified'} | ${{ metaIcon, variant }}
      `('$scenario', ({ mockData }) => {
        beforeEach(() => createWrapper(mockData));

        it('displays a standalone icon', () => {
          const el = findItemByTestId('meta-icon');
          const variantSpecified = Object.keys(mockData).includes('variant');

          expect(el.exists()).toBe(true);
          expect(el.props('name')).toBe(metaIcon);
          expect(el.classes()).toContain(
            variantSpecified ? variantCssColorMap[variant] : variantCssColorMap.muted
          );
        });

        it('does not display a badge', () => {
          expect(findItemByTestId('meta-badge').exists()).toBe(false);
        });
      });

      describe.each`
        scenario                                          | mockData
        ${'with only meta text specified'}                | ${{ metaText }}
        ${'with meta text and variant specified'}         | ${{ metaText, variant }}
        ${'with a meta icon and text specified'}          | ${{ metaIcon, metaText }}
        ${'with a meta icon, text and variant specified'} | ${{ metaIcon, metaText, variant }}
      `('$scenario', ({ mockData }) => {
        beforeEach(() => createWrapper(mockData));

        it("doesn't display a standalone icon", () => {
          expect(findItemByTestId('meta-icon').exists()).toBe(false);
        });

        it('displays a badge', () => {
          const badge = findItemByTestId('meta-badge');
          const iconSpecified = Object.keys(mockData).includes('metaIcon');
          const variantSpecified = Object.keys(mockData).includes('variant');

          expect(badge.exists()).toBe(true);
          expect(badge.text()).toBe(metaText);
          expect(badge.props('icon')).toBe(iconSpecified ? metaIcon : null);
          expect(badge.props('variant')).toBe(variantSpecified ? variant : 'muted');
        });
      });
    });

    describe.each`
      element                 | testId          | mockData
      ${'metric value units'} | ${'unit'}       | ${{ unit }}
      ${'metric title icon'}  | ${'title-icon'} | ${{ titleIcon }}
    `('$element', ({ testId, mockData }) => {
      beforeEach(() => createWrapper(mockData));

      it('displays when specified', () => {
        const el = findItemByTestId(testId);

        expect(el.exists()).toBe(true);
      });
    });

    describe('`titleIconClass` Prop', () => {
      it.each`
        classes
        ${titleIconClass}
        ${[titleIconClass]}
        ${{ [titleIconClass]: true }}
      `(
        'correctly adds classes to title icon when `titleIconClass` prop is $classes',
        ({ classes }) => {
          createWrapper({
            titleIcon,
            titleIconClass: classes,
          });

          expect(findItemByTestId('title-icon').classes()).toEqual(
            expect.arrayContaining(['title-icon-class'])
          );
        }
      );
    });

    describe.each([true, false])(`when the \`useDelimiters\` prop is %s`, (useDelimiters) => {
      const initialValue = '100000.12';

      it('should render the value as expected when not animated', () => {
        createWrapper({
          value: initialValue,
          shouldAnimate: false,
          useDelimiters,
        });

        const displayValue = useDelimiters ? '100,000.12' : initialValue;

        expect(findItemByTestId('non-animated-value').text()).toBe(displayValue);
      });

      it('should pass the value and delimiter setting to `GlAnimatedNumber`', () => {
        createWrapper({
          value: initialValue,
          shouldAnimate: true,
          animationDecimalPlaces: 2,
          useDelimiters,
        });

        expect(findAnimatedNumber().props()).toMatchObject({
          number: Number(initialValue),
          decimalPlaces: 2,
          useDelimiters,
        });
      });

      it('should keep all the decimal points defined by the value', () => {
        const decimalValue = '100000.000';

        createWrapper({
          value: decimalValue,
          shouldAnimate: false,
          useDelimiters,
        });

        const displayValue = useDelimiters ? '100,000.000' : decimalValue;

        expect(findItemByTestId('non-animated-value').text()).toBe(displayValue);
      });
    });
  });
});
