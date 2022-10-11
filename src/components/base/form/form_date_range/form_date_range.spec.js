import { mount, shallowMount } from '@vue/test-utils';
import GlFormDateRange from './form_date_range.vue';

const modelEvent = GlFormDateRange.model.event;
const newValue = '2022-02-22';

describe('GlFormDateRange', () => {
  let wrapper;

  const createComponent = (propsData = {}, mountFn = shallowMount) => {
    wrapper = mountFn(GlFormDateRange, {
      propsData,
    });
  };

  describe('v-model', () => {
    beforeEach(() => {
      createComponent({}, mount);

      wrapper.setValue(newValue);
    });

    it('synchronously emits an update event', () => {
      expect(wrapper.emitted('update')).toEqual([[newValue]]);
    });

    it('synchronously updates model', () => {
      expect(wrapper.emitted(modelEvent)).toEqual([[newValue]]);
    });
  });
});
