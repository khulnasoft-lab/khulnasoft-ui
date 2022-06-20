# GitLab UI's commit conventions

We use conventional commits specifications to write meaningful commit messages that are used as part
of our [semantic release](https://gitlab.com/gitlab-org/gitlab-ui/wikis/Frequently-asked-questions#2-why-are-we-using-semantic-release)
process.

Please read the official specifications for more details: <https://www.conventionalcommits.org/>.

Each commit message consists of a **header**, a **body**, and a **footer**. The header has a special
format that includes a **type**, a **scope**, and a **subject**:

```plaintext
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.
Each line in the commit message should be no longer than 72 characters.

When opening an MR, make sure that every commit complies with the conventional
commit standards.

Following these conventions will result in a properly versioned package and clear
[changelogs](./CHANGELOG.md) for every version.

## Why must all commits in an MR follow these conventions?

All commits must follow these conventions because:

- We refer to those commits in the changelog.
- Releases are tagged based on the commit message.

During code review, you may want to keep the resulting changes separate. So,
your MR's commits might look like this:

```none
2b2b2b2 Apply review suggestion
1a1a1a1 feat: adding an awesome feature
```

To make this mergeable:

- If commit `2b2b2b2` would independently bring a meaningful change to `main`
  (i.e., doesn't depend on `1a1a1a1`), its message should be updated to conform
  to conventional commit standards.
- If not, commit `2b2b2b2` must be squashed into `1a1a1a1`.

## Why is [squash merging](https://docs.gitlab.com/ee/user/project/merge_requests/squash_and_merge.html) disabled?

This feature is disabled in GitLab UI, since it allows for subtle ways to
bypass our conventional-commits-based release process.

This trades a slight decrease in ease of contribution for a more predictable
release process.

See [this issue](https://gitlab.com/gitlab-org/gitlab-ui/-/issues/1562) for
more information.

## What types can I use for my commit messages?

We use the same types as
[Angular's commit guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type):

- **feat:** A new feature (adding a new component, providing new variants for an
  existing component, etc.).
- **fix:** A bug fix (correcting a styling issue, addressing a bug in a component's API, etc.).
  When updating non-dev dependencies, mark your changes with the `fix:` type.
- **docs:** Documentation-only changes.
- **style:** Changes that do not affect the meaning of the code
  (whitespace, formatting, missing semicolons, etc). _Not_ to be used for CSS changes as those are
  meaningful changes, consider using `feat:` of `fix:` instead.
- **refactor:** A code change that neither fixes a bug nor adds a feature.
- **perf:** A code change that improves performance.
- **test:** Adding missing tests or correcting existing tests.
- **build:** Changes that affect the build system (changing webpack or Rollup config for example).
- **ci:** Changes to our CI configuration files and scripts
  (changing `.gitlab-ci.yml`, adding or changing Danger plugins, etc.).
- **chore:** Other changes that don't modify source or test files. Use this type when adding or
  updating dev dependencies.
- **revert:** Reverts a previous commit.

Each commit type can have an optional scope to specify the place of the commit change: `type(scope):`.
It is up to you to add or omit a commit's scope. When a commit affects a specific component, use the
component's PascalCase name as the commit's scope. For example:

```none
feat(GlButton): add secondary variant
```

> **Note:** Only `feat:`, `fix:`, and `perf:` types trigger a new release
> If you're introducing a breaking change, the message body should start with
> [`BREAKING CHANGE:`](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer),
> this will trigger a major version bump (e.g. `v1.2.3` -> `v2.0.0`)

## Commitizen

<https://commitizen.github.io/cz-cli/>

Commitizen is a CLI tool that provides an interactive interface to help you write commit messages
following conventional commits specifications.

> **Note:** We also limit the length of both the subject and the body of a commit message with
> Danger: [Dangerfile](./danger/semantic-commit/Dangerfile).
