<!--
This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).

Please use the corresponding component in Duo-UI going forward.
All future development and maintenance for Duo components should take place in Duo-UI.

For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
-->

A component that lists messages in a conversation, and presents an optional delimiter to
mark the beginning of the conversation.

## Usage

```html
<gl-duo-chat-conversation :messages="messages" :show-delimeter="showDelimiter" />
```

Translations for newChatLabel can be set via the props as documented or via translation configuration:

```js
setConfigs({
  translations: {
    'GlDuoWorkflowPrompt.newChat': __('New chat'),
  },
});
```
