<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { translate } from '../../../../../../utils/i18n';
import GlSprintf from '../../../../../utilities/sprintf/sprintf.vue';
import GlAnimatedLoaderIcon from '../../../../../base/animated_icon/animated_loader_icon.vue';
import { LOADING_TRANSITION_DURATION } from '../../constants';

export const i18n = {
  LOADER_LOADING_MESSAGE: translate(
    'GlDuoChatLoader.loaderLoadingMessage',
    '%{tool} is %{transition} an answer'
  ),
  LOADER_LOADING_TRANSITIONS: [
    translate('GlDuoChatLoader.loaderLoadingTransitionsFinding', 'finding'),
    translate('GlDuoChatLoader.loaderLoadingTransitionsWorkingOn', 'working on'),
    translate('GlDuoChatLoader.loaderLoadingTransitionsGenerating', 'generating'),
    translate('GlDuoChatLoader.loaderLoadingTransitionsProducing', 'producing'),
  ],
  GITLAB_DUO: translate('GlDuoChatLoader.gitlabDuo', 'GitLab Duo'),
};

export default {
  name: 'GlDuoChatLoader',
  components: {
    GlSprintf,
    GlAnimatedLoaderIcon,
  },
  i18n,
  props: {
    /**
     * The message containing the name of the current AI tool working on the answer.
     */
    toolName: {
      type: String,
      required: false,
      default: i18n.GITLAB_DUO,
    },
  },
  data() {
    return {
      loadingSequence: 0,
      timeout: null,
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.computeTransitionWidth();
    this.enter();
  },
  methods: {
    computeTransitionWidth() {
      const container = this.$refs.transition;
      const active = this.$refs.currentTransition[0]; // There's only one `currentTransition` ref at a time, but refs in v-for loops are always Arrays
      const { width, height } = active.getBoundingClientRect();
      container.$el.style.width = `${width}px`;
      container.$el.style.height = `${height}px`;
    },
    enter() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.loadingSequence =
          (this.loadingSequence + 1) % this.$options.i18n.LOADER_LOADING_TRANSITIONS.length;
        this.enter();
      }, LOADING_TRANSITION_DURATION);
    },
    isCurrentTransition(index) {
      return index === this.loadingSequence;
    },
  },
};
</script>

<template>
  <div class="duo-chat-loader gl-mt-5 gl-flex gl-items-center gl-gap-3">
    <gl-animated-loader-icon :is-on="true" />
    <div>
      <gl-sprintf :message="$options.i18n.LOADER_LOADING_MESSAGE">
        <template #tool>
          <strong data-testid="tool">{{ toolName }}</strong>
        </template>
        <template #transition>
          <transition-group
            ref="transition"
            name="text"
            class="transition gl-relative gl-inline-block gl-align-bottom"
            @after-leave="computeTransitionWidth"
          >
            <span
              v-for="(message, index) in $options.i18n.LOADER_LOADING_TRANSITIONS"
              v-show="isCurrentTransition(index)"
              :ref="isCurrentTransition(index) ? 'currentTransition' : ''"
              :key="message"
              :data-testid="isCurrentTransition(index) ? 'current-transition' : ''"
              class="gl-absolute gl-bottom-0 gl-left-0 gl-whitespace-nowrap"
              >{{ message }}</span
            >
          </transition-group>
        </template>
      </gl-sprintf>
    </div>
  </div>
</template>
