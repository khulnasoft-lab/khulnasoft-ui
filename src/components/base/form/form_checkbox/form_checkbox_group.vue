<script>
import { BFormCheckboxGroup } from 'bootstrap-vue';
import { formOptionsMixin } from 'bootstrap-vue/src/mixins/form-options';
import { SafeHtmlDirective as SafeHtml } from '../../../../directives/safe_html/safe_html';
import GlFormCheckbox from './form_checkbox.vue';

export default {
  name: 'GlFormCheckboxGroup',
  components: { BFormCheckboxGroup, GlFormCheckbox },
  directives: {
    SafeHtml,
  },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input',
  },
};
</script>

<template>
  <div>
    <b-form-checkbox-group
      v-bind="$attrs"
      class="gl-form-checkbox-group"
      stacked
      @change="$emit('change', $event)"
      @input="$emit('input', $event)"
    >
      <slot name="first"></slot>
      <gl-form-checkbox
        v-for="(option, idx) in formOptions"
        :key="idx"
        :value="option.value"
        :disabled="option.disabled"
      >
        <span v-if="option.html" v-safe-html="option.html"></span>
        <span v-else>{{ option.text }}</span>
      </gl-form-checkbox>
      <slot></slot>
    </b-form-checkbox-group>
  </div>
</template>
