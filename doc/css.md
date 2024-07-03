# GitLab UI CSS

GitLab UI provides component styles and a Pajamas-compliant Tailwind CSS preset.

## Quick Start

The fastest way to get GitLab UI components to render properly in your project is to import the main
CSS bundle along with the internally-used CSS utilities:

```css
@import '@gitlab/ui/dist/index.css';
@import '@gitlab/ui/dist/tailwind.css';
```

> **Note:** If you wish to setup Tailwind CSS in your project, you _should not_ import the
> `@gitlab/ui/dist/tailwind.css` stylesheet as that might result in duplicated CSS utilities being
> included in your app. Instead, you should configure Tailwind to parse GitLab UI's files along with
> your project's. See [Tailwind CSS](#tailwind-css) below.

## Usage with a SCSS preprocessor

If you use a SCSS preprocessor, you may include the base SCSS file instead of `index.css`:

```scss
@import '@gitlab/ui/src/scss/gitlab_ui';
```

In addition to component styling, this provides various functions, variables and mixins.

### Overriding variables

Variables are imported as part of the [base SCSS file](#usage-with-a-scss-preprocessor).

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

## Tailwind CSS

As of 16.9, we have started migrating GitLab UI CSS utilities to [Tailwind CSS](https://tailwindcss.com/).
Projects that consume `@gitlab/ui` and that wish to use its Pajamas-compliant Tailwind preset should
therefore set Tailwind CSS up on their end by following the relevant installation [instructions](https://tailwindcss.com/docs/installation).

Because some GitLab UI components use utility classes internally, you must configure the `content` option
to scan `@gitlab/ui`'s own compiled bundles:

```js
const tailwindDefaults = require('@gitlab/ui/tailwind.defaults.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Consume GitLab UI's Pajamas-compliant preset
  presets: [tailwindDefaults],
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
};
```

## Theming

Some components' styles can be adjusted to match the current theme. This is
best done using CSS custom properties. Creating an explicit `theme` prop is
deprecated.

For now, `--gl-theme-accent` is the only theme-related CSS custom property in
use (see `GlTabs`). See [this epic](https://gitlab.com/groups/gitlab-org/-/epics/7401)
for more details.

## How does GitLab UI interact with GitLab CSS?

Refer to the [relevant docs](./debugging-gitlab-ui-with-gitlab-css.md) to learn how GitLab UI and
GitLab styles interact with each other.
