Broadcast messages provide an efficient and prominent way to deliver critical messages at the
instance level to all users. For example, a broadcast message can be used when an admin wants to
announce that their platform will experience downtime during a specific period.

In comparison with an alert, broadcast messages are created by an admin and not triggered by the
system.

Please refer to [Pajamas' documentation](https://design.gitlab.com/components/broadcast-message)
for more information on when to use this component.

## Dismiss a broadcast message

The `GlBroadcastMessage` component deals with users dismissal the same way `GlAlert` does, meaning
it does not handle its own visibility but emits a `dismiss` event that the parent component should
listen to in order to hide the message. Example:

```html
<template>
  ...
  <gl-broadcast-message v-if="!dismissed" @dismiss="dismissed = true">
    An important message
  </gl-broadcast-message>
  ...
</template>
```
