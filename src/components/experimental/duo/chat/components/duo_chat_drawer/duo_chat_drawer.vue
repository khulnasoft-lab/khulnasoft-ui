<script>
import GlDrawer from '../../../../../base/drawer/drawer.vue';
import GlButton from '../../../../../base/button/button.vue';
import GlTabs from '../../../../../base/tabs/tabs/tabs.vue';
import GlTab from '../../../../../base/tabs/tab/tab.vue';
import GlTableLite from '../../../../../base/table_lite/table_lite.vue';
import GlToggle from '../../../../../base/toggle/toggle.vue';
import { translate } from '../../../../../../utils/i18n';
import GlModal from '../../../../../base/modal/modal.vue';
import GlForm from '../../../../../base/form/form.vue';
import GlFormInput from '../../../../../base/form/form_input/form_input.vue';
import GlFormGroup from '../../../../../base/form/form_group/form_group.vue';
import GlFormTextarea from '../../../../../base/form/form_textarea/form_textarea.vue';

export const i18n = {
  CHAT_MENU_TITLE: translate('GlDuoChatDrawer.chatMenuTitle', 'Chat Menu'),
  CHAT_HISTORY_TAB_TITLE: translate('GlDuoChatDrawer.chatHistoryTabTitle', 'Recent Chats'),
  NEW_CHAT_BUTTON: translate('GlDuoChatDrawer.newChatButton', 'New Chat'),
  TOOLS_TAB_TITLE: translate('GlDuoChatDrawer.toolsTabTitle', 'Tools'),
  GITLAB_CONTEXT_TOOLS: translate('GlDuoChatDrawer.gitlabContextTools', 'GitLab Tools'),
  CUSTOM_CONTEXT_TOOLS: translate('GlDuoChatDrawer.customContextTools', 'Custom Context Tools'),
  NEW_CUSTOM_TOOL: translate('GlDuoChatDrawer.newCustomTool', 'New Custom Tool'),
  ADD_CUSTOM_TOOL: translate('GlDuoChatDrawer.addCustomTool', 'Add Custom Tool'),
  TOOL_NAME: translate('GlDuoChatDrawer.toolName', 'Tool Name'),
  TOOL_PATH: translate('GlDuoChatDrawer.toolPath', 'Tool Path'),
  TOOL_DESCRIPTION: translate('GlDuoChatDrawer.toolDescription', 'Description'),
  CURRENT_CHAT_TITLE: translate('GlDuoChatDrawer.currentChatTitle', 'Chat Details'),
  TOOL_PARAMETERS: translate('GlDuoChatDrawer.toolParameters', 'Parameters'),
};

export default {
  name: 'GlDuoChatDrawer',
  components: {
    GlDrawer,
    GlButton,
    GlTabs,
    GlTab,
    GlTableLite,
    GlToggle,
    GlModal,
    GlForm,
    GlFormInput,
    GlFormGroup,
    GlFormTextarea,
  },
  props: {
    /**
     * Controls whether the drawer is open or closed.
     */
    open: {
      type: Boolean,
      required: true,
    },
    /**
     * Array of chat threads
     */
    threads: {
      type: Array,
      required: true,
      default: () => [],
      validator: (value) =>
        value.every((thread) => thread.id && thread.title && thread.description),
    },
    /**
     * The currently active thread
     */
    activeThread: {
      type: Object,
      required: false,
      default: null,
    },
    
    /**
     * Gitlab Context Tools
     */
    tools: {
      type: Array,
      required: false,
      default: () => [],
    },
    /**
     * Custom Context Tools
     */
    customTools: {
      type: Array,
      required: false,
      default: () => [],
    },
    chatHistoryTabTitle: {
      type: String,
      required: false,
      default: i18n.CHAT_HISTORY_TAB_TITLE,
    },
    newChatButton: {
      type: String,
      required: false,
      default: i18n.NEW_CHAT_BUTTON,
    },
    chatMenuTitle: {
      type: String,
      required: false,
      default: i18n.CHAT_MENU_TITLE,
    },
  },
  data() {
    return {
      toolFields: [
        { key: 'name', label: 'Tool Name' },
        { key: 'enabled', label: 'Enabled' },
        { key: 'description', label: 'Description' },
      ],
      customToolFields: [
        { key: 'name', label: 'Tool Name' },
        { key: 'enabled', label: 'Enabled' },
        { key: 'description', label: 'Description' },
        { key: 'path', label: 'Path' },
      ],
      showNewToolModal: false,
      newTool: {
        name: '',
        path: '',
        description: '',
        parameters: '',
        enabled: true,
      },
      modalId: 'new-tool-modal',
      modalActionPrimary: {
        text: this.$options.i18n.ADD_CUSTOM_TOOL,
        attributes: { variant: 'confirm' },
      },
      modalActionCancel: {
        text: 'Cancel',
      },
    };
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onThreadClick(thread) {
      this.$emit('thread-selected', thread.id);
    },
    isActiveThread(thread) {
      return this.activeThread && this.activeThread.id === thread.id;
    },
    onNewChat() {
      this.$emit('new-chat');
    },
    onToolToggle(tool) {
      this.$emit('tool-updated', { ...tool, enabled: !tool.enabled });
    },
    openNewToolModal() {
      this.showNewToolModal = true;
    },
    closeNewToolModal() {
      this.showNewToolModal = false;
      this.resetNewToolForm();
    },
    resetNewToolForm() {
      this.newTool = {
        name: '',
        path: '',
        description: '',
        parameters: '',
        enabled: true,
      };
    },
    addNewCustomTool() {
      this.$emit('add-custom-tool', {
        name: this.newTool.name,
        enabled: true,
        description: this.newTool.description,
        path: this.newTool.path,
        parameters: this.newTool.parameters,
        custom: true,
      });
      this.closeNewToolModal();
    },
    formatDate(date) {
      if (!date) return '';
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleDateString();
      const formattedTime = dateObj.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    },
  },
  i18n,
};
</script>

