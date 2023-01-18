import Vue from 'vue';
import {
  GlForm,
  GlFormGroup,
  GlFormInput,
  GlFormTextarea,
  GlListbox,
  GlButton,
  GlToast,
} from '../../../index';
import readme from './use_form.md';
import { useForm } from './use_form';
import { required, min, matches } from './validators';

Vue.use(GlToast);

const { formState, formStateComputedProperty, registerFormField, clearFormFields, handleSubmit } =
  useForm();

const [firstNameBindings] = registerFormField('firstName', {
  rules: [
    {
      validator: required,
      message: 'First name is required.',
    },
  ],
});
const [lastNameBindings] = registerFormField('lastName', {
  rules: [
    {
      validator: required,
      message: 'Last name is required.',
    },
  ],
});
const [bioBindings] = registerFormField('bio', {
  rules: [
    {
      validator: required,
      message: 'Bio is required.',
    },
  ],
});
const [roleBindings] = registerFormField('role', {
  value: null,
  shouldBindInputAttributes: false,
  rules: [
    {
      validator: required,
      message: 'Role is required.',
    },
  ],
});
const [usernameBindings] = registerFormField('username', {
  rules: [
    {
      validator: required,
      message: 'Username is required.',
    },
    {
      validator: min,
      options: {
        min: 5,
      },
      message: 'Username must be at least 5 characters.',
    },
    {
      validator: (value) => !/\s/g.test(value),
      options: {
        min: 8,
      },
      message: 'Username cannot contain spaces.',
    },
  ],
});
const [passwordBindings] = registerFormField('password', {
  rules: [
    {
      validator: required,
      message: 'Password is required.',
    },
  ],
});
const [confirmPasswordBindings] = registerFormField('confirmPassword', {
  rules: [
    {
      validator: required,
      message: 'Confirm password is required.',
    },
    {
      validator: matches,
      options: {
        otherValue: () => formState.fields.password.value,
      },
      message: 'Your passwords do not match.',
    },
  ],
});

export const Default = () => ({
  roles: [
    {
      value: 'frontendEngineer',
      text: 'Frontend engineer',
    },
    {
      value: 'backendEngineer',
      text: 'Backend engineer',
    },
    {
      value: 'securityEngineer',
      text: 'Security engineer',
    },
    {
      value: 'testEngineer',
      text: 'Test engineer',
    },
  ],
  components: {
    GlForm,
    GlFormGroup,
    GlFormInput,
    GlFormTextarea,
    GlListbox,
    GlButton,
  },
  computed: {
    formState: formStateComputedProperty,
    firstNameBindings,
    lastNameBindings,
    bioBindings,
    roleBindings,
    usernameBindings,
    passwordBindings,
    confirmPasswordBindings,
    roleToggleText() {
      if (this.formState.fields.role.value !== null) {
        return null;
      }

      return 'Choose a role';
    },
  },
  methods: {
    onSubmit: handleSubmit({
      onSuccess(event, formValues) {
        console.log(formValues);
        this.$toast.show('Form submitted successfully.');
        clearFormFields();
        event.preventDefault();
      },
      onError() {
        console.log('validation error');
      },
    }),
  },
  template: `
    <gl-form @submit="onSubmit">
      <gl-form-group v-bind="firstNameBindings.group" label="First name">
        <gl-form-input v-model="formState.fields.firstName.value" v-bind="firstNameBindings.input" />
      </gl-form-group>
      <gl-form-group v-bind="lastNameBindings.group" label="Last name">
        <gl-form-input v-model="formState.fields.lastName.value" v-bind="lastNameBindings.input" />
      </gl-form-group>
      <gl-form-group v-bind="bioBindings.group" label="Bio">
        <gl-form-textarea v-model="formState.fields.bio.value" v-bind="bioBindings.input" />
      </gl-form-group>
      <gl-form-group v-bind="roleBindings.group" label="Role" id="role">
        <gl-listbox v-model="formState.fields.role.value" v-bind="roleBindings.input" :items="$options.roles" :toggle-text="roleToggleText" toggle-aria-labelled-by="role__BV_label_" />
      </gl-form-group>
      <gl-form-group v-bind="usernameBindings.group" label="Username">
        <gl-form-input v-model="formState.fields.username.value" v-bind="usernameBindings.input" />
      </gl-form-group>
      <gl-form-group v-bind="passwordBindings.group" label="Password">
        <gl-form-input v-model="formState.fields.password.value" v-bind="passwordBindings.input" type="password" />
      </gl-form-group>
      <gl-form-group v-bind="confirmPasswordBindings.group" label="Confirm password">
        <gl-form-input v-model="formState.fields.confirmPassword.value" v-bind="confirmPasswordBindings.input" type="password" />
      </gl-form-group>
      <gl-button type="submit">Submit</gl-button>
    </gl-form>
  `,
});

