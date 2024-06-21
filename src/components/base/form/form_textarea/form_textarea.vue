<script>
import { BFormTextarea } from 'bootstrap-vue';
import uniqueId from 'lodash/uniqueId';
import GlFormCharacterCount from '../form_character_count/form_character_count.vue';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  name: 'GlFormTextarea',
  components: {
    BFormTextarea,
    GlFormCharacterCount,
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
    characterCountLimit: {
      type: Number,
      required: false,
      default: null,
    },
    rows: {
      type: [Number, String],
      required: false,
      default: 4,
    },
  },
  data() {
    return {
      characterCountTextId: uniqueId('form-textarea-character-count-'),
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
    showCharacterCount() {
      return this.characterCountLimit !== null;
    },
    bFormTextareaProps() {
      return {
        ...this.$attrs,
        class: 'gl-form-input gl-form-textarea',
        noResize: this.noResize,
        value: this.value,
        rows: this.rows,
      };
    },
  },
  methods: {
    handleKeyPress(e) {
      if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
        this.$emit('submit');
      }
    },
  },
};
</script>

<template>
  <div v-if="showCharacterCount">
    <b-form-textarea
      :aria-describedby="characterCountTextId"
      v-bind="bFormTextareaProps"
      v-on="listeners"
      @[keypressEvent].native="handleKeyPress"
    />
    <gl-form-character-count
      :value="value"
      :limit="characterCountLimit"
      :count-text-id="characterCountTextId"
    >
      <template #over-limit-text="{ count }">
        <!--
        @slot Internationalized over character count text. Example: `<template #character-count-over-limit-text="{ count }">{{ n__('%d character over limit', '%d characters over limit', count) }}</template>`
        @binding {number} count
        -->
        <slot name="character-count-over-limit-text" :count="count"></slot>
      </template>

      <template #remaining-count-text="{ count }">
        <!--
        @slot Internationalized character count text. Example: `<template #remaining-character-count-text="{ count }">{{ n__('%d character remaining', '%d characters remaining', count) }}</template>`
        @binding {number} count
        -->

        <slot name="remaining-character-count-text" :count="count"></slot
      ></template>
    </gl-form-character-count>
  </div>
  <b-form-textarea
    v-else
    v-bind="bFormTextareaProps"
    v-on="listeners"
    @[keypressEvent].native="handleKeyPress"
  />
</template>
