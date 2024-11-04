import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import GlAnimatedLoaderIcon from '../../../../../base/animated_icon/animated_loader_icon.vue';
import { LOADING_TRANSITION_DURATION } from '../../constants';
import GlDuoChatLoader from './duo_chat_loader.vue';

jest.useFakeTimers();

describe('GlDuoChatLoader', () => {
  let wrapper;

  const createComponent = ({ propsData = {} } = {}) => {
    wrapper = mount(GlDuoChatLoader, {
      propsData,
    });
  };

  const transition = async () => {
    jest.advanceTimersByTime(LOADING_TRANSITION_DURATION);
    await nextTick();
  };

  const findTransitionText = () => wrapper.find('[data-testid="current-transition"]').text();
  const findToolText = () => wrapper.find('[data-testid="tool"]');
  const findLoaderIcon = () => wrapper.findComponent(GlAnimatedLoaderIcon);

  describe('rendering', () => {
    const defaultTool = GlDuoChatLoader.props.toolName.default;

    it('displays a loader icon', async () => {
      createComponent();
      await nextTick();

      expect(findLoaderIcon().exists()).toBe(true);
      expect(findLoaderIcon().props('isOn')).toBe(true);
    });

    it('displays a default tool', async () => {
      createComponent();
      await nextTick();

      expect(findToolText().text()).toBe(defaultTool);
    });

    it('shows the `toolName` when it is passed', async () => {
      createComponent({
        propsData: {
          toolName: 'foo',
        },
      });
      await nextTick();

      expect(findToolText().text()).toBe('foo');
      expect(findToolText().text()).not.toBe(defaultTool);
    });

    it('cycles through transition texts', async () => {
      createComponent();
      await nextTick();

      expect(findTransitionText()).toEqual('finding');

      await transition();

      expect(findTransitionText()).toEqual('working on');

      await transition();

      expect(findTransitionText()).toEqual('generating');

      await transition();

      expect(findTransitionText()).toEqual('producing');

      await transition();

      expect(findTransitionText()).toEqual('finding');
    });
  });
});
