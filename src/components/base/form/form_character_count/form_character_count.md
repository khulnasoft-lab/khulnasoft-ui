## Usage

`GlFormCharacterCount` can be used to add a character count to an input.
If you are using `GlFormTextarea` on its own see [with character count example](https://gitlab-org.gitlab.io/gitlab-ui/?path=/story/base-form-form-textarea--with-character-count).
If you are wrapping your input, such as in a markdown component, and need the character
count separate from the input, use `GlFormCharacterCount`.

## Example

```html
<script>
  import { GlFormCharacterCount, GlFormInput, GlFormGroup } from '@gitlab/ui'

  export default {
    inputId: 'form-input-with-character-count',
    countTextId: 'character-count-text',
    limit: 100,
    components: { GlFormCharacterCount, GlFormInput, GlFormGroup },
    data() {
      return {
        value: '',
      }
    },
    methods: {
      remainingCountText(count) {
        return  n__('%d character remaining', '%d characters remaining', count)
      },
      overLimitText(count) {
        return n__('%d character over limit', '%d characters over limit', count);
      },
    },
  }
<script>

<template>
  <gl-form-group label="Form input with character count" :label-for="$options.inputId">
    <gl-form-input
      v-model="value"
      :id="$options.inputId"
      :value="value"
      :aria-describedby="$options.countTextId"
    />
    <gl-form-character-count
      :value="value"
      :limit="$options.limit"
      :count-text-id="$options.countTextId"
    >
      <template #remaining-count-text="{ count }">{{ remainingCountText(count) }}</template>
      <template #over-limit-text="{ count }">{{ overLimitText(count) }}</template>
    </gl-form-character-count>
  </gl-form-group>
<template>
```
