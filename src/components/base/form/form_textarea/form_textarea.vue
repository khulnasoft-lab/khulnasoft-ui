<script>
import { BFormTextarea } from 'bootstrap-vue';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  name: 'GlFormTextarea',
  components: {
    BFormTextarea,
  },
  inheritAttrs: false,
  model,
  props: {
    // This prop is needed to map the v-model correctly
    // https://alligator.io/vuejs/add-v-model-support/
    value: {
      type: String,
      required: false,
      default: '',
    },
    noResize: {
      type: Boolean,
      required: false,
      default: true,
    },
    submitOnEnter: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Max character count for the textarea.
     */
    characterCount: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      characterCountId: uniqueId('form-textarea-character-count-'),
      remainingCharacterCount: this.initialRemainingCharacterCount(),
      remainingCharacterCountSrOnly: this.initialRemainingCharacterCount(),
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        // Swap purpose of input and update events from underlying BFormTextarea.
        // See https://gitlab.com/gitlab-org/gitlab-ui/-/issues/631.
        input: (...args) => {
          /**
           * Emitted to update the v-model
           */
          this.$emit('update', ...args);
        },
        update: (...args) => {
          /**
           * Triggered by user interaction.
           * Emitted after any formatting (not including 'trim' or 'number' props).
           * Useful for getting the currently entered value when the 'debounce' or 'lazy' props are set.
           */
          this.$emit(model.event, ...args);
        },
      };
    },
    keypressEvent() {
      return this.submitOnEnter ? 'keyup' : null;
    },
    isCharacterCountOverLimit() {
      return this.remainingCharacterCount < 0;
    },
    characterCountTextClass() {
      return this.isCharacterCountOverLimit ? 'gl-text-red-500' : 'gl-text-gray-500';
    },
    showCharacterCount() {
      return this.characterCount !== null;
    },
    bFormTextareaProps() {
      return {
        ...this.$attrs,
        class: 'gl-form-input gl-form-textarea',
        noResize: this.noResize,
        value: this.value,
      };
    },
  },
  watch: {
    value(newValue) {
      if (!this.showCharacterCount) {
        return;
      }

      this.remainingCharacterCount = this.characterCount - this.valueLength(newValue);
      this.debouncedUpdateRemainingCharacterCountSrOnly(newValue);
    },
  },
  created() {
    // Debounce updating the remaining character count for a second so
    // screen readers announce the remaining text after the text in the textarea.
    this.debouncedUpdateRemainingCharacterCountSrOnly = debounce(
      this.updateRemainingCharacterCountSrOnly,
      1000
    );
  },
  methods: {
    valueLength(value) {
      return value?.length || 0;
    },
    handleKeyPress(e) {
      if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
        this.$emit('submit');
      }
    },
    updateRemainingCharacterCountSrOnly(newValue) {
      this.remainingCharacterCountSrOnly = this.characterCount - this.valueLength(newValue);
    },
    initialRemainingCharacterCount() {
      return this.characterCount - this.valueLength(this.value);
    },
  },
};
</script>

<template>
  <div v-if="showCharacterCount">
    <b-form-textarea
      :aria-describedby="characterCountId"
      v-bind="bFormTextareaProps"
      v-on="listeners"
      @[keypressEvent].native="handleKeyPress"
    />
    <small :class="['form-text', characterCountTextClass]" aria-hidden="true">
      <!-- 
      @slot Internationalized over character count text. Example: `<template #character-count-over-limit-text="{ count }">{{ n__('%d character over limit', '%d characters over limit', count) }}</template>`
      @binding {number} count
      -->
      <slot
        v-if="isCharacterCountOverLimit"
        name="character-count-over-limit-text"
        :count="Math.abs(remainingCharacterCount)"
      ></slot>
      <!-- 
      @slot Internationalized character count text. Example: `<template #character-count-text="{ count }">{{ n__('%d character remaining', '%d characters remaining', count) }}</template>`
      @binding {number} count
      -->

      <slot v-else name="character-count-text" :count="remainingCharacterCount"></slot>
    </small>
    <div
      :id="characterCountId"
      class="gl-sr-only"
      aria-live="polite"
      data-testid="character-count-text-sr-only"
    >
      <slot
        v-if="isCharacterCountOverLimit"
        name="character-count-over-limit-text"
        :count="Math.abs(remainingCharacterCount)"
      ></slot>

      <slot v-else name="character-count-text" :count="remainingCharacterCountSrOnly"></slot>
    </div>
  </div>
  <b-form-textarea
    v-else
    v-bind="bFormTextareaProps"
    v-on="listeners"
    @[keypressEvent].native="handleKeyPress"
  />
</template>
