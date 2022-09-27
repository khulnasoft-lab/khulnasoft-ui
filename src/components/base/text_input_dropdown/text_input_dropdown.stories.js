import GlTextInputDropdownStoryDemo from './text_input_dropdown_story_demo.vue';
import readme from './text_input_dropdown.md';

const generateProps = () => ({});

const Template = () => ({
  render(h) {
    return h(GlTextInputDropdownStoryDemo);
  },
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/text_input_dropdown',
  component: GlTextInputDropdownStoryDemo,
  parameters: {
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
