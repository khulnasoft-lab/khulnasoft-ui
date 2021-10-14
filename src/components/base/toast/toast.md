# Toast

<!-- STORY -->

## Usage

Toasts are used to display system messages. The messages are short and straightforward. It may
contain a dismiss button, and an action button depending on the situation.

## Using the plugin

In order to use the plugin, it needs to be included in your application with `Vue.use`.

```js
// myApp.js

import { GlToast } from '@gitlab/ui';

// Note, this has to be done before `Vue.new()`
Vue.use(GlToast);
```

Once included in your application, the toast plugin is globally available.

```js
// myComponent.vue

this.$toast.show('Hello GitLab!');
```

### Triggering a toast with a callback action

The following shows an action with an `Undo` action button. Clicking on the button triggers the
`onClick` callback.

```js
// myComponent.vue

this.$toast.show('This is a toast with an option.', {
  action: {
    text: 'Undo',
    onClick: () => { ... },
  },
});
```

### Triggering a toast with a link action

If you'd like the toast's action to be a link, provide the link's attributes via the `action.link`
option. Internally, `GlLink` is used to render the action link.

```js
// myComponent.vue

this.$toast.show('This is a toast with an option.', {
  action: {
    text: 'Link to some other page',
    link: {
      href: '/another/page',
      target: '_blank',
    },
  },
});
```

### Options

Below are the options you can pass to create a toast

| **Option**    | **Type**      | **Default** | **Description**                          |
| ------------- | ------------- | ----------- | ---------------------------------------- |
| autoHideDelay | Number        | 5000        | Display time of the toast in millisecond |
| action        | Object        | close       | Add single actions to toast              |
| toastClass    | String, Array | 'gl-toast'  | Custom css class name of the toast       |
| onComplete    | Function      | null        | Trigger when toast is completed          |

## Under the hood

Toast uses [`BToast`] internally. So please take a look at their extensive documentation for more information.

[`btoast`]: https://bootstrap-vue.org/docs/components/toast
