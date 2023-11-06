<script>
import uniqueId from 'lodash/uniqueId';
import GlBadge from '../../base/badge/badge.vue';
import GlLink from '../../base/link/link.vue';
import GlPopover from '../../base/popover/popover.vue';
import GlSprintf from '../../utilities/sprintf/sprintf.vue';
import { badgeTypes, badgeTypeValidator } from './constants';

export const i18n = {
  experiment: {
    BADGE: 'Experiment',
    POPOVER_TITLE: "What's an Experiment?",
    POPOVER_CONTENT:
      "An %{linkStart}Experiment%{linkEnd} is a feature that's in the process of being developed. It's not production-ready. We encourage users to try Experimental features and provide feedback. An Experiment: %{bullets}",
    POPOVER_BULLETS: [
      'May be unstable',
      'Has no support and might not be documented',
      'Can be removed at any time',
    ],
  },
  beta: {
    BADGE: 'Beta',
    POPOVER_TITLE: "What's a Beta?",
    POPOVER_CONTENT:
      "A %{linkStart}Beta%{linkEnd} feature is not production-ready, but is unlikely to change drastically before it's released. We encourage users to try Beta features and provide feedback.\nA Beta feature: %{bullets}",
    POPOVER_BULLETS: [
      'May be unstable',
      'Should not cause data loss',
      'Is supported by a commercially reasonable effort',
      'Is complete or near completion',
    ],
  },
};

export default {
  name: 'GlExperimentBadge',
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
    helpPageUrl: {
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
    /**
     * The type of the badge.
     */
    type: {
      type: String,
      required: false,
      default: badgeTypes[0],
      validator: badgeTypeValidator,
    },
  },
  computed: {
    activeType() {
      return i18n[this.type];
    },
  },
  created() {
    this.triggerId = uniqueId('experiment-badge-');
  },
};
</script>

<template>
  <gl-badge :id="triggerId" class="gl-mx-4 gl-hover-cursor-pointer" variant="neutral" size="md">
    <span>{{ activeType.BADGE }}</span>
    <gl-popover
      triggers="click"
      show-close-button
      :placement="popoverPlacement"
      :target="triggerId"
      :css-classes="['gl-z-index-9999!']"
      :title="activeType.POPOVER_TITLE"
    >
      <gl-sprintf :message="activeType.POPOVER_CONTENT">
        <template #link="{ content }">
          <gl-link v-if="helpPageUrl" :href="helpPageUrl" target="_blank" class="gl-font-sm!">
            {{ content }}
          </gl-link>
          <span v-else>{{ content }}</span>
        </template>
        <template #bullets>
          <ul class="gl-mb-0 gl-pl-5">
            <li v-for="(item, i) in activeType.POPOVER_BULLETS" :key="`li-${i}`">
              {{ item }}
            </li>
          </ul>
        </template>
      </gl-sprintf>
    </gl-popover>
  </gl-badge>
</template>
