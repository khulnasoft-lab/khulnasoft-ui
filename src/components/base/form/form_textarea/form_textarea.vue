<script>
import { BFormTextarea } from 'bootstrap-vue';
import GlSprintf from '../../../utilities/sprintf/sprintf.vue';
import { textareaCountOptions } from '../../../../utils/constants';

const model = {
  prop: 'value',
  event: 'input',
};

export default {
  components: {
    BFormTextarea,
    GlSprintf,
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
    count: {
      type: Number,
      required: false,
      default: 0,
    },
    countType: {
      required: false,
      type: String,
      default: textareaCountOptions.max,
      validator: (value) => Object.keys(textareaCountOptions).includes(value),
    },
    characterCountText: {
      required: false,
      type: String,
      default: '',
    },
    characterCountOverLimitText: {
      required: false,
      type: String,
      default: '',
    },
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
    characters() {
      return this.value.length;
    },
    remainingCharacters() {
      if (this.count) {
        return Math.abs(this.count - this.characters);
      }

      return null;
    },
    characterCountClasses() {
      switch (this.countType) {
        case textareaCountOptions.max:
          return {
            'gl-text-red-500': this.value.length > this.count,
            'gl-text-gray-500': this.value.length <= this.count,
          };
        case textareaCountOptions.recommended:
          return 'gl-text-gray-500';
        default:
          return {};
      }
    },
    hasCount() {
      return this.remainingCharacters != null;
    },
    characterCountMessage() {
      return this.characters > this.count
        ? this.characterCountOverLimitText
        : this.characterCountText;
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
  <div>
    <b-form-textarea
      ref="textarea"
      class="gl-form-input gl-form-textarea"
      :no-resize="noResize"
      v-bind="$attrs"
      :value="value"
      v-on="listeners"
      @[keypressEvent].native="handleKeyPress"
    />
    <div v-if="hasCount">
      <small :class="characterCountClasses" aria-live="polite">
        <gl-sprintf :message="characterCountMessage">
          <template #count>{{ remainingCharacters }}</template>
        </gl-sprintf>
      </small>
    </div>
  </div>
</template>
