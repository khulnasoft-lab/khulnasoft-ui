describe('GlPath', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/path');
  }

  function checkA11YWithPopovers() {
    cy.visitStory('base/path', {
      story: 'with-popovers',
    });

    cy.get('.gl-path-button:first').realHover();
  }

  function checkA11YAllOptions() {
    cy.visitStory('base/path', {
      story: 'all-options',
    });
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
      checkA11YWithPopovers,
      checkA11YAllOptions,
    });
  });
});
