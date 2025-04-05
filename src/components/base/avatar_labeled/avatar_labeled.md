## Usage

Avatars may also be adjacent to a text alternative, such as a user or project name. In these cases,
a null `alt` text should be used so that they can be ignored by assistive technologies.

Use the `avatar-labeled` component in those scenarios. It will set a null `alt` text by default.
It allows to display a `label` and/or a `sub-label` next to the avatar image. It accepts the same
properties as the avatar component to modify the avatar’s shape and size.

## Using the component

```js
<gl-avatar-labeled
  :shape="shape"
  :size="size"
  :src="src"
  :label="label"
  :sub-label="subLabel"
/>
```
