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

* `change`: Emitted when the textarea's `input` event fires, when text is
changed within the textarea
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
