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
    value: {
      type: Boolean,
      required: false,
      default: null,
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
    label: {
      type: String,
      required: true,
    },
    help: {
      type: String,
      required: false,
      default: undefined,
    },
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
    shouldShowLabel() {
      return this.label && this.labelPosition !== 'hidden';
    },
    helpId() {
      return this.help ? `toggle-help-${this.uuid}` : undefined;
    },
  },

  beforeCreate() {
    this.uuid = uuid;
    uuid += 1;
  },

  methods: {
    toggleFeature() {
      if (!this.disabled) this.$emit('change', !this.value);
    },
  },
};
</script>

<template>
  <label class="gl-display-flex gl-flex-direction-column gl-mb-0 gl-w-max-content">
    <span
      class="gl-toggle-wrapper"
      :class="{ 'gl-toggle-label-inline': labelPosition === 'left', 'is-disabled': disabled }"
    >
      <span v-if="shouldShowLabel" class="gl-toggle-label" data-testid="toggle-label">
        <slot name="label">{{ label }}</slot>
      </span>
      <input v-if="name" :name="name" :value="value" type="hidden" />
      <button
        role="switch"
        :aria-checked="value"
        :aria-label="label"
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
    </span>
    <span v-if="help" :id="helpId" class="gl-help-label" data-testid="toggle-help">
      <slot name="help">{{ help }}</slot>
    </span>
  </label>
</template>
