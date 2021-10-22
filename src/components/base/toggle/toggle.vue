<script>
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
     * The id for the label. This id is used by the aria-labelledby attribute on the toggle button.
     */
    labelId: {
      type: String,
      required: true,
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
    <button
      role="switch"
      :aria-checked="isChecked"
      :aria-labelledby="labelId"
      :aria-describedby="helpId"
      :class="{
        'gl-toggle': true,
        'is-checked': value,
        'is-disabled': disabled,
      }"
      type="button"
      @click.prevent="toggleFeature"
    >
      <gl-loading-icon v-if="isLoading" color="light" class="toggle-loading" />
      <span v-else :class="{ 'toggle-icon': true, disabled: disabled }">
        <gl-icon :name="icon" :size="16" />
      </span>
    </button>
    <span v-if="help" :id="helpId" class="gl-help-label" data-testid="toggle-help">
      <!-- @slot A help text to be shown below the toggle. -->
      <slot name="help">{{ help }}</slot>
    </span>
  </div>
</template>
