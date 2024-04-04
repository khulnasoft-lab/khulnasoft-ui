<script>
import GlSprintf from '../../../../../utilities/sprintf/sprintf.vue';
import { LOADING_TRANSITION_DURATION } from '../../constants';

export const i18n = {
  LOADER_LOADING_MESSAGE: '%{tool} is %{transition} an answer',
  LOADER_LOADING_TRANSITIONS: ['finding', 'working on', 'generating', 'producing'],
  GITLAB_DUO: 'GitLab Duo',
};

export default {
  name: 'GlDuoChatLoader',
  components: {
    GlSprintf,
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
  <div class="duo-chat-loader gl-display-flex gl-align-items-center">
    <div class="gl-display-flex gl-mr-3">
      <div class="duo-chat-loader__dot duo-chat-loader__dot--1"></div>
      <div class="duo-chat-loader__dot duo-chat-loader__dot--2"></div>
      <div class="duo-chat-loader__dot duo-chat-loader__dot--3"></div>
    </div>
    <div>
      <gl-sprintf :message="$options.i18n.LOADER_LOADING_MESSAGE">
        <template #tool>
          <strong data-testid="tool">{{ toolName }}</strong>
        </template>
        <template #transition>
          <transition-group
            ref="transition"
            name="text"
            class="transition gl-display-inline-block gl-relative gl-vertical-align-bottom"
            @after-leave="computeTransitionWidth"
          >
            <span
              v-for="(message, index) in $options.i18n.LOADER_LOADING_TRANSITIONS"
              v-show="isCurrentTransition(index)"
              :ref="isCurrentTransition(index) ? 'currentTransition' : ''"
              :key="message"
              :data-testid="isCurrentTransition(index) ? 'current-transition' : ''"
              class="gl-white-space-nowrap gl-absolute gl-bottom-0 gl-left-0"
              >{{ message }}</span
            >
          </transition-group>
        </template>
      </gl-sprintf>
    </div>
  </div>
</template>
