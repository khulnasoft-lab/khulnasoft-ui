## What does this MR do?

<!--

Describe in detail what your merge request does and why.

Please keep this description up-to-date with any discussion that takes
place so that reviewers can understand your intent. This is especially
important if they didn't participate in the discussion.

-->

%{first_multiline_commit}

## Does this MR meet the acceptance criteria?

### Conformity

- [ ] [Code review guidelines](https://docs.gitlab.com/ee/development/code_review.html).
- [ ] [GitLab UI's contributing guidlines](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/main/CONTRIBUTING.md).
- [ ] If it changes a Pajamas-compliant component's look & feel, the MR has been reviewed by a ~UX designer.
- [ ] If it changes GitLab UI's documentation guidelines, the MR has been reviewed by a Technical Writer.
- [ ] If the MR changes a component's API, integration MR(s) have been opened in the following projects to ensure that the `@gitlab/ui` package can be upgraded quickly after the changes are released:
   - [ ] **[GitLab](https://gitlab.com/gitlab-org/gitlab)**: mr_url
   - [ ] **[CustomersDot](https://gitlab.com/gitlab-org/customers-gitlab-com)**: mr_url
   - [ ] **[Status Page](https://gitlab.com/gitlab-org/status-page)**: mr_url
- [ ] Added the `~"component:*"` label(s) if applicable.

### Security

If this MR contains changes to processing or storing of credentials or tokens, authorization and authentication methods and other items described in [the security review guidelines](https://about.gitlab.com/handbook/engineering/security/#when-to-request-a-security-review):

- [ ] Label as ~security and @ mention `@gitlab-com/gl-security/appsec`
- [ ] Security reports checked/validated by a reviewer from the AppSec team 

## Accessibility

If this MR adds or modifies a component, take a few moments to review the following:

* [ ] All actions and functionality can be done with a [keyboard](https://design.gitlab.com/accessibility-audits/2-keyboard-only).
* [ ] Links, buttons, and controls have a visible [focus state](https://design.gitlab.com/accessibility-audits/2-keyboard-only#focus-states).
* [ ] All content is presented in text or with a text equivalent. For example, alt text for SVG, or `aria-label` for icons that have meaning or perform actions.
* [ ] Changes in a component’s state are announced by a screen reader. For example, changing `aria-expanded="false"` to `aria-expanded="true"` when an accordion is expanded.
* [ ] Color combinations have [sufficient contrast](https://design.gitlab.com/product-foundations/colors#accessibility).
