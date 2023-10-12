<script>
import uniqueId from 'lodash/uniqueId';
import GlBadge from '../../base/badge/badge.vue';
import GlLink from '../../base/link/link.vue';
import GlPopover from '../../base/popover/popover.vue';
import GlSprintf from '../../utilities/sprintf/sprintf.vue';

export const i18n = {
  EXPERIMENT_BADGE: 'Experiment',
  EXPERIMENT_POPOVER_TITLE: "What's an Experiment?",
  EXPERIMENT_POPOVER_CONTENT:
    "An %{linkStart}Experiment%{linkEnd} is a feature that's in the process of being developed. It's not production-ready. We encourage users to try Experimental features and provide feedback. An Experiment: %{bullets}",
  EXPERIMENT_POPOVER_BULLETS: [
    'May be unstable',
    'Has no support and might not be documented',
    'Can be removed at any time',
  ],
};

export default {
  name: 'GlExperimentBadge',
  i18n,
  components: {
    GlBadge,
    GlPopover,
    GlSprintf,
    GlLink,
  },
  props: {
    /**
     * The URL of a page to provide more explanations on the experiment.
     */
    experimentHelpPageUrl: {
      type: String,
      required: false,
      default: '',
    },
    /**
     * The placement of the popover in relation to the button.
     */
    popoverPlacement: {
      type: String,
      required: false,
      default: 'bottom',
    },
  },
  created() {
    this.triggerId = uniqueId('experiment-badge-');
  },
};
</script>

<template>
  <gl-badge :id="triggerId" class="gl-mx-4 gl-hover-cursor-pointer" variant="neutral" size="md">
    <span>{{ $options.i18n.EXPERIMENT_BADGE }}</span>
    <gl-popover
      triggers="click"
      show-close-button
      :placement="popoverPlacement"
      :target="triggerId"
      :css-classes="['gl-z-index-9999!']"
      :title="$options.i18n.EXPERIMENT_POPOVER_TITLE"
    >
      <gl-sprintf :message="$options.i18n.EXPERIMENT_POPOVER_CONTENT">
        <template #link="{ content }">
          <gl-link
            v-if="experimentHelpPageUrl"
            :href="experimentHelpPageUrl"
            target="_blank"
            class="gl-font-sm!"
          >
            {{ content }}
          </gl-link>
          <span v-else>{{ content }}</span>
        </template>
        <template #bullets>
          <ul class="gl-mb-0 gl-pl-5">
            <li v-for="(item, i) in $options.i18n.EXPERIMENT_POPOVER_BULLETS" :key="`li-${i}`">
              {{ item }}
            </li>
          </ul>
        </template>
      </gl-sprintf>
    </gl-popover>
  </gl-badge>
</template>
