# GitLab UI CSS

GitLab UI provides component styles, a utility-class library and SCSS utilities.

## Quick Start

To include GitLab UI base styles in your project, simple import the `@gitlab/ui` main css file:

```css
@import '@gitlab/ui/dist/index.css';
```

This provides component styles and utility classes.

## Usage with a SCSS preprocessor

If you use a SCSS preprocessor, you may include the base SCSS file instead of `index.css`:

```scss
@import '@gitlab/ui/src/scss/gitlab_ui';
```

In addition to component styling and utility classes, this provides various functions, variables
and mixins.

### Overriding variables

Variables are imported as part of the [base SCSS file](#Usage-with-a-SCSS-preprocessor).

To use a variable without including GitLab UI components’ styles, import the variable file and its
functions directly:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';

.my-class {
  color: $theme-indigo-200;
}
```

To view a complete list of variables, see [variables.scss](/src/scss/variables.scss).

## Utilities

GitLab utility classes and mixins are based on GitLab's
[design system guidelines](https://design.gitlab.com/).

## Tailwind CSS

As of 16.9, we have started migrating GitLab UI CSS utitilies to [Tailwind CSS](https://tailwindcss.com/).
Projects that consume `@gitlab/ui` should therefore set up Tailwind CSS on their end by following the
relevant installation [instructions](https://tailwindcss.com/docs/installation).

GitLab UI exposes a [Tailwind CSS preset](https://tailwindcss.com/docs/presets) that consumers need to
inherit from for utilities to be Pajamas-compliant.

Because some GitLab UI components use utility classes internally, you must configure the `content` option
to scan `@gitlab/ui`'s compiled bundles.

Here's an example Tailwind CSS configuration:

```js
const tailwindDefaults = require('@gitlab/ui/tailwind.defaults');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // The consumer scans its own frontend assets
    './{ee,}/app/assets/javascripts/**/*.{vue,js}',

    // The consumer should also scan some backend resources if they might contain utility classes
    './{ee,}/app/helpers/**/*.rb',
    './{ee,}/app/components/**/*.{haml,rb}',
    './{ee,}/app/views/**/*.haml',

    // Scan GitLab UI's own assets
    './node_modules/@gitlab/ui/dist/**/*.js',
  ],
  // Consume GitLab UI's Pajamas-compliant preset
  presets: [tailwindDefaults],
};
```

## Utility class specifity

GitLab UI utility classes are not marked as `!important` by default. If you have to use
a utility class to overwrite CSS with high specificity, we provide `!important` versions
of every utility class. Those alternatives are suffixed with `!`, for example:
 `gl-display-flex` vs `gl-display-flex!`.

### Utility classes CSS bundle

To include all utility classes without including GitLab UI components’ styles, import the base
`utilities.scss` file and its dependencies:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/index';
@import '@gitlab/ui/src/scss/utilities';
```

Note: This is a generated file that includes all utility mixins as classes. To see this file in a
local copy of GitLab UI, first generate it with the `yarn generate-utilities` script.

### Utility mixins

Utility mixins are included as part of the [base SCSS file](#usage-with-a-scss-preprocessor).

To use a utility mixin without including GitLab UI components’ styles, import the mixin file and its
dependencies directly:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/border'

.border {
  @include gl-border-solid;
  @include gl-border-gray-200;
  @include gl-border-1;
  @include gl-border-rounded-base;
}
```

See [utility-mixins/index.scss](/src/scss/utility-mixins/index.scss) for a complete list of utility
mixins available.

You may include all mixins by using the following imports:

```scss
@import '@gitlab/ui/src/scss/functions';
@import '@gitlab/ui/src/scss/variables';
@import '@gitlab/ui/src/scss/utility-mixins/index'
```

### Theming

Some components' styles can be adjusted to match the current theme. This is
best done using CSS custom properties. Creating an explicit `theme` prop is
deprecated.

For now, `--gl-theme-accent` is the only theme-related CSS custom property in
use (see `GlTabs`). See [this epic](https://gitlab.com/groups/gitlab-org/-/epics/7401)
for more details.
