## What does this PR do?

<!--
Describe in detail what your pull request does and why.

Please keep this description up-to-date with any discussion that takes
place so that reviewers can understand your intent. This is especially
important if they didn't participate in the discussion.

-->

## Screenshots or screen recordings

<!--
If your pull request contains visual changes, please include any relevant screenshots or screen
recordings that will assist reviewers and future readers.
-->

## Integration pull requests

<!--
If your pull request requires migration in one of the main projects that rely on `@khulnasoft/ui`,
please list the integration pull requests below.
-->

- [ ] **[KhulnaSoft](https://github.com/khulnasoft/gitlab)**: pr_url
- [ ] **[CustomersDot](https://github.com/khulnasoft/customers-gitlab-com)**: pr_url
- [ ] **[Status Page](https://github.com/khulnasoft/status-page)**: pr_url

## Does this PR meet the acceptance criteria?

This checklist encourages the authors, reviewers, and maintainers of pull requests (PRs) to confirm
changes were analyzed for conformity with the project's guidelines, security and accessibility.

<details>

<summary>Toggle the acceptance checklist</summary>

### Conformity

- [ ] [Code review guidelines](https://docs.gitlab.com/ee/development/code_review.html).
- [ ] [KhulnaSoft UI's contributing guidelines](https://github.com/khulnasoft/khulnasoft-ui/blob/main/CONTRIBUTING.md).
- [ ] If it changes a Pajamas-compliant component's look & feel, the PR has been reviewed by a UX designer.
- [ ] If it changes KhulnaSoft UI's documentation guidelines, the PR has been reviewed by a Technical Writer.
- [ ] If the PR changes a component's API, integration PR(s) have been opened
      (see [integration pull requests](#integration-pull-requests) above).
- [ ] Added the component label(s) if applicable.

### Security

If this PR contains changes to processing or storing of credentials or tokens, authorization and
authentication methods and other items described in [the security review guidelines](https://about.gitlab.com/handbook/engineering/security/#when-to-request-a-security-review):

- [ ] Label as security and @ mention the security team
- [ ] Security reports checked/validated by a reviewer from the security team

### Accessibility

If this PR adds or modifies a component, take a few moments to review the following:

- [ ] All actions and functionality can be done with a [keyboard](https://design.gitlab.com/accessibility-audits/2-keyboard-only).
- [ ] Links, buttons, and controls have a visible [focus state](https://design.gitlab.com/accessibility-audits/2-keyboard-only#focus-states).
- [ ] All content is presented in text or with a text equivalent. For example, alt text for SVG, or
      `aria-label` for icons that have meaning or perform actions.
- [ ] Changes in a component's state are announced by a screen reader. For example, changing
      `aria-expanded="false"` to `aria-expanded="true"` when an accordion is expanded.
- [ ] Color combinations have [sufficient contrast](https://design.gitlab.com/product-foundations/colors#accessibility).

</details> 