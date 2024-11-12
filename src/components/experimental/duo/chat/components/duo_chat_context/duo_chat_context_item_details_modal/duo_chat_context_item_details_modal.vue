<script>
/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

import { nextTick } from 'vue';
import { contextItemValidator } from '../utils';
import GlModal from '../../../../../../base/modal/modal.vue';
import { SafeHtmlDirective as SafeHtml } from '../../../../../../../directives/safe_html/safe_html';
import GlSkeletonLoader from '../../../../../../base/skeleton_loader/skeleton_loader.vue';
import { translate } from '../../../../../../../utils/i18n';
import {
  CONTEXT_ITEM_CATEGORY_DEPENDENCY,
  CONTEXT_ITEM_CATEGORY_LOCAL_GIT,
  LANGUAGE_IDENTIFIER_DIFF,
  LANGUAGE_IDENTIFIER_PLAINTEXT,
  LANGUAGE_IDENTIFIER_PREFIX,
} from '../constants';
import GlAlert from '../../../../../../base/alert/alert.vue';

export default {
  name: 'GlDuoChatContextItemDetailsModal',
  components: {
    GlAlert,
    GlSkeletonLoader,
    GlModal,
  },
  directives: {
    SafeHtml,
  },
  inject: {
    renderGFM: {
      from: 'renderGFM',
      default: () => (element) => {
        element.classList.add('duo-chat-markdown', 'duo-chat-compact-markdown');
      },
    },
  },
  props: {
    /**
     * Context items to preview. If it has no `content`, the loading state will be displayed.
     */
    contextItem: {
      type: Object,
      required: true,
      validator: contextItemValidator,
    },
  },
  data() {
    return {
      contentErrorIsVisible: false,
    };
  },
  computed: {
    isLoadingContent() {
      return this.contextItem.content === undefined;
    },
    languageIdentifierClass() {
      if (this.contextItem.category === CONTEXT_ITEM_CATEGORY_LOCAL_GIT) {
        return LANGUAGE_IDENTIFIER_DIFF;
      }

      const fileExtension = this.contextItem.metadata?.relativePath?.split('.').at(-1);
      if (fileExtension && fileExtension !== this.contextItem.metadata?.relativePath) {
        return `${LANGUAGE_IDENTIFIER_PREFIX}${fileExtension}`;
      }

      return LANGUAGE_IDENTIFIER_PLAINTEXT;
    },
    title() {
      return (
        this.contextItem.metadata?.title ||
        this.contextItem.metadata?.relativePath ||
        translate('GlDuoChatContextItemDetailsModal.title', 'Preview')
      );
    },
    isDependencies() {
      return this.contextItem.category === CONTEXT_ITEM_CATEGORY_DEPENDENCY;
    },
  },
  watch: {
    contextItem: {
      async handler(newVal, oldVal) {
        // Dependency items contain structured data as content, not code/markdown.
        // So skip running this content through GFM, we'll parse and render it here in the component.
        if (newVal.category === CONTEXT_ITEM_CATEGORY_DEPENDENCY) {
          return;
        }

        const isUnchangedOrEmptyContent = !newVal?.content || newVal?.content === oldVal?.content;
        if (isUnchangedOrEmptyContent) {
          return;
        }

        await nextTick();
        await this.hydrateContentWithGFM();
      },
      immediate: true,
    },
  },
  methods: {
    async hydrateContentWithGFM() {
      await nextTick();

      if (this.$refs.content) {
        this.renderGFM(this.$refs.content);
      }
    },
    parseDependencies() {
      if (this.contextItem.category !== CONTEXT_ITEM_CATEGORY_DEPENDENCY) {
        return null;
      }
      if (!this.contextItem.content) {
        return null;
      }

      try {
        return JSON.parse(this.contextItem.content);
      } catch (error) {
        this.contentErrorIsVisible = true;
        return {};
      }
    },
    onModalVisibilityChange(isVisible) {
      if (!isVisible) {
        this.$emit('close');
      }
    },
  },
  CONTENT_ERROR_MESSAGE: translate(
    'GlDuoChatContextItemDetailsModal.contentErrorMessage',
    'Item content could not be displayed.'
  ),
};
</script>

<template>
  <gl-modal
    modal-id="context-item-details-modal"
    :title="title"
    :visible="true"
    :scrollable="true"
    hide-footer
    size="lg"
    @change="onModalVisibilityChange"
  >
    <gl-skeleton-loader v-if="isLoadingContent" />
    <gl-alert
      v-else-if="contentErrorIsVisible"
      variant="danger"
      :dismissible="false"
      data-testid="content-error-alert"
    >
      {{ $options.CONTENT_ERROR_MESSAGE }}
    </gl-alert>
    <div v-else-if="isDependencies" data-testid="context-item-content">
      <p>Project dependencies from {{ contextItem.metadata.secondaryText }}</p>
      <div v-for="(matches, index) in parseDependencies()" :key="index">
        <div v-for="(dependencies, language) in matches" :key="language">
          <h3 class="gl-heading-4 gl-mb-2">{{ language }}</h3>
          <ul class="gl-pl-6">
            <li v-for="dependency in dependencies" :key="dependency" class="">
              {{ dependency }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else ref="content" data-testid="context-item-content">
      <pre
        v-safe-html="contextItem.content"
        class="code js-syntax-highlight gl-p-3"
        :class="languageIdentifierClass"
      ></pre>
    </div>
  </gl-modal>
</template>
