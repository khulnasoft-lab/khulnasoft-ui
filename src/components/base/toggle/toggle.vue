<script>
import { uniqueId } from 'lodash';

import { toggleLabelPosition } from '../../../utils/constants';
import GlIcon from '../icon/icon.vue';
import GlLoadingIcon from '../loading_icon/loading_icon.vue';

let uuid = 0;

export default {
  components: {
    GlIcon,
    GlLoadingIcon,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    name: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The toggle's state.
     * @model
     */
    value: {
      type: Boolean,
      required: false,
      default: null,
    },
    /**
     * Whether the toggle should be disabled.
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Whether the toggle is in the loading state.
     */
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * The toggle's label.
     */
    label: {
      type: String,
      required: true,
    },
    /**
     * A help text to be shown below the toggle.
     */
    help: {
      type: String,
      required: false,
      default: undefined,
    },
    /**
     * The label's position relative to the toggle. If 'hidden', the toggle will add the .gl-sr-only class so the label is still accessible to screen readers.
     */
    labelPosition: {
      type: String,
      required: false,
      default: 'top',
      validator(position) {
        return Object.values(toggleLabelPosition).includes(position);
      },
    },
    /**
     * Whether the enabledText and disabeldText should be disabled.
     */
    displayValue: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * A text to be shown when value is true.
     */
    enabledText: {
      type: String,
      required: false,
      default: 'Enabled',
    },
    /**
     * A text to be shown when value is false.
     */
    disabledText: {
      type: String,
      required: false,
      default: 'Disabled',
    },
  },
  data() {
    return {
      labelId: uniqueId('toggle-label-'),
    };
  },
  computed: {
    icon() {
      return this.value ? 'mobile-issue-close' : 'close';
    },
    helpId() {
      return this.help ? `toggle-help-${this.uuid}` : undefined;
    },
    isChecked() {
      return this.value ? 'true' : 'false';
    },
    valueText() {
      return this.value ? this.enabledText : this.disabledText;
    },
  },

  beforeCreate() {
    this.uuid = uuid;
    uuid += 1;
  },

  methods: {
    toggleFeature() {
      if (!this.disabled) {
        /**
         * Emitted when the state changes.
         *
         * @event change
         * @property {boolean} value Whether the toggle is enabled.
         */
        this.$emit('change', !this.value);
      }
    },
  },
};
</script>

<template>
  <div
    class="gl-toggle-wrapper gl-display-flex gl-flex-direction-column gl-mb-0 gl-w-max-content"
    :class="{ 'gl-toggle-label-inline': labelPosition === 'left', 'is-disabled': disabled }"
  >
    <span
      :id="labelId"
      :class="{ 'gl-sr-only': labelPosition === 'hidden' }"
      class="gl-toggle-label"
      data-testid="toggle-label"
    >
      <!-- @slot The toggle's label. -->
      <slot name="label">{{ label }}</slot>
    </span>
    <input v-if="name" :name="name" :value="value" type="hidden" />
    <div class="gl-display-flex gl-align-items-center">
      <button
        role="switch"
        :aria-checked="isChecked"
        :aria-labelledby="labelId"
        :aria-describedby="helpId"
        class="gl-toggle"
        :class="{
          'is-checked': value,
          'is-disabled': disabled,
          'gl-mr-3': displayValue,
        }"
        type="button"
        @click.prevent="toggleFeature"
      >
        <gl-loading-icon v-if="isLoading" color="light" class="toggle-loading" />
        <span v-else class="toggle-icon" :class="{ disabled: disabled }">
          <gl-icon :name="icon" :size="16" />
        </span>
      </button>
      <span v-if="displayValue" data-testid="toggle-value-text">{{ valueText }}</span>
    </div>
    <span v-if="help" :id="helpId" class="gl-help-label" data-testid="toggle-help">
      <!-- @slot A help text to be shown below the toggle. -->
      <slot name="help">{{ help }}</slot>
    </span>
  </div>
</template>
