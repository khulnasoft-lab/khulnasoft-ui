`<gl-avatar-link>` decorates `<gl-avatar>` with hyperlink functionality. It accepts the same
properties as the `<gl-link>` component and it works in the same way too. The main purpose of this
component is to apply visual enhancements that makes evident that the user can interact with the
avatar.

## Using the component

When wrapping an `<gl-avatar>` component, `<gl-avatar-link>` darkens
the border that surrounds the avatar image or fallback text when hovering over it.

```vue
<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">
  <gl-avatar
    :size="32"
    :src="avatarUrl"
  />
</gl-avatar-link>
```

When wrapping an `<avatar-labeled>` component, `<avatar-link>` underlines
the label and sub-label text when hovering over the avatar. It also applies the
same effects described in the first example.

```vue
<gl-avatar-link target="blank" href="https://gitlab.com/gitlab-org/gitlab">
  <gl-avatar-labeled
    :size="32"
    entity-name="GitLab"
    label="GitLab User"
    sub-label="@gitlab"
  />
</gl-avatar-link>
```
