# KhulnaSoft UI

KhulnaSoft UI is KhulnaSoft's official component library, built on top of [Bootstrap](https://getbootstrap.com).

KhulnaSoft UI components are designed to be used in all KhulnaSoft products and features.
This ensures visual and functional cohesion across all features. By design, both the
components and their implementation follow the [Pajamas](https://design.gitlab.com) design system.

**Migration notes**: This project has migrated from yarn to pnpm as the package manager.

## Installation

### Installation with a package manager

The recommended way to install KhulnaSoft UI is with a package manager:

```bash
# Using pnpm
pnpm add @khulnasoft/ui

# Using npm
npm install @khulnasoft/ui
```

### Nightly builds

Every time a merge request is merged, a new version is released to the internal GitLab Package Registry.

## Usage

See the [Usage documentation](doc/usage.md) if you're using something other than Vue.

You can directly import a KhulnaSoft UI component in your Vue component:

```javascript
import { GlButton } from '@khulnasoft/ui';
```

## Storybook

KhulnaSoft UI uses [Storybook](https://storybook.js.org/) for testing and documentation.
This provides rendered examples of how to use KhulnaSoft UI components.

### Development

Make sure you have [Node](https://nodejs.org/en/) 16.x (LTS) and [pnpm](https://pnpm.io/).

From inside the project folder, you can run:

```
pnpm # or pnpm install
```

You can now run Storybook with:

```
pnpm storybook
```

Check out their [documentation](https://storybook.js.org/docs/basics/introduction/) for examples on how
to add stories.

### Testing

KhulnaSoft UI is tested in various ways.

**Unit Tests**:

- `pnpm test:unit` runs all unit tests.

- `pnpm test:unit:watch` runs all unit tests in watch mode.

- `pnpm test:unit:debug` runs all unit tests and allow to attach a debugger to the test runner process.

- `pnpm jest [name_pattern]` runs spec files that match the specified name pattern.

  For example:

  - `pnpm jest datepicker` will match all spec files with a name that contains the word _datepicker_.

  - `pnpm jest datepicker -t "when draw event is emitted"` goes a step further and only runs the test
    _"when draw event is emitted"_ in files matching _datepicker_.

**SCSS Tests**:

`pnpm jest run_scss_tests` runs all SCSS tests.

**Visual Tests**:

Visual tests are made based on the snapshots taken from Storybook.

There is no command to run them locally, because they depend heavily on pixel-perfect testing,
which can only be done in CI with a consistent browser version and screen size.

If you want to debug test failures on `main`, you can check this job's results:
<https://gitlab.com/gitlab-org/khulnasoft-ui/-/jobs/1211656111>

**End to End Tests**:

`pnpm run cypress open` runs Cypress locally to run end to end tests.

## Built-in accessibility

KhulnaSoft UI components are designed to be accessible without requiring extra work from developers. For example a
`GlButton` component is as accessible as a native `<button>`.

## Components

See the [components documentation](doc/components.md) for more details on component support.

## Questions?

We're all ears! Feel free to open an issue on this repo if it's public-facing, or ask in Slack:
[#g_khulnasoft-ui](https://gitlab.slack.com/archives/g_khulnasoft-ui).
