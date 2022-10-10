import { mount, shallowMount } from '@vue/test-utils';
import GlFormDate from './form_date.vue';

const modelEvent = GlFormDate.model.event;
const newValue = '2022-02-22';

describe('GlFormDate', () => {
  let wrapper;

  const createComponent = (propsData = {}, mountFn = shallowMount) => {
    wrapper = mountFn(GlFormDate, {
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
