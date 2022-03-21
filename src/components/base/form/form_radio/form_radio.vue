<script>
import { BFormRadio } from 'bootstrap-vue';

const { model } = BFormRadio.options;

export default {
  name: 'GlFormRadio',
  components: { BFormRadio },
  inheritAttrs: false,
  model: {
    prop: model.prop,
    event: model.event,
  },
  props: {
    /**
     * Whether the radio is checked
     */
    checked: {
      type: [String, Number, Boolean, Object],
      required: false,
      default: false,
    },
  },
};
</script>

<template>
  <!--
  Emitted when the selected value is changed
  @event input
  @type {boolean} current selected value of radio group

  Emitted when the selected value is changed due to user interaction
  @event change
  @type {boolean} current selected value of radio group
  -->
  <b-form-radio
    class="gl-form-radio"
    :checked="checked"
    v-bind="$attrs"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  >
    <!-- @slot Content to use for the label -->
    <slot></slot>
    <p v-if="$scopedSlots.help" class="help-text">
      <!-- @slot Content provided here will be shown beneath the radio. Typically used for help or descriptive text. -->
      <slot name="help"></slot>
    </p>
  </b-form-radio>
</template>