export const NotUsingUseForm = () => ({
  roles: [
    {
      value: 'frontendEngineer',
      text: 'Frontend engineer',
    },
    {
      value: 'backendEngineer',
      text: 'Backend engineer',
    },
    {
      value: 'securityEngineer',
      text: 'Security engineer',
    },
    {
      value: 'testEngineer',
      text: 'Test engineer',
    },
  ],
  components: {
    GlForm,
    GlFormGroup,
    GlFormInput,
    GlFormTextarea,
    GlListbox,
    GlButton,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        bio: '',
        role: null,
        username: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        firstName: null,
        lastName: null,
        bio: null,
        role: null,
        username: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
  computed: {
    roleToggleText() {
      if (this.form.role !== null) {
        return null;
      }

      return 'Choose a role';
    },
    fieldStates() {
      return Object.keys(this.errors).reduce((accumulator, fieldName) => {
        return {
          ...accumulator,
          [fieldName]: this.errors[fieldName] === null ? null : false,
        };
      }, {});
    },
  },
  methods: {
    onSubmit(event) {
      if (this.form.firstName === '') {
        this.errors.firstName = 'First name is required.';
      } else {
        this.errors.firstName = null;
      }

      if (this.form.lastName === '') {
        this.errors.lastName = 'Last name is required.';
      } else {
        this.errors.lastName = null;
      }

      if (this.form.bio === '') {
        this.errors.bio = 'Bio is required.';
      } else {
        this.errors.bio = null;
      }

      if (this.form.role === null) {
        this.errors.role = 'Role is required.';
      } else {
        this.errors.role = null;
      }

      if (this.form.username === '') {
        this.errors.username = 'Username is required.';
      } else {
        this.errors.username = null;
      }

      if (this.form.password === '') {
        this.errors.password = 'Password is required.';
      } else {
        this.errors.password = null;
      }

      if (this.form.confirmPassword === '') {
        this.errors.confirmPassword = 'Confirm password is required.';
      } else {
        this.errors.confirmPassword = null;
      }

      const formHasErrors = Object.keys(this.errors).some(
        (fieldName) => this.errors[fieldName] !== null
      );

      if (formHasErrors) {
        console.log('validation error');
        event.preventDefault();
      } else {
        this.$toast.show('Form submitted successfully.');
        this.form.firstName = '';
        this.form.lastName = '';
        this.form.bio = '';
        this.form.role = '';
        this.form.username = '';
        this.form.password = '';
        this.form.confirmPassword = '';
        event.preventDefault();
      }
    },
  },
  template: `
    <gl-form @submit="onSubmit">
      <gl-form-group label="First name" label-for="firstName" :invalid-feedback="errors.firstName" :state="fieldStates.firstName">
        <gl-form-input v-model="form.firstName" id="firstName" :state="fieldStates.firstName" />
      </gl-form-group>
      <gl-form-group label="Last name" label-for="lastName" :invalid-feedback="errors.lastName" :state="fieldStates.lastName">
        <gl-form-input v-model="form.lastName" id="lastName" :state="fieldStates.lastName" />
      </gl-form-group>
      <gl-form-group label="Bio" label-for="bio" :invalid-feedback="errors.bio" :state="fieldStates.bio">
        <gl-form-textarea v-model="form.bio" id="bio" :state="fieldStates.bio" />
      </gl-form-group>
      <gl-form-group label="Role" id="role" :invalid-feedback="errors.role" :state="fieldStates.role">
        <gl-listbox v-model="form.role" :items="$options.roles" :toggle-text="roleToggleText" toggle-aria-labelled-by="role__BV_label_" />
      </gl-form-group>
      <gl-form-group label="Username" label-for="username" :invalid-feedback="errors.username" :state="fieldStates.username">
        <gl-form-input v-model="form.username" id="username" :state="fieldStates.username" />
      </gl-form-group>
      <gl-form-group label="Password" label-for="password" :invalid-feedback="errors.password" :state="fieldStates.password">
        <gl-form-input v-model="form.password" id="password" type="password" :state="fieldStates.password"  />
      </gl-form-group>
      <gl-form-group label="Confirm password" label-for="confirmPassword" :invalid-feedback="errors.confirmPassword" :state="fieldStates.confirmPassword">
        <gl-form-input v-model="form.confirmPassword" id="confirmPassword" type="password" :state="fieldStates.confirmPassword" />
      </gl-form-group>
      <gl-button type="submit">Submit</gl-button>
    </gl-form>
  `,
});

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'hooks/useForm',
  parameters: {
    storyshots: { disable: true },
    docs: {
      description: {
        component: readme,
      },
    },
  },
};
