import readme from './accordion_item.md';
import GlAccordionItem from './accordion_item.vue';

const template = `
    <gl-accordion-item :title="title" :titleVisible="titleVisible" :visible="visible" :header-level="headerLevel">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, maiores.
    </gl-accordion-item>
    `;

const defaultValue = (prop) => GlAccordionItem.props[prop].default;

const generateProps = ({
  visible = defaultValue('visible'),
  headerLevel = 3,
  title = 'Accordion Item Title',
  titleVisible = undefined,
} = {}) => ({
  visible,
  headerLevel,
  title,
  titleVisible,
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
Default.args = generateProps({ visible: true, titleVisible: 'Accordion Item Title Expanded' });

export default {
  title: 'base/accordion/accordion-item',
  component: GlAccordionItem,
  bootstrapComponent: 'b-collapse',
  tags: ['skip-visual-test'],
  parameters: {
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
