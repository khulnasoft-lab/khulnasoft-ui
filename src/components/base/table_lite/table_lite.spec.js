import { shallowMount } from '@vue/test-utils';
import { BTableLite } from 'bootstrap-vue';
import GlTableLite from './table_lite.vue';

describe('GlTableLite', () => {
  let wrapper;

  const factory = (propsData) => {
    wrapper = shallowMount(GlTableLite, {
      propsData,
    });
  };

  const findBTableLite = () => wrapper.findComponent(BTableLite);

  it('adds gl-table class to tableClass prop', () => {
    factory({ tableClass: 'test-class' });

    expect(findBTableLite().props().tableClass).toEqual(['gl-table', 'test-class']);
  });
});
