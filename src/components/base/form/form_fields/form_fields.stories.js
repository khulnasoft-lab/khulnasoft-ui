import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import GlModal from '../../modal/modal.vue';
import GlButton from '../../button/button.vue';
import GlListbox from '../../new_dropdowns/listbox/listbox.vue';
import GlFormFields from './form_fields.vue';
import readme from './form_fields.md';
import { required } from './validators';
import { mapToNumber } from './mappers';

const Template = () => ({
  ITEMS: ['Pizza', 'Keyboards', 'Guitars', 'Rocket ships'].map((text) => ({ text, value: text })),
  components: { GlFormFields, GlButton, GlModal, GlListbox },
  data() {
    return {
      // why: We declare fields here so that we can test what binding the
      //      "confirmPassword" validator to "this.formValues" would act
      //      like. In most cases, these can be constant and injected through
      //      `$options`.
      fields: {
        USERNAME: {
          label: 'NAME (ALL CAPS)',
          mapValue: (x) => x?.toUpperCase(),
          validators: [required('NAME IS REQUIRED!!!')],
        },
        password: {
          label: 'Password with group styling',
          inputAttrs: { type: 'password' },
          groupAttrs: { class: 'gl-bg-purple-50 gl-w-20' },
          validators: [required('Password is required')],
        },
        confirmPassword: {
          label: 'Confirm Password',
          inputAttrs: { type: 'password' },
          validators: [
            required('Confirmed password is required'),
            (confirmValue) =>
              confirmValue !== this.formValues.password ? 'Must match password' : '',
          ],
        },
        custom: {
          label: 'Custom input',
          mapValue: mapToNumber,
          validators: [(val) => (val < 1 ? 'Please click this at least once :)' : '')],
        },
        favoriteItem: {
          label: 'Favorite Item (Optional)',
        },
      },
      formValues: {},
      testFormId: uniqueId('form_fields_story_'),
    };
  },
  computed: {
    values() {
      return omit(this.formValues, ['confirmPassword']);
    },
    valuesJSON() {
      // JSON doesn't allow undefined values
      return JSON.stringify(this.values, (key, value) => (value === undefined ? null : value), 2);
    },
  },
  methods: {
    onSubmit() {
      this.$refs.modal.show();
    },
  },
  template: `
    <div>
      <h3>Fields</h3>
      <form :id="testFormId" @submit.prevent>
        <gl-form-fields :fields="fields" v-model="formValues" :form-id="testFormId" auto-disable-submit-button @submit="onSubmit">
          <template #input(custom)="{ id, value, input, blur }">
            <button :id="id" @click="input(value + 1)" @blur="blur" type="button">{{value}}</button>
          </template>
          <template #input(favoriteItem)="{ id, value, input, blur }">
            <gl-listbox :id="id" :items="$options.ITEMS" :selected="value" @select="input" @hidden="blur" />
          </template>
        </gl-form-fields>
        <gl-button type="submit" category="primary">Submit</gl-button>
      </form>
      <gl-modal ref="modal" modal-id="submission-modal" title="Form submission"><pre>{{ valuesJSON }}</pre></gl-modal>
    </div>
  `,
});

export const Default = Template.bind({});

export default {
  title: 'base/form/form-fields',
  component: GlFormFields,
  parameters: {
    knobs: {
      disable: true,
    },
    docs: {
      description: {
        component: readme,
      },
    },
  },
  argTypes: {},
};
