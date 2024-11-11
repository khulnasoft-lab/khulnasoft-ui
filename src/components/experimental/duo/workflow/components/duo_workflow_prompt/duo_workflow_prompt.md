<!--
This component has been migrated to the Duo-UI library (https://gitlab.com/gitlab-org/duo-ui).

Please use the corresponding component in Duo-UI going forward.
All future development and maintenance for Duo components should take place in Duo-UI.

For more details, see the migration epic: https://gitlab.com/groups/gitlab-org/-/epics/15344 or reach out to the Duo-Chat team in #g_duo_chat.
-->

This is the UI panel to capture the user's AI prompt for Duo Workflow. This
prompt is emitted upwards so it may be sent to the Duo Workflow service.

## Usage

To use this component, import it and be sure to set the following props:

* `prompt`: the prompt the user enters, can be provided if the prompt has been
  cached
* `summary`: the summary of the goal as provided by the Duo Workflow service,
displayed adjacent to the title
* `loading`: sets the loading state for the panel while waiting on responses

Also listen to the following events:

* `update:prompt`: Emitted when the prompt textarea's `input` event fires, when
  the text within the textarea is changed
* `update:image`: Emitted when the image input's `input` event fires, when the
    text within the input is changed
* `confirm`: Emitted when the confirm button is clicked
* `cancel`: Emitted when the cancel button is clicked

Translations for the title of the panel, labels, and other strings can be set via
the props as documented or via translation configuration:

```js
setConfigs({
  translations: {
    'GlDuoWorkflowPrompt.header': __('Plan'),
    'GlDuoWorkflowPrompt.promptLabel': __('Prompt'),
    'GlDuoWorkflowPrompt.promptLabelDescription': __('What is your task?'),
    'GlDuoWorkflowPrompt.promptDescription': __('Be specific and include references!'),
    'GlDuoWorkflowPrompt.confirmButtonText': __('Start plan'),
    'GlDuoWorkflowPrompt.cancelButtonText': __('Stop'),
  },
});
```
