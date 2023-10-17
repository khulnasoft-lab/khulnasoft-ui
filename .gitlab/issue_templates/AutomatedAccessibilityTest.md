<!-- Title the issue: Automated accessibility tests - Component name -->

## Description

Implement automated accessibility tests for the {+ Insert component name here +} component. Automated accessibility tests use the
[axe-core](https://github.com/dequelabs/axe-core) engine to find issues on GitLab UI components.

## What to test?

<!-- List the component's states that should be covered by the automated A11Y tests to ensure full coverage -->

- [ ] {+ State 1 +}
- [ ] {+ State 2 +}
- [ ] {+ State 3 +}

## How to write tests?

Read the [axe accessibility test documentation](https://gitlab.com/gitlab-org/gitlab-ui/-/blob/main/doc/contributing/end_to_end_test.md#axe-accessibility-tests) to learn how to implement
automated A11Y tests using the axe-core addon in Cypress.

/label ~accessibility ~type::maintenance ~maintenance::test-gap ~"WG::product accessibility" ~frontend ~frontend-initiative
/epic https://gitlab.com/groups/gitlab-org/-/epics/11127
