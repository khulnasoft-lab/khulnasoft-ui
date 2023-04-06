## Overview

The `GlSprintf` component lets you do `sprintf`-style string interpolation with
child components. Each placeholder in the translated string, provided via the
`message` prop, becomes a slot that you can use to insert any components or
markup in the rendered output.

> NOTE: `gl-sprintf` does not translate the message for you; you must provide
> it already translated. In the following examples, it is assumed that
> a `gettext`-style `__` translation function is available in your Vue
> templates.

## Displaying messages with text between placeholders (e.g., links, buttons)

Sentences should not be split up into different messages, otherwise they may
not be translatable into certain languages. To help with this, `GlSprintf`
interprets placeholders suffixed with `Start` and `End` to indicate the
boundaries of a component to display within the message. Any text between
them is passed, via the `content` scoped slot property, to the slot name common
to the placeholders.

For example, using `linkStart` and `linkEnd` placeholders in a message defines
a `link` scoped slot:

```html
<div>
  <gl-sprintf :message="__('Learn more about %{linkStart}zones%{linkEnd}')">
    <template #link="{ content }">
      <gl-link
        href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
        target="_blank"
      >{{ content }}</gl-link>
    </template>
  </gl-sprintf>
</div>
```

will render as:

```html
<div>
  Learn more about
  <a
    href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
    target="_blank"
    rel="noopener noreferrer"
  >zones</a>
</div>
```

Note that _any_ arbitrary HTML tags or Vue component(s) can be used within
a scoped slot, and that the content passed to it can be used in any way at all;
for instance, as regular text, or in component attributes or slots.

Here's a more complex example, which `<gl-sprintf>` lets you do in a breeze:

```html
<div>
  <gl-sprintf :message="__('Written by %{authorStart}someone%{authorEnd}')">
    <template #author="{ content }">
      <my-vue-component v-gl-tooltip="content" @event="handleEvent(content)">
        {{ content }}
      </my-vue-component>
      <p>
          {{ content }}
          <div>{{ content }}</div>
      </p>
    </template>
  </gl-sprintf>
</div>
```

This is not feasible in a JS-only solution, since arbitrary Vue components
cannot easily be used. In addition, a JS-only solution is more likely to be
prone to XSS attacks, as the Vue compiler isn't available to help protect
against them.

### Customizing start/end placeholders

You can customize the start and end placeholders that `GlSprintf` looks for
using the `placeholders` prop. For instance:

```html
<div>
  <gl-sprintf
    :message="__('Learn more about %{my_custom_start}zones%{my_custom_end}')"
    :placeholders="{ link: ['my_custom_start', 'my_custom_end'] }"
  >
    <template #link="{ content }">
      <gl-link
        href="https://cloud.google.com/compute/docs/regions-zones/regions-zones"
        target="_blank"
      >{{ content }}</gl-link>
    </template>
  </gl-sprintf>
</div>
```

This can be useful if you are migrating an existing string to `GlSprintf` that
uses different placeholder naming conventions, and don't want invalidate
existing translations.

## Displaying components within a message

Use slots to replace placeholders in the message with the slots' contents.
There is a slot for every placeholder in the message. For example, the `author`
slot name can be used when there is an `%{author}` placeholder in the message:

```html
<script>
export default {
  data() {
    return {
      authorName: 'Some author',
    };
  },
};
</script>

<template>
  <div>
    <gl-sprintf :message="__('Written by %{author}')">
      <template #author>
        <span>{{ authorName }}</span>
      </template>
    </gl-sprintf>
  </div>
</template>
```

The example above renders to this HTML:

```html
<div>Written by <span>Some author</span></div>
```

## Usage caveats

### White space

`GlSprintf` does not handle white space in scoped slots specially; it is passed
through and rendered just like regular text. This means that white space in the
scoped slot templates *themselves*, including newlines and indentation, are
passed through untouched (assuming the template compiler you're using doesn't
trim text nodes at compile time; `vue-template-compiler` preserves white space
by default, for instance).

Most of the time you don't need to worry about this, since
[browsers normalize white space][1] automatically, but here's an example, using
punctuation, where you might want to be conscious of the white space in the
template:

```html
<div>
  <gl-sprintf :message="__('Foo %{boldStart}bar%{boldEnd}!')">
    <template #bold="{ content }">
      <b>
        {{ content }}
      </b>
    </template>
  </gl-sprintf>
</div>
```

As written, the literal markup rendered would be:

```html
<div>  Foo <b>
        bar
      </b>!
</div>
```

where the white space (including newlines) before and after `bar` is exactly
the newlines and indentation in the source template. The browser will render
this as:

<div>  Foo <b>
        bar
      </b>!
</div>

Note the single space between `bar` and `!`. To avoid that, remove the
white space in the template, or use `v-text`:

```html
<div>
  <gl-sprintf :message="__('Foo %{boldStart}bar%{boldEnd}!')">
    <template #bold="{ content }">
      <b>{{ content }}</b>
      <!-- OR -->
      <b v-text="content" />
    </template>
  </gl-sprintf>
</div>
```

### Miscellaneous

While there are a lot of caveats here, you don't need to worry about reading
them _unless_ you find `GlSprintf` isn't rendering what you'd expect.

- Since `GlSprintf` typically renders multiple elements, it can't be used as
  a component's root, it must be wrapped with at least one other root element,
  otherwise Vue will throw a `Multiple root nodes returned from render
  function` error.
- If a slot for a given placeholder _isn't_ provided, the placeholder
  will be rendered as-is, e.g., literally `Written by %{author}` if the
  `author` slot _isn't_ provided, or literally `%{linkStart}foo%{linkEnd}` if
  the `link` slot isn't provided.
- Content between `Start` and `End` placeholders is effectively thrown away if
  the scoped slot of the correct name doesn't consume the `content` property in
  some way, though the slot's components should still be rendered.
- If there's no placeholder in the message for a provided named slot, the
  content of that slot is silently thrown away.
- If only one of the `Start` or `End` placeholders is in the message, or they
  are in the wrong order, they are treated as plain slots, i.e., it is assumed
  there is no text to extract and pass to the scoped slot. This allows you to
  use plain slots whose names end in `Start` or `End`, e.g., `backEnd`, or
  `fromStart` in isolation, without their `Start`/`End` counterparts.
- Text extraction between `Start` and `End` placeholders is only done one level
  deep. This is intentional, so as to avoid building complex sprintf messages
  that would better be implemented in components. As an example,
  `${linkStart}test%{icon}%{linkEnd}`, if provided both the `link` and `icon`
  slots, would pass `test%{icon}` as a literal string as content to the `link`
  scoped slot.
- For more examples and edge cases, please see the test suite for `GlSprintf`.
- To be successfully used in `GlSprintf`, slot names should:
  - start with a letter (`[A-Za-z]`)
  - only contain alpha-numeric characters (`[A-Za-z0-9]`), underscore (`_`) and
    dash (`-`),
  - should not end with underscore (`_`) or dash (`-`) So for example:
    `%{author}`, `%{author_name}`, `%{authorName}` or `%{author-name-100}` are
    all valid placeholders.

## Internet Explorer 11

This component uses [`String.prototype.startsWith()`] and [`String.prototype.endsWith()`] under the
hood. Make sure those methods are polyfilled if you plan on using the component on IE11.

[1]: https://www.w3.org/TR/css-text-3/#white-space-phase-1
[`String.prototype.startsWith()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
[`String.prototype.endsWith()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
