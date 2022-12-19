import readme from './accordion.md';
import GlAccordion from './accordion.vue';
import GlAccordionItem from './accordion_item.vue';

const template = `
    <gl-accordion :auto-collapse="autoCollapse" :header-level="headerLevel">
      <gl-accordion-item title="Item 1" :header-level="headerLevel">
        Each accordion can be expanded or collapsed independently of others.
      </gl-accordion-item>

      <gl-accordion-item title="Item 2" :header-level="headerLevel" :visible="true">
        If you want to have an accordion item to be initially visible, please see
        <code>Initially Expanded</code> example for the <code>GLAccordionItem</code>.
      </gl-accordion-item>

      <gl-accordion-item title="Item 3" :header-level="headerLevel" :visible="autoCollapse">
        If you want the other accordion items to collapse when one is open, please see
        <code>Auto Collapse</code> example.
      </gl-accordion-item>
    </gl-accordion>
    `;

const defaultValue = (prop) => GlAccordion.props[prop].default;

const generateProps = ({ autoCollapse = defaultValue('autoCollapse'), headerLevel = 3 } = {}) => ({
  autoCollapse,
  headerLevel,
});

const Template = (args) => ({
  components: {
    GlAccordion,
    GlAccordionItem,
  },
  props: Object.keys(args),
  template,
});

export const Default = Template.bind({});
Default.args = generateProps();

export default {
  title: 'base/accordion',
  component: GlAccordion,
  parameters: {
    bootstrapComponent: 'b-collapse',
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    headerLevel: {
      options: [1, 2, 3, 4, 5, 6],
      control: 'select',
    },
  },
};
