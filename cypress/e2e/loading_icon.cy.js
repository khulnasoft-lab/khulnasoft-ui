describe('GlLoadingIcon', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/loading-icon');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});
