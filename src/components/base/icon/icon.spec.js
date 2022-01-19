import { shallowMount } from '@vue/test-utils';
import { iconSizeOptions } from '~/utils/constants';
import Icon from './icon.vue';

const ICONS_PATH = '/path/to/icons.svg';
const TEST_SIZE = 8;
const TEST_NAME = 'check-circle';

jest.mock('@gitlab/svgs/dist/icons.svg', () => '/path/to/icons.svg');

describe('Icon component', () => {
  let wrapper;
  let consoleSpy;

  const createComponent = (props) => {
    wrapper = shallowMount(Icon, {
      propsData: {
        size: TEST_SIZE,
        name: TEST_NAME,
        ...props,
      },
    });
  };

  const validateSize = (size) => Icon.props.size.validator(size);
  const validateName = (name) => Icon.props.name.validator(name);

  afterEach(() => {
    if (consoleSpy) {
      consoleSpy.mockRestore();
    }
  });

  it('has role=img', () => {
    createComponent();

    expect(wrapper.attributes('role')).toBe('img');
  });

  describe('when created', () => {
    beforeEach(() => {
      createComponent();
    });

    it(`shows svg class "s${TEST_SIZE}" and path "${ICONS_PATH}#${TEST_NAME}"`, () => {
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('size validator', () => {
    const maxSize = Math.max(...iconSizeOptions);

    it('fails with size outside options', () => {
      expect(validateSize(maxSize + 10)).toBe(false);
    });

    it('passes with size in options', () => {
      expect(validateSize(maxSize)).toBe(true);
    });
  });

  describe('name validator', () => {
    it('fails with name that does not exist', () => {
      const badName = `${TEST_NAME}-bogus-zebra`;
      consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      expect(validateName(badName)).toBe(false);

      expect(consoleSpy).toHaveBeenCalledWith(
        `Icon '${badName}' is not a known icon of @gitlab/svgs`
      );
    });

    it('passes with name that exists', () => {
      expect(validateName(TEST_NAME)).toBe(true);
    });
  });

  describe('aria-hidden', () => {
    it('is true when there is no aria-label', () => {
      createComponent();

      expect(wrapper.attributes('aria-hidden')).toBe('true');
    });

    it('does not exist there is an aria-label', () => {
      createComponent({ 'aria-label': 'Icon label' });

      expect(wrapper.attributes('aria-hidden')).toBeUndefined();
    });
  });
});
