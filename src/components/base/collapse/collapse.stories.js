import GlButton from '../button/button.vue';
import GlCard from '../card/card.vue';
import GlCollapse from './collapse.vue';
import readme from './collapse.md';

const generateProps = ({ visible = false } = {}) => ({ visible });

const template = `
  <div>
    <h1>Here's a headline</h1>
    <gl-button v-gl-collapse-toggle.collapse class="float-right" category="primary">
      Toggle Collapse
    </gl-button>
    <gl-collapse :visible="visible" id="collapse" class="gl-mt-2">
      <span>
        This content can be hidden by default, which is good if there are some extensive details 
        that should only be visible if the user wants to interact with them
      </span>
    </gl-collapse>
  </div>`;

const Template = (args, { argTypes }) => ({
  components: { GlButton, GlCard, GlCollapse },
  props: Object.keys(argTypes),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/collapse',
  component: GlCollapse,
  parameters: {
    bootstrapComponent: 'b-collapse',
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