<template>
  <div>
    <gl-drawer :open="open" variant="sidebar" class="gl-w-5/6" @close="onClose">
      <template #title>
        <div class="gl-flex gl-flex-col">
          <span class="gl-my-0 gl-text-lg gl-font-semibold">{{ chatMenuTitle }}</span>
          <gl-button
            category="primary"
            variant="confirm"
            size="medium"
            class="gl-mt-3"
            @click="onNewChat"
          >
            {{ newChatButton }}
          </gl-button>
        </div>
      </template>
      <template #default>
        <gl-tabs>
          <gl-tab :title="chatHistoryTabTitle">
            <ul class="gl-list-style-none gl-pl-0">
              <li
                v-for="thread in threads"
                :key="thread.id"
                class="gl-cursor-pointer gl-px-4 gl-py-3"
                :class="{
                  'active-command': isActiveThread(thread),
                  'gl-text-secondary': !isActiveThread(thread),
                }"
                @click="onThreadClick(thread)" 
              >
                <h5 class="gl-mb-2 gl-font-semibold">{{ thread.title }}</h5>
                <p class="gl-mb-0">{{ thread.description }}</p>
              </li>
            </ul>
          </gl-tab>
          <gl-tab :title="$options.i18n.TOOLS_TAB_TITLE">
            <h5 class="gl-font-lg gl-my-5">{{ $options.i18n.GITLAB_CONTEXT_TOOLS }}</h5>
            <gl-table-lite :items="tools" :fields="toolFields" class="gl-mb-7">
              <template #cell(enabled)="{ item }">
                <gl-toggle :value="item.enabled" label="" @change="onToolToggle(item)" />
              </template>
            </gl-table-lite>
            <h5 class="gl-font-lg gl-my-5">{{ $options.i18n.CUSTOM_CONTEXT_TOOLS }}</h5>
            <gl-table-lite :items="customTools" :fields="customToolFields">
              <template #cell(enabled)="{ item }">
                <gl-toggle :value="item.enabled" label="" @change="onToolToggle(item)" />
              </template>
            </gl-table-lite>
            <gl-button
              category="secondary"
              variant="info"
              class="gl-mt-5"
              @click="openNewToolModal"
            >
              {{ $options.i18n.NEW_CUSTOM_TOOL }}
            </gl-button>
          </gl-tab>
        </gl-tabs>
      </template>
      <template #footer>
        <div v-if="activeThread">
          <h5 class="gl-font-lg gl-my-5">{{ $options.i18n.CURRENT_CHAT_TITLE }}</h5>
          <div class="gl-flex gl-flex-col gl-gap-2">
            <span class="gl-text-gray-500">
              <strong> {{ activeThread.title }} </strong>
            </span>
            <span class="gl-text-gray-500">
               {{ activeThread.description }}
            </span>
            <span class="gl-text-gray-500">
              <strong>Chat Token Usage:</strong> {{ activeThread.tokens }}
            </span>
            <span class="gl-text-gray-500">
              <strong>Created:</strong> {{ formatDate(activeThread.createdAt) }}
            </span>
            <span class="gl-text-gray-500">
              <strong>Updated:</strong> {{ formatDate(activeThread.modifiedAt) }}
            </span>
          </div>
        </div>
      </template>
    </gl-drawer>
    <gl-modal
      :visible="showNewToolModal"
      :modal-id="modalId"
      :title="$options.i18n.NEW_CUSTOM_TOOL"
      :action-primary="modalActionPrimary"
      :action-cancel="modalActionCancel"
      @primary="addNewCustomTool"
      @cancel="closeNewToolModal"
      @hidden="closeNewToolModal"
    >
      <gl-form>
        <gl-form-group :label="$options.i18n.TOOL_NAME" label-for="new-tool-name">
          <gl-form-input id="new-tool-name" v-model="newTool.name" required />
        </gl-form-group>
        <gl-form-group :label="$options.i18n.TOOL_PATH" label-for="new-tool-path">
          <gl-form-input id="new-tool-path" v-model="newTool.path" required />
        </gl-form-group>
        <gl-form-group :label="$options.i18n.TOOL_DESCRIPTION" label-for="new-tool-description">
          <gl-form-input id="new-tool-description" v-model="newTool.description" required />
        </gl-form-group>
        <gl-form-group :label="$options.i18n.TOOL_PARAMETERS" label-for="new-tool-parameters">
          <gl-form-textarea id="new-tool-parameters" v-model="newTool.parameters" required />
        </gl-form-group>
      </gl-form>
    </gl-modal>
  </div>
</template>
