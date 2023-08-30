# Making labels translatable

Some components need to render text content. For example, a search input component might require a
placeholder. In those cases, it's important for text content to be exposed via a public API so
consumers can override and translate them as needed.

GitLab UI provides a way to set default translations at configuration time for all labels marked
as translatable, as well as a way to override individual labels contextually. This requires a bit of
setup:

* All labels need to be exposed as component props to provide contextual overrides.
  Composite components need to re-expose their children label props so overrides
  can be passed down the components tree.
* Prop default values should leverage the `translate` utility to extract generic
  translations from configuration.

Here's how a translatable component might look like:

```html
<script>
export default {
  name: 'GlBar',
  props: {
    // Expose the label via the component's props so that the consumer can override it contextually.
    ariaLabel: {
      type: String,
      required: false,
      // Always fallback on the configuration's generic translation for when no override is needed.
      default: () => translate('GlBar.ariaLabel', 'Default ARIA label'),
    }
  }
};
</script>

<template>
  <button :aria-label="ariaLabel"></button>
</template>
```

A composite component that leverages the above primitive component might then look like this:

```html
<script>
export default {
  name: 'GlFoo',
  components: { GlBar },
  props: {
    // Re-expose the child component's label prop to preserve the ability to override it contextually.
    barAriaLabel: {
      type: String,
      required: false,
      // The composite component can define its own generic translation if needed.
      default: () => translate('GlFoo.GlBar.ariaLabel', 'Default ARIA label'),
    }
  }
};
</script>

<template>
  <gl-bar :aria-label="barAriaLabel" />
</template>
```

## The `translate` helper

The `translate` helper is what we use to flag translatable labels. It accepts two parameters:

1. The translation key. A string representing the label's ID which the consumer needs to provide
   when setting generic translations. As a general guideline, translation keys should start with the
   component's name, followed by a dot and the child component's name if applicable, followed by a
   dot and a camelCased string describing the label being externalized.
   E.g. `GlParentComponent[.GlChildComponent].externalizedLabel`.
   Translation keys should not change unless absolutely necessary. If one needs to be changed,
   consumers would need to update their configuration to ensure existing translations are still
   bound to the corresponding translation keys. Changing a translation key should be considered a
   breaking change.
2. The default, US English label. This can be relied upon if the consumer does not have translation
   capabilities, in which case it might be simpler not to explicitly setup generic translations at
   configuration time. _Do not_ rely on this if the consumer is internationalized as you might end
   up with untranslated labels scattered across the app. In development, GitLab UI warns about
   missing generic translations to make this caveat more visible.

## Setting generic translations

Generic translations must be provided at configuration time. If a label has been setup with
`translate('GlBar.ariaLabel', 'Default ARIA label')`, the generic translation can be provided as such:

```js
setConfigs({
  translations: {
    'GlBar.ariaLabel': __('GlBar generic ARIA label'),
  },
});
```

From there, any instance of `GlBar` will leverage this generic translation, unless it is being
overridden contextually.

## Override translations contextually

To override a component label's translations in a specific context, provide the corresponding prop:

```html
<gl-bar :aria-label="__('Custom ARIA label for GlBar')" />
<gl-foo :bar-aria-label="__('Custom ARIA label for GlBar in GlFoo')" />
```

## Building the translations dictionary

GitLab UI keeps tracks of translatable labels via the `translations.json` dictionary. When adding
new translatable labels, make sure they are included in the dictionary by running
`yarn translations:collect`, then commit the changes.
If you have `lefthook` enabled, this is done automatically in the `pre-commit` hook.
