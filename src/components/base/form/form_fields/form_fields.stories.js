import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import GlModal from '../../modal/modal.vue';
import GlButton from '../../button/button.vue';
import GlAlert from '../../alert/alert.vue';
import GlListbox from '../../new_dropdowns/listbox/listbox.vue';
import GlIcon from '../../icon/icon.vue';
import { setStoryTimeout } from '../../../../utils/test_utils';
import GlFormFields from './form_fields.vue';
import readme from './form_fields.md';
import { required } from './validators';
import { mapToNumber } from './mappers';

const Template = () => ({
  ITEMS: ['Pizza', 'Keyboards', 'Guitars', 'Rocket ships'].map((text) => ({ text, value: text })),
  components: { GlFormFields, GlButton, GlModal, GlListbox, GlAlert, GlIcon },
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
      serverValidations: {},
      loading: false,
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
    favoriteItemToggleText() {
      if (!this.formValues.favoriteItem) {
        return 'Select an item';
      }

      return null;
    },
  },
  methods: {
    onInputField({ name }) {
      this.$delete(this.serverValidations, name);
    },
    async onSubmit() {
      this.loading = true;

      // Simulate waiting for API request to resolve
      await new Promise((resolve) => {
        setStoryTimeout(resolve, 1000);
      });

      this.loading = false;

      // Manually checking field and validating for this example.
      // In practice this error message would come from the API response.
      if (this.formValues.USERNAME === 'FOO') {
        this.$set(this.serverValidations, 'USERNAME', 'Username has already been taken.');

        return;
      }

      this.$refs.modal.show();
    },
  },
  template: `
    <div>
      <h3>Fields</h3>
      <form :id="testFormId" @submit.prevent>
        <gl-form-fields :fields="fields" v-model="formValues" :form-id="testFormId" :server-validations="serverValidations" @input-field="onInputField" @submit="onSubmit">
          <template #group(confirmPassword)-label>
            <div class="gl-display-flex gl-align-items-center gl-column-gap-3">
              <span>Confirm Password</span>
              <gl-icon name="information-o" />
            </div>
          </template>
          <template #group(confirmPassword)-description>
            Description using <code>group(confirmPassword)-description</code> slot
          </template>
          <template #after(confirmPassword)>
            <gl-alert class="gl-mb-5" :dismissible="false">Custom content using <code>after(confirmPassword)</code> slot</gl-alert>
          </template>
          <template #input(custom)="{ id, value, input, blur }">
            <button :id="id" @click="input(value + 1)" @blur="blur" type="button">{{value}}</button>
          </template>
          <template #input(favoriteItem)="{ id, value, input, blur }">
            <gl-listbox :id="id" :items="$options.ITEMS" :selected="value" :toggle-text="favoriteItemToggleText" @select="input" @hidden="blur" />
          </template>
          <template #group(favoriteItem)-label-description>
            Label description using <code>group(favoriteItem)-label-description</code> slot
          </template>
        </gl-form-fields>
        <gl-button type="submit" category="primary" :loading="loading">Submit</gl-button>
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
