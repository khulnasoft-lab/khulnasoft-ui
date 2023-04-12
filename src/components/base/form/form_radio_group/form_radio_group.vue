<script>
import { BFormRadioGroup } from 'bootstrap-vue';
import { formOptionsMixin } from 'bootstrap-vue/src/mixins/form-options';
import { SafeHtmlDirective as SafeHtml } from '../../../../directives/safe_html/safe_html';
import GlFormRadio from '../form_radio/form_radio.vue';

const { model } = BFormRadioGroup.options;

export default {
  name: 'GlFormRadioGroup',
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
  methods: {
    onInput(e) {
      /**
       * Emitted when the selected value is changed.
       *
       * @event input
       */
      this.$emit('input', e);
    },
    onChange(e) {
      /**
       * Emitted when the selected value is changed.
       *
       * @event change
       */
      this.$emit('change', e);
    },
  },
};
</script>
<template>
  <b-form-radio-group
    class="gl-form-checkbox-group"
    stacked
    v-bind="$attrs"
    v-on="$listeners"
    @input="onInput"
    @change="onChange"
  >
    <!-- @slot Slot for GlFormRadios that will appear before radios generated from options prop -->
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
    <!-- @slot Slot for GlFormRadios that will appear after radios generated from options prop -->
    <slot></slot>
  </b-form-radio-group>
</template>
