
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

Below is an example with options

```js
// myComponent.vue

this.$toast.show('This is a toast with an option.', {
  action: {
    text: 'Undo',
    onClick: () => { ... },
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
