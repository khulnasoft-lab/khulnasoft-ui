/**
 * This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).
 *
 * Please use the corresponding component in Duo-UI going forward.
 * All future development and maintenance for Duo components should take place in Duo-UI.
 *
 * For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
 */

export const CHAT_RESET_MESSAGE = '/reset';
export const CHAT_CLEAR_MESSAGE = '/clear';
export const CHAT_INCLUDE_MESSAGE = '/include';

export const LOADING_TRANSITION_DURATION = 7500;

export const DOCUMENTATION_SOURCE_TYPES = {
  HANDBOOK: {
    value: 'handbook',
    icon: 'book',
  },
  DOC: {
    value: 'doc',
    icon: 'documents',
  },
  BLOG: {
    value: 'blog',
    icon: 'list-bulleted',
  },
};

export const MESSAGE_MODEL_ROLES = {
  user: 'user',
  system: 'system',
  assistant: 'assistant',
};

export const SELECTED_CONTEXT_ITEMS_DEFAULT_COLLAPSED = true;
