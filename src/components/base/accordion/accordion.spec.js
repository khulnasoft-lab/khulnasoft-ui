import { mount } from '@vue/test-utils';
import Vue from 'vue';
import GlAccordion from './accordion.vue';
import GlAccordionItem from './accordion_item.vue';

describe('GlAccordion', () => {
  let wrapper;

  const createComponent = ({ headerLevel = 3, autoCollapse = false } = {}) => {
    wrapper = mount(
      Vue.extend({
        components: { GlAccordion, GlAccordionItem },
        data() {
          return { headerLevel, autoCollapse };
        },
        // eslint-disable-next-line @gitlab/no-runtime-template-compiler
        template: `
          <gl-accordion :header-level="headerLevel" :auto-collapse="autoCollapse">
            <gl-accordion-item title="Item 1">
              Foo
            </gl-accordion-item>
            <gl-accordion-item title="Item 2">
              Bar
            </gl-accordion-item>
            <gl-accordion-item title="Item 3">
              Bin
            </gl-accordion-item>
          </gl-accordion>`,
      })
    );
  };

  const findAccordionItems = () => wrapper.findAllComponents(GlAccordionItem);

  it('does not populate the accordion prop by default', () => {
    createComponent();
    const accordionSetId = findAccordionItems().at(0).vm.accordion;

    // accordion should not be set
    expect(accordionSetId).toBeUndefined();
  });

  it('populates the accordion prop when autoCollapse is true', () => {
    createComponent({ autoCollapse: true });
    const accordionSetId = findAccordionItems().at(0).vm.accordion;

    // accordion should be set
    expect(accordionSetId).not.toBeUndefined();

    // accordion should be the same across glAccordionItem children
    expect(findAccordionItems().at(1).vm.accordion).toEqual(accordionSetId);
  });

  it('passes a default headerLevel to children', () => {
    createComponent({ headerLevel: 4 });
    expect(wrapper.findAll('h4')).toHaveLength(findAccordionItems().length);
  });
});
