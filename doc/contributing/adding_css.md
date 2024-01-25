# Adding CSS

## Please read this first

As of GitLab 16.9, we are in the process of migrating our CSS utilities library to [Tailwind CSS](https://tailwindcss.com/).
We will be updating this document as the migration progresses. For the time being, existing CSS
utilities can still be used. However, when a Tailwind CSS equivalent is available, please consider
using it instead.

Read more about this migration in the [blueprint](https://docs.gitlab.com/ee/architecture/blueprints/tailwindcss/).

## Writing components styles

From GitLab 12.2 on, we are moving components styles into GitLab UI, as
described in the approved [RFC #2](https://gitlab.com/gitlab-org/frontend/rfcs/issues/2),
with the substitution of `mixins/@include` for `@extend`.
This approach will make it possible to use GitLab UI components in several projects.

You should use utility mixins to implement components’ styles. See
[`utility-mixins`](https://gitlab.com/gitlab-org/gitlab-ui/blob/main/src/scss/utility-mixins/)
for a comprehensive list of the available utilities. If what you are
looking for is not available, add it following the naming conventions
indicated in the appropriate file.

When running `yarn generate:component`, the component's SCSS file will be created in the right place
and imported in the main `components.scss`. Read more about
[adding new components](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/main/doc/contributing/adding_components.md#general-guidelines).

Each component's stylesheet should contain its "modularized" style:

```scss
// src/components/base/button/button.scss

.gl-button {
  // style
  @include some-utility-mixin;
}
```

When the component is integrated
into the application, you should still follow the
[`utility-first`](https://docs.gitlab.com/ce/development/fe_guide/style_guide_scss.html#utility-classes)
approach for basic layout and other styles.

See [`GlToken`'s stylesheet](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/main/src/components/base/token/token.scss)
for an example of how we use utility mixins in GitLab UI.

Some components styles still need to be migrated from GitLab into GitLab UI, keep track of the
progress in the epic: [&1590](https://gitlab.com/groups/gitlab-org/-/epics/1590).

### Why are we doing it like this?

The current SCSS architecture was designed to allow us both to gain the advantages of a utility CSS
approach while also applying the same styles to both Vue components here in GitLab UI and HAML
components in GitLab itself.

With utility mixins, styles are applied as a combination of single-attribute mixins:

```scss
@mixin gl-display-flex {
  display: flex;
}

@mixin gl-text-red-800 {
  color: $red-800;
}

.gl-my-component {
  @include gl-display-flex;
  @include gl-text-red-800;
}

..

<my-component class='gl-my-component' />
```

The advantages of this approach are:

- It clarifies which colors, sizes, and other options are available within the
[design system](https://design.gitlab.com/). Rather than pulling values from specs or guessing,
engineers are able to use already-vetted values. This also means that adding a new value becomes
more deliberate and easier to check in reviews.

- It makes it easier to cascade design-system changes, especially around text and spacing. That is
because the utility mixins lend themselves to being updatable, like variables, in just one place.
Consider the case of spacing: the values are taken from a scale (`gl-spacing-0`, `gl-spacing-10`),
which means updating from a base of `4px` to `6px` means updating just those mixins but keeping the
relations the same.

We've decided to build both component classes and utility classes from the same mixins in order to
get these benefits while also having component CSS that can be applied in GitLab UI and GitLab
itself, `Vue` and `HAML`, without undue or repeated effort.

For even more detail on our decision making, RFCs [#2](https://gitlab.com/gitlab-org/frontend/rfcs/issues/2)
and [#4](https://gitlab.com/gitlab-org/frontend/rfcs/issues/4) contain historical discussion around
these issues. After [RFC #4](https://gitlab.com/gitlab-org/frontend/rfcs/issues/4) was approved,
we realized the silent class plus `@extend` approach generated large amounts of CSS and the approach
was modified to use mixins and `@include` instead. For more context,
see also this relevant [discussion](https://gitlab.com/gitlab-org/gitlab-ui/merge_requests/623#note_192269009).

For more information about utility-first CSS, consider [a post from Mike Crittenden](https://critter.blog/2018/06/08/in-defense-of-functional-css/),
[Ollie Williams on CSS Tricks](https://css-tricks.com/growing-popularity-atomic-css/) or
[Sarah Dayan's Frontstuff](https://frontstuff.io/in-defense-of-utility-first-css).

Finally, to join in on discussion about HAML components, check out the following ongoing conversations:

- [Remove outdated "Use HAML" section](https://gitlab.com/gitlab-com/www-gitlab-com/merge_requests/18894#note_212454769)
- [Change: HAML to Vue](https://gitlab.com/gitlab-org/frontend/rfcs/issues/14)

### So wait, when do I add a variable? A utility mixin? A component class?

- **Add a variable** (in `variables.scss`) if you are setting a base value in the design system —
  this is rare.
- **Add a utility mixin** when you need it to style a component yet not available in the
  library. You should always base new utility mixins on the [design system guidelines](https://design.gitlab.com/).
- **Add a component class** when implementing a new component’s styles.

## Adding utility mixins

GitLab UI provides a utility-class library based on the
[Pajamas Design System](https://design.gitlab.com) specifications
for spacing, color, typography, and layers. This section provides guidelines to add new
utilities.

### Generating `utilities.scss`

The utility-class library is located in `src/scss/utilities.scss`. GitLab UI generates the utility-class
library based on the mixins defined in `src/scss/utility-mixins/`. To regenerate the file, run
the `yarn generate-utilities` command.

Please note that while we generate the classes from the mixins, the mixins should be added manually,
as they are needed, and not generated using an `@each` across values. This is for a few reasons:

- **To keep the bundle small.** As mentioned above, we use component CSS defined with mixins so that
HAML components can consume the same CSS without needing utility classes added in two places.
However, this makes the bundle larger, because each new component adds new CSS. We try to offset
this by not generating every possible utility.

- **To keep it easier to find classes.** It is easier to grep for class names and see the values
  assigned to them when they are not generated in loops. This is good.

- **To understand the CSS we are actually using.** By only including classes we use, we can review
  what we use at a glance.

### Component-agnostic utilities

We are aiming to build a set of styles that are easily reusable and component-agnostic.
To help accomplish this:

- Place new utility mixins in one of the files located in the `src/scss/utility-mixins/` directory.
  Each file contains a group of related utilities like `border`, `color`, `text`, and so on.
- Give new mixins a generic name that describes what they do rather than what component they target.

For example:

```scss
// Bad
@mixin gl-alert-borders {
  border-style: none;
}

// Good
@mixin gl-border-none {
  border-style: none;
}

// Bad
@mixin gl-avatar-transitions {
  transition-property: border-color;
}

// Good
@mixin gl-transition-property-border-color {
  transition-property: border-color;
}
```

Time constraints or lack of stable design specifications might require you to create
component-specific mixins. In such cases, mixins should be defined in the component's
stylesheet and their names should be prefixed with `gl-tmp-` instead of `gl-` to make them easily
identifiable when paying technical debt in later development stages.

### Stateful utilities

You can tell GitLab UI to generate stateful utilities based on a utility mixin. Stateful utilities
apply pseudo-class styles that target states like `hover`, `active`, `focus`, and `visited`. To
indicate that a utility mixin should have a stateful counterpart, add a default parameter to the
utility mixin declaration:

```scss
@mixin gl-border-none($hover: true) {
  border-style: none;
}
```

After running `yarn generate-utilities`, `src/scss/utilities.scss` will contain the following
utility-classes:

```scss
.gl-border-none {
  @include gl-border-none;
}

.gl-hover-border-none:hover {
  @include gl-border-none;
}
```

### Responsive utilities

You can define utility mixins that target specific breakpoints. Remember to use the breakpoint
variables defined in `src/scss/variables`: `$breakpoint-sm`, `$breakpoint-md`, `$breakpoint-lg`,
and `$breakpoint-xl`. Here are some examples:

```scss
@mixin gl-md-border-none {
  @include gl-media-breakpoint-up(md) {
    border-style: none;
  }
}

@mixin gl-xl-bg-white {
  @include gl-media-breakpoint-up(xl) {
    background-color: $white;
  }
}
```

SCSS will generate a utility class enclosed in the breakpoint media query:

```css
@media (min-width: 768px) {
  .gl-md-border-none {
    border-style: none;
  }
}

@media (min-width: 1200px) {
  .gl-xl-bg-white {
    background-color: #fff;
  }
}
```

> Note: GitLab UI follows a mobile-first approach, meaning that styles are applied to smaller
> viewports by default, and media queries overrides are used for larger viewports
> Responsive media queries should use the `gl-media-breakpoint-up` mixin. The
> `gl-media-breakpoint-down` mixin should only be used in exceptional cases.

## Important styles

For every utility mixin, we will automatically create an `!important` version. These versions are
suffixed with `!` to distinguish them from their normal counterparts. For example:

```scss
@mixin gl-border-none {
  border-style: none;
}

// Generated automatically
@mixin gl-border-none\\! {
  border-style: none !important;
}
```

There is however, one instance when this won't take place. This occurs when you are using an include
from another CSS file (say using a mixin from `mixins.scss` in `utilities.scss`). Although we create
the important variant, this won't have `!important` suffixed to the rule. This is because the
post-processor is only aware of the file it is processing at that current time. For example:

```scss
.gl-str-truncated {
  @include str-truncated
}

// Converts to (note the lack of !important)

.gl-str-truncated {
  @include str-truncated
}

.gl-str-truncated\\! {
  @include str-truncated
}
```

To make this work, you will need to manually enter the contents of the include into the file:

```scss
.gl-str-truncated {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  max-width: 82%;
}

// Converts to

.gl-str-truncated {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
  white-space: nowrap;
  max-width: 82%;
}

.gl-str-truncated\\! {
  display: inline-block !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  vertical-align: top !important;
  white-space: nowrap !important;
  max-width: 82% !important;
}
```

## Other Style Questions

More answers and details can be found in the [SCSS style guide](https://docs.gitlab.com/ee/development/fe_guide/style_guide_scss.html).
