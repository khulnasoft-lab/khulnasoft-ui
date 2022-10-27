<script>
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

export default {
  components: {
    GlClearIconButton,
    GlIcon,
    GlFormInput,
    GlLoadingIcon,
  },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input',
  },
  props: {
    /**
     * If provided, used as value of search input
     */
    value: {
      type: String,
      required: false,
      default: '',
    },
    clearButtonTitle: {
      type: String,
      required: false,
      default: 'Clear',
    },
    /**
     * If provided and true, disables the input and controls
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Puts search box into loading state, rendering spinner
     */
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Container for tooltip. Valid values: DOM node, selector string or `false` for default
     */
    tooltipContainer: {
      required: false,
      default: false,
      validator: (value) =>
        value === false || typeof value === 'string' || value instanceof HTMLElement,
    },
  },
  computed: {
    inputAttributes() {
      const attributes = {
        type: 'search',
        placeholder: 'Search',
        ...this.$attrs,
      };

      if (!attributes['aria-label']) {
        attributes['aria-label'] = attributes.placeholder;
      }

      return attributes;
    },
    hasValue() {
      return Boolean(this.value.length);
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: (value) => {
          this.$emit('input', value);
        },
      };
    },
    showClearButton() {
      return this.hasValue && !this.disabled;
    },
  },
  methods: {
    clearInput() {
      this.$emit('input', '');
      this.focusInput();
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
    onClearButtonFocus() {
      this.$emit('clearButtonFocus');
    },
    onClearButtonBlur() {
      this.$emit('clearButtonBlur');
    },
    onClearButtonRelease() {
      this.$emit('clearButtonRelease');
    },
  },
};
</script>

<template>
  <div class="gl-search-box-by-type">
    <gl-icon name="search" class="gl-search-box-by-type-search-icon" />
    <gl-form-input
      ref="input"
      :value="value"
      :disabled="disabled"
      class="gl-search-box-by-type-input"
      v-bind="inputAttributes"
      v-on="inputListeners"
    />
    <div class="gl-search-box-by-type-right-icons">
      <gl-loading-icon v-if="isLoading" class="gl-search-box-by-type-loading-icon" />
      <gl-clear-icon-button
        v-if="showClearButton"
        :title="clearButtonTitle"
        :tooltip-container="tooltipContainer"
        class="gl-search-box-by-type-clear gl-clear-icon-button"
        @click.stop="clearInput"
        @focus="onClearButtonFocus"
        @blur="onClearButtonBlur"
        @release="onClearButtonRelease"
      />
    </div>
  </div>
</template>
