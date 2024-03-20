describe('GlNavbar', () => {
  function checkA11YDefaultState() {
    cy.visitStory('base/navbar');
  }

  it('passes axe accessibility audits', { tags: '@a11y' }, () => {
    cy.glRunA11yTests({
      checkA11YDefaultState,
    });
  });
});
