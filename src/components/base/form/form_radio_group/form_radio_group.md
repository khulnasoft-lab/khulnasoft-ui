The `GlFormRadioGroup` component provides an alternative and sometimes more
compact way of setting up a group of `GlFormRadio` components.

## Usage

`GlFormRadioGroup` can be used in a few ways to build a group of `GlFormRadio`
components: implicitly, explicitly, or a mix of both.

Below is an example which demonstrates all three approaches, written such that
all of them produce the same visual result.

```html
<script>
export default {
  data() {
    return {
      selected: 'one',
      options: [
        {
          value: 'one',
          text: 'One',
        },
        {
          value: 'two',
          text: 'Two',
        },
        {
          value: 'three',
          text: 'Three',
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <!-- Implicit -->
    <gl-form-radio-group v-model="selected" :options="options" name="implicit" />

    <!-- Explicit -->
    <gl-form-radio-group v-model="selected" name="explicit">
      <gl-form-radio value="one">One</gl-form-radio>
      <gl-form-radio value="two">Two</gl-form-radio>
      <gl-form-radio value="three">Three</gl-form-radio>
    </gl-form-radio-group>

    <!-- Mixed -->
    <gl-form-radio-group v-model="selected" :options="[options[1]]" name="mixed">
      <template #first>
        <gl-form-radio value="one">One</gl-form-radio>
      </template>
      <gl-form-radio value="three">Three</gl-form-radio>
    </gl-form-radio-group>
  </div>
</template>
```

## Stacked

By default, the GitLab Design guide mandates the `<gl-form-radio-group>` be `stacked` by default and
is non-changeable at this time.
