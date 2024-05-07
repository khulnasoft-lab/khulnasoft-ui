# GitLab UI

GitLab UI is a UI component library that implements [Pajamas](https://design.gitlab.com/), our
design system. GitLab UI is written in [Vue.js](https://vuejs.org) and its objectives are to:

- Create reusable UI components to accelerate frontend development.
- Create UI consistency for all components within GitLab.

See <https://gitlab-org.gitlab.io/gitlab-ui/> for documentation.

## Usage

To use GitLab UI in your project, add it as a dependency:

```sh
yarn add @gitlab/ui
```

> **Note:** Make sure to also install GitLab UI's peer dependencies. Refer to the
> [`package.json`](./package.json) for the list of peer dependencies and their expected versions.

In your main entrypoint **before** importing or using any component:

```javascript
import setConfigs from '@gitlab/ui/dist/config'

setConfigs()
```

This will set the global configs used by GitLab UI.

Import the components as desired:

```javascript
import { GlButton } from '@gitlab/ui';
```

GitLab UI is compatible with tree-shaking, you may enable this in your project to reduce bundle sizes.

### GitLab UI CSS

GitLab UI provides component styles, a utility-class library, and SCSS utilities.

- [How can I get started with GitLab UI CSS?](doc/css.md)
- [How does GitLab UI interact with GitLab CSS?](doc/debugging-gitlab-ui-with-gitlab-css.md)

## Quick start - development

**Note:** GitLab UI isn't designed to be built on Windows natively. Either
[WSL](https://learn.microsoft.com/en-us/windows/wsl/) or
[GitPod](https://www.gitpod.io/docs/configure/authentication/gitlab) can be used to set up a
UNIX-like environment in which to build it.

Make sure you have [Node](https://nodejs.org/en/) 16.x (LTS) and [Yarn](https://yarnpkg.com/) 1.22
or newer.

```sh
# Clone the project
git clone git@gitlab.com:gitlab-org/gitlab-ui.git

# Navigate to the root of the project
cd gitlab-ui

# Install all the dependencies of the project
yarn # or yarn install

# Build and launch storybook to see the components in the browser
yarn storybook
```

Go to <http://localhost:9001/>

## Testing

### Unit tests

Components’ unit tests live in the `tests/components`. The tests are organized following the same
directory structure used to organize components.

- `yarn test:unit` runs all unit tests.

- `yarn test:unit:watch` runs all unit tests in watch mode.

- `yarn test:unit:debug` runs all unit tests and allow to attach a debugger to the test runner process.

- `yarn jest [name_pattern]` runs spec files that match the specified name pattern.

#### Examples

- `yarn jest datepicker` will match all spec files with a name that contains the word _datepicker_.

- `yarn jest datepicker -t "when draw event is emitted"` goes a step further and only runs the test
with a description that matches the argument passed to the `t` flag.

### SCSS tests

Even though we try to avoid writing complex SASS code to maintain CSS complexity low, we’ve
implemented some functions that benefit from automated testing. SASS tests live in the `tests/scss`
directory. GitLab UI uses [sass-true](https://www.oddbird.net/true/) to implement these tests, and
jest run them.

`yarn jest run_scss_tests` runs all SCSS tests.

### Visual regression tests

GitLab UI uses visual snapshot tests to prevent introducing regressions with CSS and
layout changes on components. Read more on this in the [visual testing documentation](doc/contributing/visual_testing.md).

#### GitLab visual regression tests

GitLab UI components are a reference implementation of the
[Pajamas Design System components](https://design.gitlab.com/components/status). These components
should conform with the design system specs, and they should look correct in the pajamas website and
the GitLab product. Please see [Debugging GitLab UI issues with GitLab product CSS](doc/debugging-gitlab-ui-with-gitlab-css.md)
for information on how to debug issues with GitLab product CSS in GitLab UI.

### End to end tests

Components’ end to end tests live in the `cypress/e2e` folder. See our
[end to end testing documentation](doc/contributing/end_to_end_test.md) for more details.

`yarn run cypress open` runs Cypress locally to run end to end tests.

## Installation

Install with Yarn:

```sh
yarn add @gitlab/ui
```

Install with npm:

```sh
npm install @gitlab/ui
```

### Styles

GitLab UI requires its styles to be imported to display components properly. We currently have 2
separate stylesheets that both need to be included in your project. The main stylesheet
(`gitlab_ui.scss`) contains component-specific styles, while the other one (`utilities.scss`)
contains the utility classes library on which some components rely. You might find the utility
classes useful to layout components in your own project.

You have two options to include those stylesheets:

- If you have a SCSS preprocessor setup, include the SCSS files in your own stylesheet:

```scss
@import '@gitlab/ui/src/scss/gitlab_ui.scss';
@import '@gitlab/ui/src/scss/utilities.scss';
```

- If you don't have a SCSS preprocessor setup, you can import the compiled CSS files directly:

```css
@import '@gitlab/ui/dist/index.css';
@import '@gitlab/ui/dist/utility_classes.css';
```

### Design tokens

GitLab UI uses design tokens to maintain a single source of truth that, through automation,
can be formatted for different uses.

- See [Pajamas](https://design.gitlab.com/product-foundations/design-tokens) for an overview
on design tokens.
- See [GitLab Docs](https://docs.gitlab.com/ee/development/fe_guide/design_tokens.html) for
in-depth guides on creating and using design tokens.

Example design token inheritance and automation:

```mermaid
flowchart TD
    A[#1f1e24] -->|Constant token| B[color.neutral.950]
    B -->|Semantic token| C[text.color.default]
    C --> D{Automation}
    D -->|Figma| E[text/color/default]
    D -->|CSS| F[--gl-text-color-default]
    D -->|SCSS| G[$gl-text-color-default]
    D -->|JavaScript| H[GL_TEXT_COLOR_DEFAULT]
    D -->|Tailwind| I[gl-text-default]
```

## Releases

See [Updating GitLab UI Packages](doc/updating-gitlab-ui-packages.md) for information on how the
`@gitlab/ui` package is kept up to date in various projects.

## Contributing guide

Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to add new components and
contribute in general to GitLab UI.

### FAQs

Any question? Have a look at our [FAQ.md](FAQ.md), you might find the answer there.
