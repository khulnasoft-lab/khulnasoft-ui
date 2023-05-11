<script>
import uniqueId from 'lodash/uniqueId';

export default {
  name: 'GlListboxGroup',
  props: {
    name: {
      type: String,
      required: true,
    },
    textSrOnly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  created() {
    this.nameId = uniqueId('gl-listbox-group-');
  },
};
</script>

<template>
  <ul role="group" :aria-labelledby="nameId" class="gl-mb-0 gl-pl-0">
    <li
      :id="nameId"
      role="presentation"
      class="gl-pl-4 gl-pt-3 gl-pb-2 gl-font-sm gl-font-weight-bold"
      :class="{ 'gl-sr-only': textSrOnly }"
    >
      <slot name="group-label">{{ name }}</slot>
    </li>
    <slot></slot>
  </ul>
</template>
