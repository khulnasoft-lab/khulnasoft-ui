Alerts allow the application to pass along relevant system information to the
user without impeding their journey. Alerts are system generated and may or may
not be derived by a user’s action.

## Dismissible alerts

Alerts don't handle their own visibility, so it's the parent component's
responsbility to listen for the `dismiss` event and hide the alert in some way.
For example:

```html
<script>
  ...
  computed: {
    shouldShowAlert() {
      return !this.isAlertDismissed && this.someOtherCondition();
    },
  },
  ...
</script>

<template>
  ...
  <gl-alert v-if="shouldShowAlert" @dismiss="isAlertDismissed = true">
    An important message
  </gl-alert>
  ...
</template>
```

## Sticky alerts

Any alert can use `position: sticky`, however it should be limited to critical alerts where keeping
the alert visually in context is necessary or when alerts are injected into a page and might
otherwise go unnoticed.
