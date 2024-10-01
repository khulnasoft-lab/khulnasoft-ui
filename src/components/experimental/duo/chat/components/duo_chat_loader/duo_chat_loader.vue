<script>
import { translate } from '../../../../../../utils/i18n';
import GlSprintf from '../../../../../utilities/sprintf/sprintf.vue';

export const i18n = {
  LOADER_LOADING_MESSAGE: translate(
    'GlDuoChatLoader.loaderLoadingMessage',
    '%{tool} is working on an answer'
  ),
  GITLAB_DUO: translate('GlDuoChatLoader.gitlabDuo', 'GitLab Duo'),
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
    /**
     * The loading message to display.
     */
    loadingMessage: {
      type: String,
      required: false,
      default: i18n.LOADER_LOADING_MESSAGE,
    },
  },
};
</script>

<template>
  <div class="duo-chat-loader gl-flex gl-items-center">
    <div class="gl-mr-3 gl-flex">
      <div class="duo-chat-loader__dot duo-chat-loader__dot--1"></div>
      <div class="duo-chat-loader__dot duo-chat-loader__dot--2"></div>
      <div class="duo-chat-loader__dot duo-chat-loader__dot--3"></div>
    </div>
    <div>
      <gl-sprintf :message="loadingMessage">
        <template #tool>
          <strong data-testid="tool">{{ toolName }}</strong>
        </template>
      </gl-sprintf>
    </div>
  </div>
</template>
