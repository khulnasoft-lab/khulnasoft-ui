<script>
import { BFormRadioGroup } from 'bootstrap-vue';
import { formOptionsMixin } from 'bootstrap-vue/src/mixins/form-options';
import { SafeHtmlDirective as SafeHtml } from '../../../../directives/safe_html/safe_html';
import GlFormRadio from '../form_radio/form_radio.vue';

const { model } = BFormRadioGroup.options;

export default {
  components: {
    BFormRadioGroup,
    GlFormRadio,
  },
  directives: {
    SafeHtml,
  },
  mixins: [formOptionsMixin],
  inheritAttrs: false,
  model,
};
</script>
<template>
  <b-form-radio-group
    class="gl-form-checkbox-group"
    stacked
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <slot name="first"></slot>
    <gl-form-radio
      v-for="(option, idx) in formOptions"
      :key="idx"
      :value="option.value"
      :disabled="option.disabled"
    >
      <span v-if="option.html" v-safe-html="option.html"></span>
      <span v-else>{{ option.text }}</span>
    </gl-form-radio>
    <slot></slot>
  </b-form-radio-group>
</template>
