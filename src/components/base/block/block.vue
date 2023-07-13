<!-- eslint-disable vue/multi-word-component-names -->
<script>
import GlButton from '../button/button.vue';
import GlIcon from '../icon/icon.vue';
import { blockVariants } from '../../../utils/constants';

export default {
  name: 'GlBlock',
  components: {
    GlButton,
    GlIcon,
  },
  props: {
    /**
     * Block variant.
     */
    variant: {
      type: String,
      required: false,
      default: 'default',
      validator: (variant) => {
        return Object.values(blockVariants).includes(variant);
      },
    },
    /**
     * Block title.
     */
    title: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Header count.
     */
    count: {
      type: [String, Number],
      required: false,
      default: '',
    },
    /**
     * Header count icon.
     */
    icon: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Header description.
     */
    description: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Action label.
     */
    actionLabel: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * Additional CSS class(es) to be applied to the header.
     */
    headerClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    /**
     * Additional CSS class(es) to be applied to the body.
     */
    bodyClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    /**
     * Additional CSS class(es) to be applied to the form.
     */
    formClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
    /**
     * Additional CSS class(es) to be applied to the footer.
     */
    footerClass: {
      type: [String, Object, Array],
      required: false,
      default: '',
    },
  },
  data() {
    return {
      addFormVisible: false,
    };
  },
  computed: {
    variantClass() {
      // Remove check for legacy once migration is done.
      return this.variant && this.variant !== 'default' ? `gl-block--${this.variant}` : null;
    },
  },
  methods: {
    handleAction() {
      this.addFormVisible = !this.addFormVisible;
    },
    closeAction() {
      this.addFormVisible = false;
    },
  },
};
</script>

<template>
  <div class="gl-block" :class="variantClass">
    <div v-if="$scopedSlots.header || title" class="gl-block-header" :class="headerClass">
      <!-- @slot The block's header content. -->
      <slot name="header"></slot>
      <div v-if="!$scopedSlots.header && title" class="gl-block-title-wrapper">
        <h3 class="gl-block-title">{{ title }}</h3>
        <span v-if="icon || count" class="gl-block-count">
          <gl-icon v-if="icon" :name="icon" class="gl-mr-2" />
          <template v-if="count">{{ count }}</template>
        </span>
        <p v-if="description" class="gl-block-description">{{ description }}</p>
      </div>
      <div v-if="$scopedSlots.actions || actionLabel" class="gl-block-actions">
        <!-- @slot The block's actions. -->
        <slot name="actions"></slot>
        <gl-button v-if="actionLabel && !addFormVisible" size="small" @click="handleAction">{{
          actionLabel
        }}</gl-button>
      </div>
    </div>
    <div v-if="$scopedSlots.form && addFormVisible" class="gl-block-add-form" :class="formClass">
      <!-- @slot The block's form. -->
      <slot name="form" :close="closeAction"></slot>
    </div>
    <div class="gl-block-body" :class="bodyClass">
      <!-- @slot The block's main content. -->
      <slot></slot>
      <div v-if="$scopedSlots.empty" class="gl-block-empty">
        <!-- @slot The block's empty content. -->
        <slot name="empty"></slot>
      </div>
    </div>
    <div v-if="$scopedSlots.footer" class="gl-block-footer" :class="footerClass">
      <!-- @slot The block's footer content. -->
      <slot name="footer"></slot>
    </div>
  </div>
</template>
