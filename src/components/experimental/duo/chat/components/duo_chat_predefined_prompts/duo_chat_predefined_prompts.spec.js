/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { shallowMount } from '@vue/test-utils';
import GlButton from '../../../../../base/button/button.vue';
import GlDuoChatPredefinedPrompts from './duo_chat_predefined_prompts.vue';

describe('GlDuoChatPredefinedPrompts', () => {
  let wrapper;
  const predefinedPrompt1 = 'foo';
  const predefinedPrompt2 = 'bar';

  const createComponent = () => {
    wrapper = shallowMount(GlDuoChatPredefinedPrompts, {
      propsData: {
        prompts: [predefinedPrompt1, predefinedPrompt2],
      },
    });
  };

  const findButtons = () => wrapper.findAllComponents(GlButton);

  it('renders a button for each predefined prompt', () => {
    createComponent();

    expect(findButtons()).toHaveLength(2);
  });

  it('emits the click event when a button is clicked', () => {
    createComponent();

    findButtons().at(0).vm.$emit('click');
    expect(wrapper.emitted('click')).toEqual([[predefinedPrompt1]]);

    findButtons().at(1).vm.$emit('click');
    expect(wrapper.emitted('click')).toEqual([[predefinedPrompt1], [predefinedPrompt2]]);
  });
});
