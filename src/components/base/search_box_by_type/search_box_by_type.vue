<script>
import GlClearIconButton from '../../shared_components/clear_icon_button/clear_icon_button.vue';
import GlFormInput from '../form/form_input/form_input.vue';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  components: {
    GlClearIconButton,
    GlIcon,
    GlFormInput,
    GlLoadingIcon,
  },
  inheritAttrs: false,
  model,
  props: {
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
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
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
        type: 'text',
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
      <gl-loading-icon v-if="isLoading" size="sm" class="gl-search-box-by-type-loading-icon" />
      <gl-clear-icon-button
        v-if="showClearButton"
        :title="clearButtonTitle"
        :tooltip-container="tooltipContainer"
        class="gl-search-box-by-type-clear gl-clear-icon-button"
        @click.stop="clearInput"
      />
    </div>
  </div>
</template>
