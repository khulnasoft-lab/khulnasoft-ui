import readme from './accordion_item.md';
import GlAccordionItem from './accordion_item.vue';

const template = `
    <gl-accordion-item :title="title" :visible="visible" :header-level="headerLevel">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, maiores.
      </gl-accordion-item>
    `;

const defaultValue = (prop) => GlAccordionItem.props[prop].default;

const generateProps = ({
  visible = defaultValue('visible'),
  headerLevel = 3,
  title = 'Accordion Item Title',
} = {}) => ({
  visible,
  headerLevel,
  title,
});

const Template = (args) => ({
  components: {
    GlAccordionItem,
  },
  props: Object.keys(args),
  template,
  provide: {
    defaultHeaderLevel: () => defaultValue('headerLevel'),
    accordionSetId: () => '1',
  },
});

export const Default = Template.bind({});
Default.args = generateProps();

export const InitiallyExpanded = Template.bind({});
InitiallyExpanded.args = generateProps({ visible: true, title: 'Item Content Initially Expanded' });

export default {
  title: 'base/accordion/accordion-item',
  component: GlAccordionItem,
  bootstrapComponent: 'b-collapse',
  parameters: {
    storyshots: { disable: true },
    knobs: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {
    headerLevel: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5, 6],
      },
    },
  },
};
