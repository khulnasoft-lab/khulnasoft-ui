import { shallowMount } from '@vue/test-utils';
import GlIcon from '../../../../../base/icon/icon.vue';
import GlButton from '../../../../../base/button/button.vue';
import GlDuoWorkflowPanel from './duo_workflow_panel.vue';

describe('GlDuoWorkflowPanel', () => {
  let wrapper;

  const createWrapper = ({ propsData = {}, slots = {} } = {}) => {
    wrapper = shallowMount(GlDuoWorkflowPanel, { propsData, slots });
  };

  const findIcon = () => wrapper.findComponent(GlIcon);
  const findButton = () => wrapper.findComponent(GlButton);

  it('sets the props accordingly', async () => {
    const headerIcon = 'tanuki';
    const expandPanelButtonTitle = 'embiggen';
    const collapsePanelButtonTitle = 'shrink';
    createWrapper({
      propsData: {
        headerIcon,
        expandPanelButtonTitle,
        collapsePanelButtonTitle,
      },
    });

    expect(findIcon().props().name).toBe(headerIcon);
    expect(findButton().attributes().title).toBe(collapsePanelButtonTitle);
  });

  describe('when expanded', () => {
    beforeEach(() => {
      createWrapper({ propsData: { expanded: false } });
    });
    it('sets the panel as collapsed when expanded is false', () => {
      expect(findButton().attributes().title).toBe('Expand');
    });

    it('sets the button icon appropriately', () => {
      expect(findButton().props().icon).toBe('chevron-down');
    });
  });

  it('sets the button icon appropriately', async () => {
    createWrapper();

    const button = findButton();

    expect(button.props().icon).toBe('chevron-up');
  });

  it('emits toggle-panel event when the button is clicked', async () => {
    createWrapper();

    await findButton().vm.$emit('click');

    expect(wrapper.emitted('toggle-panel')).toHaveLength(1);
  });

  it('shows the slot content correctly', () => {
    const title = {
      template: '<span>Test Title</span>',
    };
    const subtitle = {
      template: '<span>Test Subtitle</span>',
    };
    const content = {
      template: '<span>Test Subtitle</span>',
    };

    createWrapper({
      slots: {
        title,
        subtitle,
        content,
      },
    });

    expect(wrapper.findComponent(title).exists()).toBe(true);
    expect(wrapper.findComponent(subtitle).exists()).toBe(true);
    expect(wrapper.findComponent(content).exists()).toBe(true);
  });
});
