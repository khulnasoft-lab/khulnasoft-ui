<script>
import GlButton from '../../base/button/button.vue';

export default {
  components: {
    GlButton,
  },
  props: {
    /**
     * The title (heading) of the empty state.
     */
    title: {
      type: String,
      required: true,
    },
    /**
     * The illustration's URL.
     */
    svgPath: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The illustration's height used to prevent content reflow.
     */
    svgHeight: {
      type: Number,
      required: false,
      default: null,
    },
    /**
     * The desciption/body text of the empty state.
     */
    description: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The primary GlButton's href.
     */
    primaryButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The primary GlButton's text. If falsey, the button is not shown.
     */
    primaryButtonText: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The secondary GlButton's href.
     */
    secondaryButtonLink: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * The secondary GlButton's text. If falsey, the button is not shown.
     */
    secondaryButtonText: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Determines whether to render the compact layout.
     */
    compact: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    height() {
      return this.shouldPreventImageReflow ? this.svgHeight : null;
    },
    shouldPreventImageReflow() {
      return Boolean(this.svgHeight);
    },
    shouldRenderPrimaryButton() {
      return Boolean(this.primaryButtonLink && this.primaryButtonText);
    },
    shouldRenderSecondaryButton() {
      return Boolean(this.secondaryButtonLink && this.secondaryButtonText);
    },
  },
};
</script>

<template>
  <section class="row" :class="{ 'empty-state text-center': !compact }">
    <div :class="{ 'col-3 d-none d-sm-block': compact, 'col-12': !compact }">
      <div v-if="svgPath" :class="{ 'svg-content': !compact }" class="svg-250">
        <img :src="svgPath" alt="" role="img" class="gl-max-w-full" :height="height" />
      </div>
    </div>
    <div :class="compact ? 'col-sm-9' : 'col-12'">
      <div class="text-content gl-mx-auto gl-my-0" :class="{ 'gl-p-5': !compact }">
        <h1 ref="title" :class="compact ? 'h5' : 'h4'">{{ title }}</h1>
        <p v-if="description || $scopedSlots.description" ref="description">
          <!--
            @slot Use this slot to customize the empty state's description
            area. Overrides the `description` prop.
          -->
          <slot name="description">
            {{ description }}
          </slot>
        </p>
        <div
          class="gl-display-flex gl-flex-wrap"
          :class="{ 'gl-justify-content-center': !compact }"
        >
          <!--
            @slot Use this slot to customize the empty state's actions area,
            where the buttons are. Overrides button-related props:
            `primaryButtonLink`, `primaryButtonText`, `secondaryButtonLink`,
            `secondaryButtonText`.
          -->
          <slot name="actions">
            <gl-button
              v-if="shouldRenderPrimaryButton"
              variant="confirm"
              :class="compact ? 'gl-mr-3' : 'gl-mx-2'"
              class="gl-mb-3"
              :href="primaryButtonLink"
              >{{ primaryButtonText }}</gl-button
            >
            <gl-button
              v-if="shouldRenderSecondaryButton"
              class="gl-mb-3 gl-mr-3"
              :class="{ 'gl-mx-2!': !compact }"
              :href="secondaryButtonLink"
              >{{ secondaryButtonText }}
            </gl-button>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
