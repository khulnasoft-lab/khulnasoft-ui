`useForm` is a hook that can be used to manage form state and validation errors.

## Getting started

1. Import `useForm` from `@gitlab/ui/hooks/use_form` and setup at the top of your `<script>` block. Bind form state to your component by placing `formStateComputedProperty` in the `computed` block.

```html
<script>
  import { useForm } from '@gitlab/ui/hooks/use_form';

  const { formStateComputedProperty } = useForm();

  export default {
    computed: {
      formState: formStateComputedProperty
    }
  }
</script>
```

2. Register your form fields at the top of your `<script>` block and bind `v-model` to inputs.

```html
<script>
  import { useForm } from '@gitlab/ui/hooks/use_form';

  const { formStateComputedProperty, registerFormField } = useForm();

  registerFormField('firstName');
  registerFormField('lastName');
  registerFormField('username');

  export default {
    computed: {
      formState: formStateComputedProperty,
    }
  }
</script>

<template>
  <gl-form>
    <gl-form-group label="First name">
      <gl-form-input v-model="formState.fields.firstName.value"  />
    </gl-form-group>
    <gl-form-group label="Last name">
      <gl-form-input v-model="formState.fields.lastName.value"  />
    </gl-form-group>
    <gl-form-group label="Username">
      <gl-form-input v-model="formState.fields.username.value" />
    </gl-form-group>
    <gl-button type="submit">Submit</gl-button>
  </gl-form>
</template>
```

3. Bind validation props to your form fields. These props are taken care of for you behind the scenes and are responsible for rendering validation errors.

```html
<script>
  import { useForm } from '@gitlab/ui/hooks/use_form';

  const { formStateComputedProperty, registerFormField } = useForm();

  const [firstNameBindings] = registerFormField('firstName');
  const [lastNameBindings] = registerFormField('lastName');
  const [usernameBindings] = registerFormField('username');

  export default {
    computed: {
      formState: formStateComputedProperty,
      firstNameBindings,
      lastNameBindings,
      usernameBindings,
    }
  }
</script>

<template>
  <gl-form>
    <gl-form-group v-bind="firstNameBindings.group" label="First name">
      <gl-form-input v-model="formState.fields.firstName.value" v-bind="firstNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="lastNameBindings.group" label="Last name">
      <gl-form-input v-model="formState.fields.lastName.value" v-bind="lastNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="usernameBindings.group" label="Username">
      <gl-form-input v-model="formState.fields.username.value" v-bind="usernameBindings.input" />
    </gl-form-group>
    <gl-button type="submit">Submit</gl-button>
  </gl-form>
</template>
```

4. Add validation rules to your fields.

```html
<script>
  import { useForm } from '@gitlab/ui/hooks/use_form';
  import { required, min } from '@gitlab/ui/hooks/use_form/validators';

  const { formStateComputedProperty, registerFormField } = useForm();

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
  const [usernameBindings] = registerFormField('username', {
    rules: [
      {
        validator: required,
        message: 'Username is required.',
      },
      {
        validator: min,
        options: {
          min: 8,
        },
        message: 'Username must be at least 8 characters.',
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

  export default {
    computed: {
      formState: formStateComputedProperty,
      firstNameBindings,
      lastNameBindings,
      usernameBindings,
    }
  }
</script>

<template>
  <gl-form>
    <gl-form-group v-bind="firstNameBindings.group" label="First name">
      <gl-form-input v-model="formState.fields.firstName.value" v-bind="firstNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="lastNameBindings.group" label="Last name">
      <gl-form-input v-model="formState.fields.lastName.value" v-bind="lastNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="usernameBindings.group" label="Username">
      <gl-form-input v-model="formState.fields.username.value" v-bind="usernameBindings.input" />
    </gl-form-group>
    <gl-button type="submit">Submit</gl-button>
  </gl-form>
</template>
```

5. Wire up the form event handler

```html
<script>
  import { useForm } from '@gitlab/ui/hooks/use_form';
  import { required, min } from '@gitlab/ui/hooks/use_form/validators';

  const { formStateComputedProperty, registerFormField, handleSubmit } = useForm();

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

  export default {
    computed: {
      formState: formStateComputedProperty,
      firstNameBindings,
      lastNameBindings,
      usernameBindings,
    },
    methods: {
      onSubmit: handleSubmit({
        onSuccess(event, formValues) {
          console.log(formValues);
          event.preventDefault();
        },
        onError() {
          console.log('validation error');
        },
      }),
    },
  }
</script>

<template>
  <gl-form @submit="onSubmit">
    <gl-form-group v-bind="firstNameBindings.group" label="First name">
      <gl-form-input v-model="formState.fields.firstName.value" v-bind="firstNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="lastNameBindings.group" label="Last name">
      <gl-form-input v-model="formState.fields.lastName.value" v-bind="lastNameBindings.input" />
    </gl-form-group>
    <gl-form-group v-bind="usernameBindings.group" label="Username">
      <gl-form-input v-model="formState.fields.username.value" v-bind="usernameBindings.input" />
    </gl-form-group>
    <gl-button type="submit">Submit</gl-button>
  </gl-form>
</template>
```

## API

`useForm` returns the following variables that can ge used.


| Rule | Description | Type |
|---|---|---|
| `formState` | The form state including fields and error messages. | <code> {   fields: {     [key: string]: {       errors: string[];       initialValue: any;       value: any;       rules: {         validator: (value: any, options: object) => boolean;         message: string       }[];     }   } } </code> |
| `formStateComputedProperty` | Used to bind the form state to the component in the `computed` block. | <code> () => formState </code> |
| `registerFormField` | Used to register a form field. | <code> (   name: string,   options?: {     value?: any;     rules?: {       validator: (value: any, options: object) => boolean;       message: string;     }[];     shouldBindInputAttributes?: boolean   } ) => [   {     group: {       state: null \| false;       invalidFeedback: string;       labelFor?: string;     };     input: {       state: null \| false;       name?: string;       id?: string;     }   } ] </code> |
| `clearFormFields` | Clears all form fields. | <code> () => void; </code> |
| `clearFormField` | Clear a specific form field. | <code> (name: string) => void; </code> |


## Available validation rules

| Rule       | Description                                     | Options                                             |
|------------|-------------------------------------------------|-----------------------------------------------------|
| `required` | Checks if a field is an empty string or `null`. | `{}`                                                |
| `min`      | Checks if a string meets a minimum length.      | `{ min: number; }`                        |
| `max`      | Checks if a string meets a maximum length.      | `{ max: number; } `                        |
| `matches`  | Checks if two values match.                     | `{ otherValue: () => string | string; } ` |