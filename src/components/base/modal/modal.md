Modals are used to reveal critical information, show information without losing context, or when the
system requires a user response. Modals can also fragment a complex workflow into simpler steps and
should serve a single purpose dedicated to completing the user’s task.

## VModel

You can use the `v-model` directive to control the modal’s visibility. The `v-model`
directive interfaces with the `visible` property and the `@change` event.

## Deprecation Warning

We are deprecating the `modal-ok` and `modal-cancel` slots. We are also changing the way the
`modal-footer` slot content is populated. This is in order to align this component with the design
system.

The `modal-footer` slot should only be populated via props: `action-primary`, `action-secondary` and
`action-cancel`. These props allow you to handle how a primary, secondary and cancel button will
behave in the modals footer. The props receive an object as such:

```js
{
  text: 'Save Changes',
  attributes: {
    variant: 'confirm',
    disabled: this.someState,
    class: 'some-class',
    ...
  }
}
```
