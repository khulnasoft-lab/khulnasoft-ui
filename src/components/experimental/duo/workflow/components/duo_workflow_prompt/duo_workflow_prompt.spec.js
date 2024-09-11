import { shallowMount } from '@vue/test-utils';
import GlDuoWorkflowPanel from '../duo_workflow_panel/duo_workflow_panel.vue';
import GlFormGroup from '../../../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea.vue';
import GlFormInput from '../../../../../base/form/form_input/form_input.vue';
import GlDuoWorkflowPrompt from './duo_workflow_prompt.vue';

describe('GlDuoWorkflowPrompt', () => {
  let wrapper;

  const createWrapper = ({ propsData = {} } = {}) => {
    wrapper = shallowMount(GlDuoWorkflowPrompt, { propsData, stubs: { GlDuoWorkflowPanel } });
  };

  const findDuoWorkflowPanel = () => wrapper.findComponent(GlDuoWorkflowPanel);
  const findConfirmButton = () =>
    wrapper.findComponent('[data-test-id="duo-workflow-prompt-confirm"]');
  const findCancelButton = () =>
    wrapper.findComponent('[data-test-id="duo-workflow-prompt-cancel"]');
  const findPromptFormGroup = () => wrapper.findComponent(GlFormGroup);
  const findPromptTextarea = () => wrapper.findComponent(GlFormTextarea);
  const findImageFormGroup = () => wrapper.findAllComponents(GlFormGroup).at(1);
  const findImageInput = () => wrapper.findComponent(GlFormInput);

  it('sets the props accordingly', async () => {
    const prompt = 'Fix my pipeline!';
    const image = 'alpine';
    const title = 'Plan';
    const summary = 'this is the plan';
    const promptLabel = 'Prompt';
    const promptLabelDescription = 'what do you want to do';
    const promptDescription = 'Be specific!';
    const promptId = 'prompt';
    const imageLabel = 'Docker image';
    const imageLabelDescription = 'what is the context';
    const imageDescription = 'Choose python';
    const imageId = 'image';
    const confirmButtonText = 'yes';
    const cancelButtonText = 'no';
    const expandPanelButtonTitle = 'embiggen';
    const collapsePanelButtonTitle = 'shrink';

    createWrapper({
      propsData: {
        prompt,
        image,
        title,
        summary,
        promptLabel,
        promptLabelDescription,
        promptDescription,
        promptId,
        imageLabel,
        imageLabelDescription,
        imageDescription,
        imageId,
        confirmButtonText,
        cancelButtonText,
        expandPanelButtonTitle,
        collapsePanelButtonTitle,
      },
    });

    expect(findDuoWorkflowPanel().props()).toEqual({
      headerIcon: 'issue-type-objective',
      expandPanelButtonTitle,
      collapsePanelButtonTitle,
      expanded: true,
    });
    expect(findDuoWorkflowPanel().text()).toMatch(title);
    expect(findDuoWorkflowPanel().text()).toMatch(summary);

    expect(findPromptFormGroup().props()).toMatchObject({
      labelDescription: promptLabelDescription,
    });
    expect(findPromptFormGroup().attributes()).toMatchObject({
      label: promptLabel,
      description: promptDescription,
      'label-for': promptId,
    });

    expect(findPromptTextarea().props().value).toBe(prompt);

    expect(findImageFormGroup().props()).toMatchObject({
      labelDescription: imageLabelDescription,
    });
    expect(findImageFormGroup().attributes()).toMatchObject({
      label: imageLabel,
      description: imageDescription,
      'label-for': imageId,
    });

    expect(findImageInput().attributes().value).toBe(image);

    expect(findConfirmButton().text()).toMatch(confirmButtonText);
    expect(findCancelButton().text()).toMatch(cancelButtonText);
  });

  it('emits a change event when the user types in a prompt', async () => {
    const prompt = 'Implement my issue';

    createWrapper();

    await findPromptTextarea().vm.$emit('input', prompt);

    expect(wrapper.emitted('update:prompt')).toStrictEqual([[prompt]]);
  });

  it('emits an image event when the user types in an image', async () => {
    const image = 'node';

    createWrapper();

    await findImageInput().vm.$emit('input', image);

    expect(wrapper.emitted('update:image')).toStrictEqual([[image]]);
  });

  it('emits a confirm event when the user clicks the confirm button', async () => {
    createWrapper();

    await findConfirmButton().vm.$emit('click');

    expect(wrapper.emitted().confirm).toStrictEqual([[undefined]]);
  });

  it('emits a cancel event when the user clicks the cancel button', async () => {
    createWrapper();

    await findCancelButton().vm.$emit('click');

    expect(wrapper.emitted().cancel).toStrictEqual([[undefined]]);
  });
});
