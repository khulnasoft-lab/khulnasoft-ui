# Adding a new component to GitLab UI

The following provides guidance for engineers adding new components to GitLab UI.

## Merge Request guidelines

Create a Merge Request in GitLab UI with your new component code. Use the
commit message `feat([ComponentName]): Implement [ComponentName] component`.
This creates a conventional commit used by the
[npm release CI job](https://gitlab.com/gitlab-org/gitlab-ui/pipelines) to
create a new version of the GitLab UI package.

Run the manual CI job (`update_screenshots`) to generate the baseline snapshots used by the visual
tests. You can find it in last stage of
[GitLab UI CI pipeline](https://gitlab.com/gitlab-org/gitlab-ui/pipelines).
This CI job commits the baseline snapshot images to the merge request branch.

![Update screenshots CI job location](../images/update_screenshots.png 'Update screenshots CI job location')

### How to keep merge requests small

New components are usually introduced in a single, large MR.

To simplify the review process, create a principal feature branch based on the project's main branch.
Then, create smaller branches targeting the principal branch to iterate through smaller changes.

## Working on a Pajamas-documented component

If you are adding or updating a component documented in the
[Pajamas design system](https://design.gitlab.com), you should comply with the
[component lifecycle workflow](https://design.gitlab.com/get-started/lifecycle).

## Testing your new component in GitLab

This section has moved to [Testing GitlLab UI changes in GitLab](./gitlab_integration_test.md).
