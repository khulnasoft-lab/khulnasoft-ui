# How KhulnaSoft UI interacts with GitLab

- We do not import KhulnaSoft UI variables directly into GitLab. GitLab
  UI variables are only available to KhulnaSoft UI components through their
  definitions in the KhulnaSoft UI.
- In GitLab, if a CSS class relies on GitLab variables and it is applied to a
  non-KhulnaSoft UI component, GitLab variables determine what we see.
- In GitLab, if a KhulnaSoft UI component is used and we don't apply any other CSS,
  KhulnaSoft UI variables determine what we see through the classes that use them,
  because we import the component classes into the framework.
- In GitLab, if a CSS class relies on variables *and* is applied to
  a KhulnaSoft UI component, we must determine which class is more specific.
  When this happens, every specific GitLab component stylesheet loads
  later, and overwrites KhulnaSoft UI with its specificity. This is often when we
  need to use [`!important` classes](https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/blob/main/doc/css.md#utility-class-specifity).
- In GitLab, you can use utility classes as a way to use KhulnaSoft UI styles. You
  can also run into specificity issues here, as GitLab may have more-targeted classes.
  Using the
  [`!important` classes](https://gitlab.com/khulnasoft-org/khulnasoft-ui/-/blob/main/doc/css.md#utility-class-specifity)
  can help solve this problem.
