<script>
import { BFormRadioGroup } from 'bootstrap-vue';

const genericErrorMessage = 'Segmented button should always have valid option selected';

export default {
  name: 'GlSegmentedControl',
  components: {
    BFormRadioGroup,
  },
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input',
  },
  props: {
    checked: {
      required: true,
      validator: () => true,
    },
    options: {
      type: Array,
      required: true,
    },
  },
  computed: {
    enabledOptions() {
      return this.options.filter((option) => !option.disabled);
    },
  },
  watch: {
    checked: {
      handler(newValue, oldValue) {
        this.checkValue(newValue, oldValue);
      },
    },
    options: {
      handler() {
        this.checkValue(this.checked);
      },
    },
  },
  created() {
    this.checkValue(this.checked);
  },
  methods: {
    checkValue(newValue, oldValue = null) {
      if (!this.isValidValue(newValue)) {
        // eslint-disable-next-line no-console
        console.warn(genericErrorMessage);
        if (this.enabledOptions.length) {
          const suggestion =
            oldValue && this.isValidValue(oldValue) ? oldValue : this.enabledOptions[0].value;
          /**
           * Emitted when the selection changes
           * @event input
           * @argument checked The selected option
           */
          this.$emit('input', suggestion);
        }
      }
    },
    isValidValue(val) {
      return this.enabledOptions.some(({ value }) => value === val);
    },
  },
};
</script>
<template>
  <b-form-radio-group
    buttons
    button-variant="gl-segmented-button gl-button"
    class="gl-segmented-control"
    v-bind="{ ...$attrs, options, checked }"
    v-on="$listeners"
  />
</template>
